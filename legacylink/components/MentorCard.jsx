import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function MentorCard({ mentor, onRequest }) {
  return (
    <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6 }}>
      <Image
        source={{ uri: mentor.profilePicUrl || 'https://via.placeholder.com/100' }}
        style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 12 }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{mentor.name}</Text>
      <Text style={{ color: '#666', marginBottom: 8 }}>{mentor.bio}</Text>
      <Text style={{ fontSize: 12, marginBottom: 8 }}>{mentor.interests?.join(', ')}</Text>
      <TouchableOpacity onPress={onRequest} style={{ backgroundColor: '#3B82F6', padding: 10, borderRadius: 8 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Request Mentorship</Text>
      </TouchableOpacity>
    </View>
  );
}
