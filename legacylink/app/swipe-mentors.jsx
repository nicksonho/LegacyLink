import { useEffect, useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import MentorCard from '../components/MentorCard';

const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';

export default function SwipeMentors() {
  const { getToken } = useAuth();
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.error('Token is undefined');
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
        console.log('Fetched mentors:', data);
        setMentors(data);
      } catch (err) {
        console.error('FetchMentors Error:', err);
        Alert.alert('Error', 'Failed to fetch mentors.');
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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ receiverId: mentorId, message: 'Hi! I’d love to connect.' }),
      });
      if (res.ok) Alert.alert('Request Sent');
      else {
        const errorText = await res.text();
        console.error(`Request error [${res.status}]:`, errorText);
        Alert.alert('Error sending request');
      }
    } catch (err) {
      console.error('Request Error:', err);
      Alert.alert('Error', 'Failed to send request.');
    }
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Recommended Mentors</Text>
      {mentors.length === 0 ? (
        <Text>No mentors found. Please check your matching criteria or connection.</Text>
      ) : (
        mentors.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} onRequest={() => handleRequest(mentor._id)} />
        ))
      )}
    </ScrollView>
  );
}