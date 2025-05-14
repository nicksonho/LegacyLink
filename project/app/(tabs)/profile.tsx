import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Settings, CreditCard as Edit, LogOut, Book, Award, Briefcase, Mail, Phone, Globe } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/Button';

export default function ProfileScreen() {
  const { authState, signOut } = useAuth();
  const user = authState.user;

  // Mock data for user profile
  const userProfile = {
    bio: "Computer Science student at NUS, specializing in Artificial Intelligence. Looking for guidance in software engineering career paths.",
    education: "National University of Singapore\nBachelor of Computing (Computer Science)\n2022 - 2026",
    skills: ["Python", "JavaScript", "React", "Machine Learning", "Data Analysis"],
    interests: ["Artificial Intelligence", "Mobile Development", "Cloud Computing"],
    contact: {
      email: "john.doe@u.nus.edu",
      phone: "+65 9123 4567",
      linkedin: "linkedin.com/in/johndoe"
    }
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    console.log('Edit profile');
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Header with settings */}
          <View style={styles.header}>
            <Text style={styles.screenTitle}>My Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          {/* Profile section */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: user?.profileImage || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.profileImage}
            />
            <Text style={styles.nameText}>{user?.name || 'John Doe'}</Text>
            <Text style={styles.roleText}>{user?.role === 'student' ? 'Student' : 'Alumni'}</Text>
            
            <View style={styles.actionButtons}>
              <Button
                title="Edit Profile"
                onPress={handleEditProfile}
                variant="outline"
                size="small"
                fullWidth
              />
              <Button
                title="Log Out"
                onPress={handleLogout}
                variant="secondary"
                size="small"
                fullWidth
              />
            </View>
          </View>

          {/* Bio section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>About</Text>
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color="#0A2463" />
              </TouchableOpacity>
            </View>
            <Text style={styles.bioText}>{userProfile.bio}</Text>
          </View>

          {/* Education section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Education</Text>
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color="#0A2463" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Book size={20} color="#0A2463" style={styles.infoIcon} />
              <Text style={styles.infoText}>{userProfile.education}</Text>
            </View>
          </View>

          {/* Skills section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color="#0A2463" />
              </TouchableOpacity>
            </View>
            <View style={styles.tagsContainer}>
              {userProfile.skills.map((skill, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Interests section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color="#0A2463" />
              </TouchableOpacity>
            </View>
            <View style={styles.tagsContainer}>
              {userProfile.interests.map((interest, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <TouchableOpacity style={styles.editButton}>
                <Edit size={16} color="#0A2463" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoItem}>
              <Mail size={20} color="#0A2463" style={styles.infoIcon} />
              <Text style={styles.infoText}>{userProfile.contact.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={20} color="#0A2463" style={styles.infoIcon} />
              <Text style={styles.infoText}>{userProfile.contact.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Globe size={20} color="#0A2463" style={styles.infoIcon} />
              <Text style={styles.infoText}>{userProfile.contact.linkedin}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  screenTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1F2937',
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  nameText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  roleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1F2937',
  },
  editButton: {
    padding: 4,
  },
  bioText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
  },
});