import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeScreen from "../components/SafeScreen";
import { COLORS } from "../constants/colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { fetchConversations, formatMessageTime } from "../lib/chatUtils";
import { useFocusEffect } from "@react-navigation/native";

export default function ChatListPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadConversations = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Auth Error", "User token missing.");
        return;
      }

      const data = await fetchConversations(token);
      setConversations(data);
    } catch (error) {
      console.error("Error loading conversations:", error);
      Alert.alert("Error", "Failed to load conversations.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useFocusEffect(
    React.useCallback(() => {
      loadConversations();
    }, [loadConversations])
  );

  if (loading) {
    return (
      <SafeScreen>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading chats...</Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80} // adjust based on header height
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/home")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chats</Text>
        </View>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tile}
              onPress={() => router.push(`/chat/${item._id}`)}
              activeOpacity={0.8}
            >
              <Image
                source={{
                  uri:
                    item.partner?.profilePicUrl ||
                    "https://via.placeholder.com/40x40.png?text=" +
                      (item.partner?.name?.charAt(0) || "?"),
                }}
                style={styles.avatar}
              />
              <View style={styles.tileTextContainer}>
                <Text style={styles.partnerName}>
                  {item.partner?.name || "Unknown"}
                </Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
              <Text style={styles.time}>
                {formatMessageTime(item.lastMessageTime)}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textLight}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No chats yet. Connect with mentors to start conversations!
            </Text>
          }
          refreshing={loading}
          onRefresh={loadConversations}
        />
      </KeyboardAvoidingView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  listContainer: {
    padding: 16,
  },
  tile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tileTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  partnerName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  lastMessage: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 8,
  },
  empty: {
    textAlign: "center",
    color: COLORS.textLight,
    marginTop: 40,
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.primary,
    fontSize: 16,
  },
});