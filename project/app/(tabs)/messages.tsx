import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Search, Users, Inbox, Clock, Settings } from 'lucide-react-native';
import { ConversationItem } from '@/components/ConversationItem';
import { Conversation } from '@/types';

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'mentors' | 'requests' | 'archived'>('all');
  
  // Mock data for conversations
  const conversations: Conversation[] = [
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

  // Filter conversations based on search query and active tab
  const filteredConversations = searchQuery
    ? conversations.filter(conversation =>
        conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  const handleConversationPress = (conversationId: string) => {
    // Navigate to conversation detail screen
    console.log(`Opening conversation: ${conversationId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Inbox size={20} color={activeTab === 'all' ? '#0A2463' : '#6B7280'} />
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'mentors' && styles.activeTab]}
            onPress={() => setActiveTab('mentors')}
          >
            <Users size={20} color={activeTab === 'mentors' ? '#0A2463' : '#6B7280'} />
            <Text style={[styles.tabText, activeTab === 'mentors' && styles.activeTabText]}>
              Mentors
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
            onPress={() => setActiveTab('requests')}
          >
            <Clock size={20} color={activeTab === 'requests' ? '#0A2463' : '#6B7280'} />
            <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
              Requests
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'archived' && styles.activeTab]}
            onPress={() => setActiveTab('archived')}
          >
            <Settings size={20} color={activeTab === 'archived' ? '#0A2463' : '#6B7280'} />
            <Text style={[styles.tabText, activeTab === 'archived' && styles.activeTabText]}>
              Archived
            </Text>
          </TouchableOpacity>
        </View>

        {filteredConversations.length > 0 ? (
          <FlatList
            data={filteredConversations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ConversationItem
                conversation={item}
                onPress={handleConversationPress}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptyMessage}>
              Start connecting with mentors to begin your conversations
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0A2463',
  },
  tabText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  activeTabText: {
    color: '#0A2463',
    fontFamily: 'Inter-SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});