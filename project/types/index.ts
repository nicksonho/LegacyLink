// User types
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni';
  profileImage: string;
  bio?: string;
  major?: string;
  graduation?: string;
  occupation?: string;
  company?: string;
  expertise?: string[];
};

export type Mentor = {
  id: string;
  name: string;
  profileImage: string;
  graduation: string;
  occupation: string;
  company: string;
  expertise: string[];
  bio: string;
  availability?: string[];
  reviews?: Review[];
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  timestamp: number;
};

// Authentication types
export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Message types
export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  senderImage: string;
  content: string;
  timestamp: number;
  isRead: boolean;
};

export type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  participantImage: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
};