import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeScreen from "../components/SafeScreen";
import { COLORS } from "../constants/colors";
import { useRouter } from "expo-router";

// Placeholder conversations
const conversations = [
  {
    _id: "1",
    partner: {
      name: "Mentor Jane",
      profilePicUrl: "https://via.placeholder.com/40x40.png?text=J",
    },
    lastMessage: "Looking forward to our session!",
    lastMessageTime: "2h ago",
  },
  {
    _id: "2",
    partner: {
      name: "Mentor John",
      profilePicUrl: "https://via.placeholder.com/40x40.png?text=J",
    },
    lastMessage: "See you next week!",
    lastMessageTime: "1d ago",
  },
];

export default function ChatListPage() {
  const router = useRouter();

  return (
    <SafeScreen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      <FlatList
        data={conversations}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tile}
            onPress={() => router.push(`/chat/${item._id}`)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.partner.profilePicUrl }} style={styles.avatar} />
            <View style={styles.tileTextContainer}>
              <Text style={styles.partnerName}>{item.partner.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.time}>{item.lastMessageTime}</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.empty}>No chats yet.</Text>}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
}); 