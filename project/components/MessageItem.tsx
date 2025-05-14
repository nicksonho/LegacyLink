import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Message } from '@/types';

type MessageItemProps = {
  message: Message;
  isCurrentUser: boolean;
  onPress?: () => void;
};

export function MessageItem({ message, isCurrentUser, onPress }: MessageItemProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {!isCurrentUser && (
        <Image 
          source={{ uri: message.senderImage }} 
          style={styles.avatar}
        />
      )}
      
      <View style={[
        styles.messageContent,
        isCurrentUser ? styles.currentUserContent : styles.otherUserContent
      ]}>
        <Text style={[
          styles.messageText,
          isCurrentUser ? styles.currentUserText : styles.otherUserText
        ]}>
          {message.content}
        </Text>
        <Text style={styles.timestamp}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  currentUserContainer: {
    alignSelf: 'flex-end',
  },
  otherUserContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageContent: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '100%',
  },
  currentUserContent: {
    backgroundColor: '#0A2463',
    borderBottomRightRadius: 4,
  },
  otherUserContent: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  currentUserText: {
    color: '#FFFFFF',
  },
  otherUserText: {
    color: '#1F2937',
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    alignSelf: 'flex-end',
  }
});