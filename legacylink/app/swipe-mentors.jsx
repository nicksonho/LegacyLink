import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import MentorCard from '../components/MentorCard';

const { width } = Dimensions.get('window');
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export default function SwipeMentors() {
  const { getToken } = useAuth();
  const router = useRouter();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = await getToken();
        if (!token) {
          Alert.alert('Auth Error', 'User token missing.');
          return;
        }
        const res = await fetch(`${API_URL}/api/match/recommendations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`Fetch error [${res.status}]:`, errorText);
          Alert.alert('Error', `Failed to fetch mentors: ${res.status}`);
          return;
        }
        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error('FetchMentors Error:', err);
        Alert.alert('Error', 'Failed to fetch mentors.');
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const handleRequest = async (mentorId) => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/requests`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverId: mentorId, message: 'Hi! I’d love to connect.' }),
      });
      if (res.ok) Alert.alert('✅ Request Sent', 'The mentor will be notified.');
      else {
        const errorText = await res.text();
        console.error(`Request error [${res.status}]:`, errorText);
        Alert.alert('Error', 'Failed to send request.');
      }
    } catch (err) {
      console.error('Request Error:', err);
      Alert.alert('Error', 'Failed to send request.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#8B5E3C" />
        <Text style={styles.loadingText}>Loading mentors...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.8}>
        <Ionicons name="arrow-back" size={24} color="#5e3c2b" />
      </TouchableOpacity>

      <Text style={styles.header}>Recommended Mentors</Text>

      {/* Instruction Banner */}
      <View style={styles.instructionBox}>
        <Text style={styles.instructionText}>👈 Swipe left to browse , “Request” to connect </Text>
      </View>

      {mentors.length === 0 ? (
        <Text style={styles.noMentors}>No mentors found. Please adjust your interests or bio to match better.</Text>
      ) : (
        <FlatList
          data={mentors}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MentorCard mentor={item} onRequest={() => handleRequest(item._id)} />
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          decelerationRate="fast"
          snapToInterval={width * 0.8 + 20}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#FFF8F1' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#5e3c2b' },
  instructionBox: {
    backgroundColor: '#FDEBD2',
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  instructionText: {
    color: '#5e3c2b',
    textAlign: 'center',
    fontSize: 14,
  },
  noMentors: { textAlign: 'center', fontSize: 16, color: '#555', padding: 20 },
  cardWrapper: { width: width * 0.8, marginHorizontal: 10 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#8B5E3C', fontSize: 16 },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
});