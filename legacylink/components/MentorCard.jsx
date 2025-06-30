import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function MentorCard({ mentor, onRequest }) {
  return (
    <LinearGradient colors={['#fff', '#fdf7f0']} style={styles.card}>
      <View style={styles.avatarContainer}>
        {mentor.profilePicUrl ? (
          <Image
            source={{ uri: mentor.profilePicUrl }}
            style={styles.avatar}
          />
        ) : (
          <LinearGradient
            colors={['#e0c3af', '#c2a08e']}
            style={styles.avatarPlaceholder}
          />
        )}
      </View>
      <Text style={styles.name}>{mentor.name}</Text>
      <Text style={styles.bio}>{mentor.bio || 'No bio provided.'}</Text>
      <View style={styles.interestsContainer}>
        {mentor.interests?.length ? (
          mentor.interests.slice(0, 3).map((interest, idx) => (
            <View key={idx} style={styles.interestChip}>
              <Text style={styles.interestText}>✨ {interest}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noInterests}>No interests listed.</Text>
        )}
      </View>
      <TouchableOpacity onPress={onRequest} style={styles.button} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.88,
    height: height * 0.65, // ADAPTIVE HEIGHT
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  avatarContainer: {
    marginBottom: 8,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#8B5E3C',
    backgroundColor: '#f0f0f0',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5e3c2b',
    textAlign: 'center',
    marginVertical: 4,
  },
  bio: {
    fontSize: 15,
    color: '#5e3c2b',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  interestChip: {
    backgroundColor: '#f7e9da',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 4,
  },
  interestText: {
    fontSize: 13,
    color: '#5e3c2b',
  },
  noInterests: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#8B5E3C',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});