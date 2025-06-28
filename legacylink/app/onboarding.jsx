import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { styles } from "@/assets/styles/auth.styles";
import { COLORS } from "@/constants/colors";
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

const initialProfile = {
  name: "",
  yearOfStudy: "",
  course: "",
  interests: "",
  bio: "",
  profilePicUrl: "",
  role: "student",
};

export default function OnboardingPage() {
  const { getToken } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState(initialProfile);
  const [error, setError] = useState("");

  const handleChange = (key) => (val) => {
    setProfile((p) => ({ ...p, [key]: val }));
  };

  const onComplete = async () => {
    try {
      const token = await getToken();
      console.log("📤 Sending profile:", profile);

      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profile,
          yearOfStudy: profile.role === 'student' ? Number(profile.yearOfStudy) : undefined,
          interests: profile.interests.split(",").map((s) => s.trim()),
        }),
      });

      if (!res.ok) {
        let errMsg = "Unexpected error.";
        try {
          const err = await res.json();
          errMsg = err.message || errMsg;
        } catch (_e) {
          const text = await res.text();
          console.error("🧨 Non-JSON server response:", text);
          errMsg = text;
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      console.log("✅ Backend responded with:", data);
      router.replace("/home");
    } catch (e) {
      console.error("Onboarding error:", e);
      setError(e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Tell us about yourself</Text>

        {/* Role Picker */}
        <Text style={styles.label}>Role</Text>
        <View style={{ ...styles.input, padding: 0, borderColor: COLORS.border, marginBottom: 12 }}>
          <Picker
            selectedValue={profile.role}
            onValueChange={handleChange("role")}
          >
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Mentor" value="mentor" />
          </Picker>
        </View>

        {/* Shared Fields */}
        <View style={{ marginBottom: 12, width: "100%" }}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Jane Doe"
            value={profile.name}
            onChangeText={handleChange("name")}
          />
        </View>

        {profile.role === "student" && (
          <>
            <View style={{ marginBottom: 12, width: "100%" }}>
              <Text style={styles.label}>Year of Study</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 2"
                keyboardType="numeric"
                value={profile.yearOfStudy}
                onChangeText={handleChange("yearOfStudy")}
              />
            </View>

            <View style={{ marginBottom: 12, width: "100%" }}>
              <Text style={styles.label}>Course</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Information Systems"
                value={profile.course}
                onChangeText={handleChange("course")}
              />
            </View>
          </>
        )}

        {profile.role === "mentor" && (
          <View style={{ marginBottom: 12, width: "100%" }}>
            <Text style={styles.label}>Area of Expertise</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Data Science, Entrepreneurship"
              value={profile.course}
              onChangeText={handleChange("course")}
            />
          </View>
        )}

        <View style={{ marginBottom: 12, width: "100%" }}>
          <Text style={styles.label}>Interests (comma-separated)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. tech, music, design"
            value={profile.interests}
            onChangeText={handleChange("interests")}
          />
        </View>

        <View style={{ marginBottom: 12, width: "100%" }}>
          <Text style={styles.label}>Short Bio</Text>
          <TextInput
            style={styles.input}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={3}
            value={profile.bio}
            onChangeText={handleChange("bio")}
          />
        </View>

        <View style={{ marginBottom: 20, width: "100%" }}>
          <Text style={styles.label}>Profile Pic URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://..."
            value={profile.profilePicUrl}
            onChangeText={handleChange("profilePicUrl")}
          />
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>Finish Setup</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}