import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function RequestCard({ request, onRespond }) {
  const student = request.sender;
  return (
    <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6 }}>
      <Image
        source={{ uri: student.profilePicUrl || 'https://via.placeholder.com/100' }}
        style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 12 }}
      />
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{student.name}</Text>
      <Text style={{ color: '#666', marginBottom: 8 }}>{student.bio}</Text>
      <Text style={{ fontSize: 12, marginBottom: 8 }}>{student.course} • Year {student.yearOfStudy}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => onRespond('accepted')} style={{ backgroundColor: '#10B981', padding: 10, borderRadius: 8, flex: 1, marginRight: 8 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRespond('rejected')} style={{ backgroundColor: '#EF4444', padding: 10, borderRadius: 8, flex: 1 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}