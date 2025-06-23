import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { styles as authStyles } from '@/assets/styles/auth.styles';
import { COLORS } from '@/constants/colors';

export default function HomePage() {
  return (
    <ScrollView contentContainerStyle={[authStyles.container, { justifyContent: 'flex-start', alignItems: 'center' }]}>  
      <Image source={require('@/assets/images/legacy-link-logo-brown.png')} style={authStyles.illustration} />
      <Text style={localStyles.slogan}>Connecting Generations, Empowering Futures</Text>

      <View style={localStyles.linksContainer}>
        <Link href="/mentors" asChild>
          <TouchableOpacity style={authStyles.button}>
            <Text style={authStyles.buttonText}>Mentors (Coming Soon)</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/messages" asChild>
          <TouchableOpacity style={authStyles.button}>
            <Text style={authStyles.buttonText}>Messages (Coming Soon)</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/profile" asChild>
          <TouchableOpacity style={authStyles.button}>
            <Text style={authStyles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  slogan: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
    fontStyle: 'italic',
  },
  linksContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    gap: 12,
  },
});
