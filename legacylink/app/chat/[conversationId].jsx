import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeScreen from "../../components/SafeScreen";
import { COLORS } from "../../constants/colors";
import { useAuth } from "@clerk/clerk-expo";
import { useSocket } from "../../contexts/SocketContext";
import { fetchMessages, sendMessage as sendMessageAPI, extractUserIdsFromChatId } from "../../lib/chatUtils";
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export default function ChatDetailPage() {
  const router = useRouter();
  const { conversationId } = useLocalSearchParams();
  const { getToken } = useAuth();
  const { socket, joinChat, leaveChat } = useSocket();
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [partner, setPartner] = useState({ name: "Loading..." });
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleNewMessage = useCallback((messageData) => {
    setMessages(prevMessages => [...prevMessages, messageData]);
  }, []);

  const loadMessages = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Auth Error', 'User token missing.');
        return;
      }
      
      // First get current user info
      const userResponse = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const currentUser = await userResponse.json();
      setCurrentUserId(currentUser._id);
      
      const data = await fetchMessages(conversationId, token);
      setMessages(data);
      
      // Set partner info from the first message
      if (data.length > 0) {
        const firstMessage = data[0];
        const partnerData = firstMessage.senderId._id === currentUser._id ? firstMessage.receiverId : firstMessage.senderId;
        if (partnerData && partnerData.name) {
          setPartner(partnerData);
        } else {
          // Fallback: try to get partner info from chat ID
          const userIds = extractUserIdsFromChatId(conversationId);
          if (userIds) {
            const partnerId = userIds.find(id => id !== currentUser._id);
            if (partnerId) {
              // Fetch partner info
              try {
                const partnerResponse = await fetch(`${API_URL}/api/users/${partnerId}/profile`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                const partner = await partnerResponse.json();
                setPartner(partner);
              } catch (err) {
                console.error('Failed to fetch partner info:', err);
                setPartner({ name: 'Unknown User' });
              }
            }
          }
        }
      } else {
        // No messages yet, get partner info from chat ID
        const userIds = extractUserIdsFromChatId(conversationId);
        if (userIds) {
          const partnerId = userIds.find(id => id !== currentUser._id);
          if (partnerId) {
            try {
              const partnerResponse = await fetch(`${API_URL}/api/users/${partnerId}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              const partner = await partnerResponse.json();
              setPartner(partner);
            } catch (err) {
              console.error('Failed to fetch partner info:', err);
              setPartner({ name: 'Unknown User' });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      Alert.alert('Error', 'Failed to load messages.');
    } finally {
      setLoading(false);
    }
  }, [conversationId, getToken]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    // Join chat room for real-time updates
    if (conversationId) {
      joinChat(conversationId);
    }

    // Listen for new messages
    if (socket) {
      socket.on('receive_message', handleNewMessage);
    }

    return () => {
      if (conversationId) {
        leaveChat(conversationId);
      }
      if (socket) {
        socket.off('receive_message', handleNewMessage);
      }
    };
  }, [conversationId, socket, joinChat, leaveChat, handleNewMessage]);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    
    setSending(true);
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Auth Error', 'User token missing.');
        return;
      }

      // Extract receiver ID from chat ID or determine from messages
      let receiverId = null;
      if (messages.length > 0) {
        const firstMessage = messages[0];
        // Handle both populated object and string ID cases
        const senderIdString = typeof firstMessage.senderId === 'object' ? firstMessage.senderId._id : firstMessage.senderId;
        const receiverIdString = typeof firstMessage.receiverId === 'object' ? firstMessage.receiverId._id : firstMessage.receiverId;
        
        receiverId = senderIdString === currentUserId ? receiverIdString : senderIdString;
      } else {
        // If no messages exist, extract from chat ID
        const userIds = extractUserIdsFromChatId(conversationId);
        if (userIds) {
          receiverId = userIds.find(id => id !== currentUserId);
        }
      }

      console.log('SendMessage Debug:', {
        currentUserId,
        conversationId,
        receiverId,
        messagesLength: messages.length
      });

      if (!receiverId) {
        Alert.alert('Error', 'Could not determine message recipient.');
        return;
      }

      const messageData = {
        chatId: conversationId,
        text: input.trim(),
        receiverId,
      };

      const newMessage = await sendMessageAPI(messageData, token);
      
      // Add message to local state
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput("");
      
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isMe = item.senderId._id === currentUserId;
    return (
      <View style={[styles.messageRow, isMe ? styles.rowReverse : null]}>
        <View style={[styles.messageBubble, isMe ? styles.sent : styles.received]}>
          <Text style={[styles.messageText, isMe ? styles.sentText : styles.receivedText]}>
            {item.text}
          </Text>
          <Text style={[styles.timestamp, isMe ? styles.sentTimestamp : styles.receivedTimestamp]}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeScreen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading messages...</Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{partner.name}</Text>
      </View>
      
      <FlatList
        data={[...messages].reverse()}
        keyExtractor={item => item._id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        inverted
        showsVerticalScrollIndicator={false}
      />
      
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.textLight}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            onPress={sendMessage} 
            style={[styles.sendButton, { opacity: (input.trim() && !sending) ? 1 : 0.5 }]}
            disabled={!input.trim() || sending}
          >
            {sending ? (
              <ActivityIndicator size={20} color="#fff" />
            ) : (
              <Ionicons name="send" size={22} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.textLight,
  },
  messagesContainer: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "flex-end",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 18,
    padding: 12,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  sent: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.primary,
    marginLeft: 32,
  },
  received: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 32,
  },
  messageText: {
    fontSize: 16,
  },
  sentText: {
    color: "#fff",
  },
  receivedText: {
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  sentTimestamp: {
    color: "rgba(255,255,255,0.7)",
    textAlign: 'right',
  },
  receivedTimestamp: {
    color: COLORS.textLight,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: COLORS.card,
    padding: 8,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 