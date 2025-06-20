// app/(auth)/onboarding.jsx

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

// Use your Mac’s IP and the port (3000) your backend listens on:
const API_URL = "http://192.168.10.235:3000";

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
  const [error, setError]     = useState("");

  // update any field by key
  const handleChange = (key) => (val) => {
    setProfile((p) => ({ ...p, [key]: val }));
  };

  const onComplete = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profile,
          yearOfStudy: Number(profile.yearOfStudy),
          interests: profile.interests.split(",").map((s) => s.trim()),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      router.replace("/");
    } catch (e) {
      console.error("Onboarding error:", e);
      setError(e.message);
    }
  };

  // define your fields once
  const fields = [
    { key: "name",          label: "Full Name",                 placeholder: "e.g. Jane Doe",         keyboardType: "default" },
    { key: "yearOfStudy",   label: "Year of Study",             placeholder: "e.g. 3",               keyboardType: "numeric" },
    { key: "course",        label: "Course",                    placeholder: "e.g. Information Systems",keyboardType: "default" },
    { key: "interests",     label: "Interests (comma-separated)",placeholder: "tech, fashion, music", keyboardType: "default", multiline: true },
    { key: "bio",           label: "Short Bio",                 placeholder: "Tell us about yourself", keyboardType: "default", multiline: true },
    { key: "profilePicUrl", label: "Profile Pic URL",           placeholder: "https://...",           keyboardType: "default" },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Tell us about yourself</Text>

        {fields.map(({ key, label, placeholder, keyboardType, multiline }) => (
          <View key={key} style={{ marginBottom: 12, width: "100%" }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              keyboardType={keyboardType}
              multiline={!!multiline}
              numberOfLines={multiline ? 3 : 1}
              value={profile[key]}
              onChangeText={handleChange(key)}
            />
          </View>
        ))}

        <Text style={styles.label}>Role</Text>
        <View style={{ ...styles.input, padding: 0, borderColor: COLORS.border }}>
          <Picker
            selectedValue={profile.role}
            onValueChange={handleChange("role")}
          >
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Mentor" value="mentor" />
          </Picker>
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={onComplete}>
          <Text style={styles.buttonText}>Finish Setup</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}