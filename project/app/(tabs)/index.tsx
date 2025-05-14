import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { GraduationCap, Award, Calendar, Briefcase } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/Button';

export default function HomeScreen() {
  const { authState } = useAuth();
  const user = authState.user;

  const featuredMentors = [
    {
      id: '1',
      name: 'David Lee',
      role: 'Software Engineer',
      company: 'Google',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      name: 'Michelle Tan',
      role: 'Product Manager',
      company: 'Apple',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '3',
      name: 'James Wong',
      role: 'Data Scientist',
      company: 'Microsoft',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Tech Career Fair',
      date: 'May 15, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'NUS School of Computing',
    },
    {
      id: '2',
      title: 'Alumni Networking Night',
      date: 'May 22, 2025',
      time: '6:30 PM - 9:00 PM',
      location: 'NUS Business School',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Welcome section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{user?.name || 'Guest'}</Text>
          </View>

          {/* Stats section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <GraduationCap size={24} color="#0A2463" />
              </View>
              <Text style={styles.statValue}>200+</Text>
              <Text style={styles.statLabel}>Alumni Mentors</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Award size={24} color="#0A2463" />
              </View>
              <Text style={styles.statValue}>50+</Text>
              <Text style={styles.statLabel}>Fields of Study</Text>
            </View>

            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Briefcase size={24} color="#0A2463" />
              </View>
              <Text style={styles.statValue}>100+</Text>
              <Text style={styles.statLabel}>Companies</Text>
            </View>
          </View>

          {/* Featured mentors section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Mentors</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.mentorsScrollContainer}
            >
              {featuredMentors.map((mentor) => (
                <TouchableOpacity key={mentor.id} style={styles.mentorCard}>
                  <Image 
                    source={{ uri: mentor.image }} 
                    style={styles.mentorImage}
                  />
                  <Text style={styles.mentorName}>{mentor.name}</Text>
                  <Text style={styles.mentorRole}>{mentor.role}</Text>
                  <Text style={styles.mentorCompany}>{mentor.company}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Events section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            {upcomingEvents.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventDateContainer}>
                  <Calendar size={24} color="#0A2463" />
                </View>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDateTime}>{event.date} • {event.time}</Text>
                  <Text style={styles.eventLocation}>{event.location}</Text>
                </View>
                <Button
                  title="RSVP"
                  onPress={() => {}}
                  variant="outline"
                  size="small"
                />
              </View>
            ))}
          </View>

          {/* Quick actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionButton}>
                <Users size={24} color="#0A2463" />
                <Text style={styles.quickActionText}>Find Mentor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <MessageCircle size={24} color="#0A2463" />
                <Text style={styles.quickActionText}>Messages</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <Calendar size={24} color="#0A2463" />
                <Text style={styles.quickActionText}>Events</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionButton}>
                <User size={24} color="#0A2463" />
                <Text style={styles.quickActionText}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Import lucide icons that are used
import { Users, MessageCircle, User } from 'lucide-react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  welcomeSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  nameText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  seeAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#0A2463',
  },
  mentorsScrollContainer: {
    paddingBottom: 8,
  },
  mentorCard: {
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  mentorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  mentorName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  mentorRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 2,
  },
  mentorCompany: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventDateContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  eventDateTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 2,
  },
  eventLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  quickActionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginTop: 8,
  },
});