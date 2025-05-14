import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Conversation } from '@/types';

type ConversationItemProps = {
  conversation: Conversation;
  onPress: (conversationId: string) => void;
};

export function ConversationItem({ conversation, onPress }: ConversationItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(conversation.id)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: conversation.participantImage }}
        style={styles.avatar}
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{conversation.participantName}</Text>
          <Text style={styles.time}>{formatTime(conversation.lastMessageTime)}</Text>
        </View>
        
        <View style={styles.previewContainer}>
          <Text 
            style={styles.preview} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {conversation.lastMessage}
          </Text>
          
          {conversation.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function formatTime(timestamp: number): string {
  const now = new Date();
  const messageDate = new Date(timestamp);
  
  // If today, show time
  if (messageDate.toDateString() === now.toDateString()) {
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  
  // If within last week, show day
  const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[messageDate.getDay()];
  }
  
  // Otherwise show date
  const month = messageDate.getMonth() + 1;
  const day = messageDate.getDate();
  return `${month}/${day}`;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  previewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  badge: {
    backgroundColor: '#0A2463',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginLeft: 8,
  },
  badgeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
});