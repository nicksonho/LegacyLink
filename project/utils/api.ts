import { User, Mentor, Conversation, Message } from '@/types';

// Base URL for API requests
const API_URL = '/api';

// Reusable fetch function with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchAPI<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (userData: { email: string; password: string; name: string; role: 'student' | 'alumni' }) => {
    return fetchAPI<{ user: User; token: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  getProfile: async () => {
    return fetchAPI<User>('/users/profile');
  },
  
  updateProfile: async (profileData: Partial<User>) => {
    return fetchAPI<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Mentors API
export const mentorsAPI = {
  getAll: async () => {
    return fetchAPI<Mentor[]>('/mentors');
  },
  
  getById: async (id: string) => {
    return fetchAPI<Mentor>(`/mentors/${id}`);
  },
  
  search: async (query: string) => {
    return fetchAPI<Mentor[]>(`/mentors/search?q=${encodeURIComponent(query)}`);
  },
  
  filter: async (filters: { expertise?: string[], availability?: string[] }) => {
    const params = new URLSearchParams();
    
    if (filters.expertise?.length) {
      filters.expertise.forEach(tag => params.append('expertise', tag));
    }
    
    if (filters.availability?.length) {
      filters.availability.forEach(time => params.append('availability', time));
    }
    
    return fetchAPI<Mentor[]>(`/mentors/filter?${params.toString()}`);
  },
};

// Messages API
export const messagesAPI = {
  getConversations: async () => {
    return fetchAPI<Conversation[]>('/messages/conversations');
  },
  
  getConversation: async (conversationId: string) => {
    return fetchAPI<Message[]>(`/messages/conversations/${conversationId}`);
  },
  
  sendMessage: async (conversationId: string, content: string) => {
    return fetchAPI<Message>(`/messages/conversations/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },
  
  startConversation: async (recipientId: string, initialMessage: string) => {
    return fetchAPI<{ conversationId: string; message: Message }>('/messages/conversations', {
      method: 'POST',
      body: JSON.stringify({ recipientId, content: initialMessage }),
    });
  },
};