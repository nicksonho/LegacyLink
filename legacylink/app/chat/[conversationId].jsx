import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeScreen from "../../components/SafeScreen";
import { COLORS } from "../../constants/colors";

// Placeholder conversation data
const conversationData = {
  "1": {
    partner: { name: "Mentor Jane" },
    messages: [
      { _id: 1, text: "Hello!", sender: "them" },
      { _id: 2, text: "Hi Jane!", sender: "me" },
      { _id: 3, text: "Looking forward to our session!", sender: "them" },
    ],
  },
  "2": {
    partner: { name: "Mentor John" },
    messages: [
      { _id: 1, text: "Hey John!", sender: "me" },
      { _id: 2, text: "See you next week!", sender: "them" },
    ],
  },
};

export default function ChatDetailPage() {
  const router = useRouter();
  const { conversationId } = useLocalSearchParams();
  const convo = conversationData[conversationId] || { partner: { name: "Unknown" }, messages: [] };
  const [messages, setMessages] = useState(convo.messages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { _id: Date.now(), text: input, sender: "me" }
    ]);
    setInput("");
  };

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{convo.partner.name}</Text>
      </View>
      <FlatList
        data={[...messages].reverse()}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => {
          const isMe = item.sender === "me";
          return (
            <View style={[styles.messageRow, isMe ? styles.rowReverse : null]}>
              <View style={[styles.messageBubble, isMe ? styles.sent : styles.received]}>
                <Text style={[styles.messageText, isMe ? styles.sentText : styles.receivedText]}>{item.text}</Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={COLORS.textLight}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={22} color="#fff" />
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
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 10,
  },
}); 