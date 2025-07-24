// Generate a consistent chat ID from two user IDs
export function generateChatId(userId1, userId2) {
  // Sort the IDs to ensure consistency regardless of who initiates
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
