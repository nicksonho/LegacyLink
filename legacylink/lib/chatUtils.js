import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

// Generate a consistent chat ID from two user IDs
export function generateChatId(userId1, userId2) {
  const sortedIds = [userId1.toString(), userId2.toString()].sort();
  return `chat_${sortedIds[0]}_${sortedIds[1]}`;
}

// Extract user IDs from a chat ID
export function extractUserIdsFromChatId(chatId) {
  const parts = chatId.split('_');
  if (parts.length === 3 && parts[0] === 'chat') {
    return [parts[1], parts[2]];
  }
  return null;
}

// Fetch all conversations for a user
export async function fetchConversations(token) {
  try {
    const response = await fetch(`${API_URL}/api/messages/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch conversations: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
}

// Fetch messages for a specific chat
export async function fetchMessages(chatId, token) {
  try {
    const response = await fetch(`${API_URL}/api/messages/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

// Send a message
export async function sendMessage(messageData, token) {
  try {
    const response = await fetch(`${API_URL}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Format timestamp for display
export function formatMessageTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}
