import Constants from 'expo-constants';
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import * as Animatable from "react-native-animatable";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const API_URL = Constants.expoConfig?.extra?.apiUrl;
const TOTAL_FIELDS = 5;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Profile() {
  const { getToken } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Failed to load profile [${res.status}]`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!userData) return;
    const filledCount = [
      userData.name,
      userData.bio,
      userData.course,
      userData.yearOfStudy,
      userData.interests?.length ? userData.interests : null,
    ].filter(Boolean).length;
    const targetWidth = (filledCount / TOTAL_FIELDS) * SCREEN_WIDTH;
    Animated.timing(progressAnim, {
      toValue: targetWidth,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [userData]);

  if (loading) {
    return (
      <View style={styles.skeletonContainer}>
        {[...Array(TOTAL_FIELDS + 1)].map((_, i) => (
          <Animatable.View
            key={i}
            animation="pulse"
            iterationCount="infinite"
            delay={i * 100}
            style={styles.skeletonBubble}
          />
        ))}
      </View>
    );
  }
  if (error) return <Text style={styles.error}>{error}</Text>;

  const handlePress = async (action) => {
    await Haptics.selectionAsync();
    action();
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setUserData({ ...userData, profilePicUrl: result.assets[0].uri });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await getToken();
      const payload = {
        ...userData,
        yearOfStudy:
          userData.yearOfStudy === "" ? undefined : parseInt(userData.yearOfStudy),
      };
      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Failed to update profile [${res.status}]`);
      setIsEditing(false);
      Toast.show({
        type: "success",
        text1: "✅ Profile updated",
        text2: "Your changes were saved successfully.",
      });
    } catch (err) {
      setError(err.message);
      Animatable.shake(styles.cardRef);
    }
  };

  return (
    <LinearGradient colors={["#fffaf5", "#fbe0c3"]} style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity
        onPress={() => router.push('/home')}
        style={styles.backButton}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={24} color="#744d32" />
      </TouchableOpacity>

      {/* Progress bar */}
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[styles.progressBarFill, { width: progressAnim }]}
        />
      </View>

      {/* Main content */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.Text animation="fadeInDown" delay={200} style={styles.header}>
          Welcome to <Text style={{ color: "#744d32" }}>LegacyLink</Text> ✨
        </Animatable.Text>

        <Animatable.View
          ref={(ref) => (styles.cardRef = ref)}
          animation="fadeInUp"
          delay={400}
          style={styles.card}
        >
          <TouchableOpacity
            onPress={() => handlePress(pickImage)}
            style={styles.avatarContainer}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#d6a17d", "#744d32"]}
              style={styles.avatarBorder}
            >
              <Image
                source={{ uri: userData.profilePicUrl || "https://via.placeholder.com/150" }}
                style={styles.avatar}
              />
            </LinearGradient>
            <Text style={styles.tapToChange}>📸 Tap to change</Text>
          </TouchableOpacity>

          {renderField("Name", "name", userData, setUserData, isEditing)}
          {renderField("Bio", "bio", userData, setUserData, isEditing)}
          {renderField("Course", "course", userData, setUserData, isEditing)}
          {renderField("Year of Study", "yearOfStudy", userData, setUserData, isEditing, true)}
          {renderField("Interests", "interests", userData, setUserData, isEditing, false, true)}

          <Animatable.View
            animation={isEditing ? "pulse" : "bounce"}
            iterationCount={isEditing ? 1 : 2}
            style={{ marginTop: 20 }}
          >
            <TouchableOpacity
              onPress={() =>
                handlePress(isEditing ? handleUpdate : () => setIsEditing(true))
              }
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isEditing ? '💾 Save Changes' : '✏️ Edit Profile'}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}

function renderField(
  label,
  key,
  userData,
  setUserData,
  isEditing,
  isNumeric = false,
  isArray = false
) {
  return (
    <Animatable.View animation="fadeInUp" delay={600} style={styles.bubble}>
      <Text style={styles.bubbleLabel}>{label}</Text>
      <TextInput
        value={
          isArray
            ? userData[key]?.join(', ') || ''
            : userData[key] === undefined || userData[key] === null
            ? ''
            : String(userData[key])
        }
        editable={isEditing}
        onChangeText={(text) => {
          const updatedValue =
            isArray ? text.split(',').map((i) => i.trim()) : text;
          setUserData({ ...userData, [key]: updatedValue });
        }}
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#aaa"
        keyboardType={isNumeric ? 'numeric' : 'default'}
      />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  progressBarBackground: { height: 4, backgroundColor: '#eee', width: '100%' },
  progressBarFill: { height: 4, backgroundColor: '#744d32' },
  scroll: { paddingBottom: 40, paddingHorizontal: 20 },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
    color: '#5e3c2b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  skeletonContainer: { flex: 1, padding: 20 },
  skeletonBubble: { height: 50, backgroundColor: '#eee', borderRadius: 14, marginBottom: 20 },
  avatarContainer: { alignItems: 'center', marginBottom: 20 },
  avatarBorder: { padding: 3, borderRadius: 65 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#eee' },
  tapToChange: { textAlign: 'center', marginTop: 6, color: '#777', fontSize: 13 },
  bubble: { marginTop: 20 },
  bubbleLabel: { fontWeight: '600', color: '#744d32', fontSize: 13, marginBottom: 6 },
  input: { backgroundColor: '#f5f5f5', padding: 14, borderRadius: 14, fontSize: 15 },
  button: {
    backgroundColor: '#744d32',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  error: { textAlign: 'center', color: 'red', marginTop: 100 },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
});