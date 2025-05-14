export function GET(request: Request, { id }: Record<string, string>) {
  // In a real application, you would fetch messages for a specific conversation from your database
  // For this example, we'll return mock data based on the conversation ID
  
  const conversationMessages = {
    '1': [
      {
        id: '101',
        conversationId: '1',
        senderId: 'current-user-id',
        senderImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Hi David, I'm interested in software engineering internships. Do you have any advice?",
        timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        isRead: true,
      },
      {
        id: '102',
        conversationId: '1',
        senderId: '101',
        senderImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Hello! I'd recommend focusing on building a strong portfolio with personal projects. Also, practice your data structures and algorithms for technical interviews.",
        timestamp: Date.now() - 1000 * 60 * 59, // 59 minutes ago
        isRead: true,
      },
      {
        id: '103',
        conversationId: '1',
        senderId: 'current-user-id',
        senderImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "That's helpful. I've been working on a web app project. Would you be willing to take a look at it sometime?",
        timestamp: Date.now() - 1000 * 60 * 45, // 45 minutes ago
        isRead: true,
      },
      {
        id: '104',
        conversationId: '1',
        senderId: '101',
        senderImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Absolutely! I'd be happy to review your project. You can send me the GitHub repo or website link whenever it's ready.",
        timestamp: Date.now() - 1000 * 60 * 32, // 32 minutes ago
        isRead: true,
      },
      {
        id: '105',
        conversationId: '1',
        senderId: '101',
        senderImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Also, if you're interested, Google will be opening internship applications for next summer in about a month. I can send you the link when it's available.",
        timestamp: Date.now() - 1000 * 60 * 31, // 31 minutes ago
        isRead: false,
      },
      {
        id: '106',
        conversationId: '1',
        senderId: 'current-user-id',
        senderImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Thanks for your advice on the internship opportunity!",
        timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
        isRead: true,
      },
    ],
    '2': [
      {
        id: '201',
        conversationId: '2',
        senderId: 'current-user-id',
        senderImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Hi Michelle, I'm interested in transitioning to product management. Could you share your experience?",
        timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
        isRead: true,
      },
      {
        id: '202',
        conversationId: '2',
        senderId: '102',
        senderImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Hello! That's a great career path. My journey started with a business degree and then I took online courses in UX design and product management. The key is to develop strong analytical skills and customer empathy.",
        timestamp: Date.now() - 1000 * 60 * 60 * 2.5, // 2.5 hours ago
        isRead: true,
      },
      {
        id: '203',
        conversationId: '2',
        senderId: 'current-user-id',
        senderImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Thanks for sharing! Are there any specific courses or resources you'd recommend?",
        timestamp: Date.now() - 1000 * 60 * 60 * 2.3, // 2.3 hours ago
        isRead: true,
      },
      {
        id: '204',
        conversationId: '2',
        senderId: '102',
        senderImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "I'd recommend starting with the Product Management course on Coursera by the University of Alberta. Also, read 'Inspired' by Marty Cagan and 'Cracking the PM Interview' if you're looking for roles.",
        timestamp: Date.now() - 1000 * 60 * 60 * 2.1, // 2.1 hours ago
        isRead: true,
      },
      {
        id: '205',
        conversationId: '2',
        senderId: 'current-user-id',
        senderImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: "Would you be available for a quick call next week? I'd love to hear more about your day-to-day work and any advice for breaking into the field.",
        timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        isRead: true,
      },
    ]
  };
  
  const messages = conversationMessages[id] || [];

  return new Response(
    JSON.stringify(messages),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function POST(request: Request, { id }: Record<string, string>) {
  const { content } = await request.json();
  
  // In a real application, you would save the new message to your database
  // For this example, we'll return a mock response
  
  const newMessage = {
    id: Math.random().toString(36).substring(2, 10),
    conversationId: id,
    senderId: 'current-user-id',
    senderImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: content,
    timestamp: Date.now(),
    isRead: false,
  };

  return new Response(
    JSON.stringify(newMessage),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}