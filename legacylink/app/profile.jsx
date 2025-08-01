import Constants from 'expo-constants';
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const API_URL = Constants.expoConfig?.extra?.apiUrl;

export default function Profile() {
  const { getToken } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Starting profile fetch...");
      try {
        console.log("API_URL:", API_URL);
        const token = await getToken();
        console.log("Retrieved token:", token);

        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response status:", res.status);

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to load profile [${res.status}]: ${errText}`);
        }

        const data = await res.json();
        console.log("Fetched profile data:", data);
        setUserData(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        console.log("Image picked:", result.assets[0].uri);
        setUserData({ ...userData, profilePicUrl: result.assets[0].uri });
      }
    } catch (e) {
      console.error("Image picker error:", e);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await getToken();
      console.log("Updating with token:", token);
      console.log("Update payload (before cleanup):", userData);

      const parsedYear = parseInt(userData.yearOfStudy);
      const payload = {
        ...userData,
        yearOfStudy:
          userData.yearOfStudy === "" ||
          userData.yearOfStudy === null ||
          isNaN(parsedYear)
            ? undefined
            : parsedYear,
      };

      console.log("Final update payload:", payload);

      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Update response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update profile [${res.status}]: ${errorText}`);
      }

      setIsEditing(false);
      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: "Your changes were saved successfully.",
      });
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{error}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <LinearGradient colors={["#fffaf5", "#fbe0c3"]} style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color="#744d32" />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Your Profile</Text>

          <View style={styles.card}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.avatarContainer}>
              <Image
                source={{ uri: userData.profilePicUrl || "https://via.placeholder.com/150" }}
                style={styles.avatar}
              />
              <Text style={styles.tapToChange}>Tap to change</Text>
            </TouchableOpacity>

            {renderField("Name", "name", userData, setUserData, isEditing)}
            {renderField("Bio", "bio", userData, setUserData, isEditing)}
            {renderField("Course", "course", userData, setUserData, isEditing)}
            {renderField("Year of Study", "yearOfStudy", userData, setUserData, isEditing, true)}
            {renderField("Interests", "interests", userData, setUserData, isEditing, false, true)}

            <TouchableOpacity
              onPress={isEditing ? handleUpdate : () => setIsEditing(true)}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

function renderField(label, key, userData, setUserData, isEditing, isNumeric = false, isArray = false) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        editable={isEditing}
        placeholder={label}
        placeholderTextColor="#aaa"
        value={
          isArray
            ? userData[key]?.join(", ") || ""
            : userData[key] === undefined || userData[key] === null
            ? ""
            : String(userData[key])
        }
        onChangeText={(text) => {
          const updatedValue = isArray ? text.split(",").map((s) => s.trim()) : text;
          setUserData({ ...userData, [key]: updatedValue });
        }}
        keyboardType={isNumeric ? "numeric" : "default"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { paddingTop: 60, paddingHorizontal: 20, alignItems: "center" },
  header: { fontSize: 26, fontWeight: "700", color: "#744d32", marginBottom: 20 },
  card: { backgroundColor: "#ffffffee", borderRadius: 24, padding: 20, width: "100%", alignItems: "center", gap: 16 },
  avatarContainer: { alignItems: "center", marginBottom: 12 },
  avatar: { width: 140, height: 140, borderRadius: 70, borderWidth: 3, borderColor: "#744d32" },
  tapToChange: { color: "#744d32", fontSize: 14, marginTop: 6 },
  fieldContainer: { width: "100%" },
  fieldLabel: { fontSize: 14, fontWeight: "600", color: "#744d32", marginBottom: 6 },
  input: { backgroundColor: "#f4f4f4", padding: 12, borderRadius: 12, fontSize: 16, color: "#333" },
  button: { backgroundColor: "#744d32", padding: 16, borderRadius: 16, width: "100%", alignItems: "center", marginTop: 12 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fffaf5" },
  loadingText: { fontSize: 16, color: "#744d32" },
  backButton: { position: "absolute", top: 40, left: 20, zIndex: 10, backgroundColor: "#fff", padding: 8, borderRadius: 20, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 3 },
});