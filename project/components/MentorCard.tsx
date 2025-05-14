import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Briefcase, GraduationCap, MessageCircle } from 'lucide-react-native';
import { Button } from './Button';
import { Mentor } from '@/types';

type MentorCardProps = {
  mentor: Mentor;
  onPress: (mentorId: string) => void;
  onMessagePress: (mentorId: string) => void;
};

export function MentorCard({ mentor, onPress, onMessagePress }: MentorCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onPress(mentor.id)}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <Image 
          source={{ uri: mentor.profileImage }} 
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.name}>{mentor.name}</Text>
          
          <View style={styles.infoRow}>
            <GraduationCap size={16} color="#6B7280" />
            <Text style={styles.info}>{mentor.graduation}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Briefcase size={16} color="#6B7280" />
            <Text style={styles.info}>{mentor.occupation}</Text>
          </View>
          
          <View style={styles.tagsContainer}>
            {mentor.expertise.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
            {mentor.expertise.length > 3 && (
              <Text style={styles.moreTag}>+{mentor.expertise.length - 3}</Text>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Button 
          title="View Profile" 
          onPress={() => onPress(mentor.id)} 
          variant="outline"
          size="small"
        />
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={() => onMessagePress(mentor.id)}
        >
          <MessageCircle size={20} color="#0A2463" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  info: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#4B5563',
  },
  moreTag: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    alignSelf: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
});