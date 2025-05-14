export function GET() {
  // In a real application, you would fetch the user's conversations from your database
  // For this example, we'll return mock data
  
  const conversations = [
    {
      id: '1',
      participantId: '101',
      participantName: 'David Lee',
      participantImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastMessage: "Thanks for your advice on the internship opportunity!",
      lastMessageTime: Date.now() - 1000 * 60 * 30, // 30 minutes ago
      unreadCount: 2,
    },
    {
      id: '2',
      participantId: '102',
      participantName: 'Michelle Tan',
      participantImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastMessage: "Would you be available for a quick call next week?",
      lastMessageTime: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      unreadCount: 0,
    },
    {
      id: '3',
      participantId: '103',
      participantName: 'James Wong',
      participantImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastMessage: "I'll send you the resources on machine learning that we discussed.",
      lastMessageTime: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
      unreadCount: 0,
    },
    {
      id: '4',
      participantId: '104',
      participantName: 'Sarah Chen',
      participantImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastMessage: "Let me know if you have any questions about the marketing position.",
      lastMessageTime: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
      unreadCount: 0,
    },
    {
      id: '5',
      participantId: '105',
      participantName: 'Alex Lim',
      participantImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      lastMessage: "The engineering showcase is on Friday at 3 PM. Hope you can make it!",
      lastMessageTime: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
      unreadCount: 1,
    },
  ];

  return new Response(
    JSON.stringify(conversations),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function POST(request: Request) {
  const { recipientId, content } = await request.json();
  
  // In a real application, you would create a new conversation and message in your database
  // For this example, we'll return mock data
  
  const newConversation = {
    id: Math.random().toString(36).substring(2, 10),
    participantId: recipientId,
    participantName: 'New Contact',
    participantImage: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: content,
    lastMessageTime: Date.now(),
    unreadCount: 0,
  };
  
  const newMessage = {
    id: Math.random().toString(36).substring(2, 10),
    conversationId: newConversation.id,
    senderId: 'current-user-id',
    senderImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: content,
    timestamp: Date.now(),
    isRead: false,
  };

  return new Response(
    JSON.stringify({
      conversationId: newConversation.id,
      message: newMessage,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}