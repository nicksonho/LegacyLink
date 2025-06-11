// app/(root)/index.jsx

import SafeScreen from '@/components/SafeScreen';
import { SignOutButton } from '@/components/SignOutButton';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <SafeScreen>
      <View style={{ flex: 1, padding: 20 }}>
        {/* Dev-only button to navigate into /onboarding */}
        <TouchableOpacity
          onPress={() => router.push('/onboarding')}
          style={{
            marginBottom: 20,
            padding: 12,
            backgroundColor: COLORS.primary,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: COLORS.white }}>ABOUT YOURSELF 👻</Text>
        </TouchableOpacity>

        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
            <Text style={{ color: COLORS.primary, marginBottom: 8 }}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
            <Text style={{ color: COLORS.primary }}>Sign up</Text>
          </TouchableOpacity>
        </SignedOut>
      </View>
    </SafeScreen>
  );
}