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
  KeyboardAvoidingView,
  Platform,
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
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
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
          keyboardShouldPersistTaps="handled"
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
    </KeyboardAvoidingView>
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