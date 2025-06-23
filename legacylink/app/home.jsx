import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 72) / 2;
const CARD_HEIGHT = 120;

export default function HomePage() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  const displayName = user?.firstName || 'there';

  return (
    <LinearGradient colors={['#ffe9d2', '#fff']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* 👋 Animated Greeting */}
        <Animatable.Text
          animation="fadeInDown"
          duration={1000}
          style={styles.greeting}
        >
          Hi {displayName} <Text style={styles.wave}>👋</Text>
        </Animatable.Text>

        {/* 🧭 Branding */}
        <View style={styles.logoContainer}>
          <Ionicons name="people-circle" size={52} color="#8B5E3C" />
          <Text style={styles.appTitle}>LegacyLink</Text>
          <Text style={styles.tagline}>
            Connecting Generations, Empowering Futures
          </Text>
        </View>

        {/* 🔲 Cards Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/mentors')}
              activeOpacity={0.8}
            >
              <FontAwesome5 name="user-friends" size={28} color="#8B5E3C" />
              <Text style={styles.cardText}>Mentors</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/messages')}
              activeOpacity={0.8}
            >
              <MaterialIcons name="message" size={28} color="#8B5E3C" />
              <Text style={styles.cardText}>Messages</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push('/profile')}
              activeOpacity={0.8}
            >
              <Ionicons name="person-circle-outline" size={28} color="#8B5E3C" />
              <Text style={styles.cardText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.card, styles.signOutCard]}
              onPress={signOut}
              activeOpacity={0.8}
            >
              <Ionicons name="log-out-outline" size={28} color="#8B5E3C" />
              <Text style={[styles.cardText, styles.signOutText]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🌟 Footer Quote */}
        <View style={styles.footer}>
          <Text style={styles.footerQuote}>
            ✨ You’re one connection away from a breakthrough.
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
    justifyContent: 'flex-start',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B5E3C',
    marginBottom: 8,
  },
  wave: {
    fontSize: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B5E3C',
    marginTop: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#8B5E3C',
    marginTop: 4,
    textAlign: 'center',
  },
  gridContainer: {
    justifyContent: 'center',
    marginTop: 16,
    flexGrow: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 12,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5E3C',
  },
  signOutCard: {
    backgroundColor: '#ffe5e5',
  },
  signOutText: {
    color: '#8B5E3C',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 12,
  },
  footerQuote: {
    fontSize: 13,
    color: '#8B5E3C',
    fontStyle: 'italic',
  },
});