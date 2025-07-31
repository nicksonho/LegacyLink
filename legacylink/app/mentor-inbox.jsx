import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { generateChatId } from '../lib/chatUtils';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

export default function MentorInbox() {
  const { getToken } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const fetchRequests = useCallback(async () => {
    try {
      const token = await getToken();
      
      // Get current user info
      const userResponse = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const currentUser = await userResponse.json();
      setCurrentUserId(currentUser._id);
      
      const res = await fetch(`${API_URL}/api/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Requests API response:', data);
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setRequests(data);
      } else if (data && Array.isArray(data.requests)) {
        setRequests(data.requests);
      } else {
        console.error('Invalid response format:', data);
        setRequests([]);
      }
    } catch (err) {
      console.error('Failed to fetch requests:', err);
      setRequests([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]); // Add fetchRequests as dependency

  const respondToRequest = async (id, action) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/requests/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error('Request failed');
      fetchRequests(); // Refresh list
    } catch (_err) {
      Alert.alert('Error', 'Could not update request.');
    }
  };

  const startChat = (senderId) => {
    if (!currentUserId) {
      Alert.alert('Error', 'User information not loaded yet.');
      return;
    }
    const chatId = generateChatId(currentUserId, senderId);
    router.push(`/chat/${chatId}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#744d32" />
      </TouchableOpacity>

      <Text style={styles.title}>Incoming Requests </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#744d32" style={{ marginTop: 40 }} />
      ) : !Array.isArray(requests) ? (
        <Text style={styles.empty}>Error loading requests. Please try again.</Text>
      ) : requests.length === 0 ? (
        <Text style={styles.empty}>No requests yet.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {requests.map((req) => (
            <View key={req._id} style={styles.card}>
              <Text style={styles.name}>{req.sender.name}</Text>
              <Text style={styles.text}>{req.sender.course} • Year {req.sender.yearOfStudy}</Text>
              <Text style={styles.text}>{req.sender.bio}</Text>
              <Text style={styles.message}> {req.message}</Text>

              {req.status === 'pending' ? (
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => respondToRequest(req._id, 'accepted')}
                    style={[styles.button, styles.accept]}
                  >
                    <Text style={styles.buttonText}>Accept </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => respondToRequest(req._id, 'rejected')}
                    style={[styles.button, styles.reject]}
                  >
                    <Text style={styles.buttonText}>Reject </Text>
                  </TouchableOpacity>
                </View>
              ) : req.status === 'accepted' ? (
                <View style={styles.actions}>
                  <Text style={styles.status}>Status: Accepted</Text>
                  <TouchableOpacity
                    onPress={() => startChat(req.sender._id)}
                    style={[styles.button, styles.chat]}
                  >
                    <Text style={styles.buttonText}>Start Chat</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.status}>
                  Status: Rejected
                </Text>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fffaf5',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5e3c2b',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#744d32',
  },
  text: {
    color: '#744d32',
    marginVertical: 2,
  },
  message: {
    marginTop: 6,
    fontStyle: 'italic',
    color: '#5e3c2b',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  accept: {
    backgroundColor: '#d2f8ce',
  },
  reject: {
    backgroundColor: '#ffd6d6',
  },
  chat: {
    backgroundColor: '#d0e8ff',
  },
  buttonText: {
    fontWeight: '600',
    color: '#5e3c2b',
  },
  status: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
    color: '#5e3c2b',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#aaa',
  },
});