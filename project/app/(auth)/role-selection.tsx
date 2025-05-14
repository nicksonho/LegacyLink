import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GraduationCap, Briefcase } from 'lucide-react-native';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';

export default function RoleSelectionScreen() {
  const { signUp } = useAuth();
  const params = useLocalSearchParams<{ name: string; email: string; password: string }>();
  const [selectedRole, setSelectedRole] = useState<'student' | 'alumni' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = (role: 'student' | 'alumni') => {
    setSelectedRole(role);
  };

  const handleSubmit = async () => {
    if (!selectedRole) return;
    
    try {
      setIsLoading(true);
      
      // Call the signUp function from the auth context
      await signUp(
        params.email || '',
        params.password || '',
        params.name || '',
        selectedRole
      );
      
      // Navigation happens in the signUp function
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>I am a...</Text>
          <Text style={styles.subtitle}>Choose your role in the LegacyLink community</Text>
        </View>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedRole === 'student' && styles.optionCardSelected
            ]}
            onPress={() => handleRoleSelection('student')}
            activeOpacity={0.8}
          >
            <View style={[
              styles.iconContainer,
              selectedRole === 'student' && styles.iconContainerSelected
            ]}>
              <GraduationCap
                size={32}
                color={selectedRole === 'student' ? '#FFFFFF' : '#0A2463'}
              />
            </View>
            <Text style={styles.optionTitle}>Student</Text>
            <Text style={styles.optionDescription}>
              Connect with alumni mentors, learn from their experiences, and get guidance for your career
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedRole === 'alumni' && styles.optionCardSelected
            ]}
            onPress={() => handleRoleSelection('alumni')}
            activeOpacity={0.8}
          >
            <View style={[
              styles.iconContainer,
              selectedRole === 'alumni' && styles.iconContainerSelected
            ]}>
              <Briefcase
                size={32}
                color={selectedRole === 'alumni' ? '#FFFFFF' : '#0A2463'}
              />
            </View>
            <Text style={styles.optionTitle}>Alumni</Text>
            <Text style={styles.optionDescription}>
              Share your knowledge, guide students, and give back to the NUS community
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Continue"
          onPress={handleSubmit}
          disabled={!selectedRole}
          loading={isLoading}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 40,
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  optionCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionCardSelected: {
    borderColor: '#0A2463',
    backgroundColor: '#F0F4FF',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainerSelected: {
    backgroundColor: '#0A2463',
  },
  optionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 8,
  },
  optionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});