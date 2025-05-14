import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import { MentorCard } from '@/components/MentorCard';
import { Mentor } from '@/types';

export default function MentorsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for mentors
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'David Lee',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Computing 2018',
      occupation: 'Software Engineer',
      company: 'Google',
      expertise: ['Web Development', 'Mobile Apps', 'Cloud Computing'],
      bio: 'Previously at Microsoft, now leading frontend development at Google. I love mentoring students and helping them navigate the tech industry.'
    },
    {
      id: '2',
      name: 'Michelle Tan',
      profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Business 2016',
      occupation: 'Product Manager',
      company: 'Apple',
      expertise: ['Product Management', 'UX Design', 'Market Research'],
      bio: 'Product leader with experience in consumer tech. Passionate about building products that improve people\'s lives.'
    },
    {
      id: '3',
      name: 'James Wong',
      profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Computing 2017',
      occupation: 'Data Scientist',
      company: 'Microsoft',
      expertise: ['Machine Learning', 'Data Analysis', 'Python', 'R'],
      bio: 'Data scientist specializing in machine learning and AI. I enjoy discussing the latest developments in AI and helping students break into the field.'
    },
    {
      id: '4',
      name: 'Sarah Chen',
      profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Business 2019',
      occupation: 'Marketing Manager',
      company: 'Meta',
      expertise: ['Digital Marketing', 'Brand Strategy', 'Content Creation'],
      bio: 'Marketing professional with experience in digital and social media marketing. I can provide guidance on building a career in marketing and PR.'
    },
    {
      id: '5',
      name: 'Alex Lim',
      profileImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      graduation: 'Engineering 2015',
      occupation: 'Engineering Lead',
      company: 'Tesla',
      expertise: ['Electrical Engineering', 'Robotics', 'Hardware Design'],
      bio: 'Electrical engineer working on cutting-edge EV technology. Happy to discuss engineering careers and provide advice on academic paths.'
    },
  ];

  // Filter mentors based on search query
  const filteredMentors = searchQuery
    ? mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some(skill =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : mentors;

  const handleMentorPress = (mentorId: string) => {
    // Navigate to mentor detail screen
    console.log(`Viewing mentor: ${mentorId}`);
  };

  const handleMessagePress = (mentorId: string) => {
    // Navigate to messaging screen
    console.log(`Messaging mentor: ${mentorId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search mentors by name, role, or expertise"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <Text style={styles.resultsText}>
          {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'} available
        </Text>

        <FlatList
          data={filteredMentors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MentorCard
              mentor={item}
              onPress={handleMentorPress}
              onMessagePress={handleMessagePress}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
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
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
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
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});