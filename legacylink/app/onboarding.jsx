import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
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

const API_URL = "http://YOUR_COMPUTER_IP:3001";

export default function OnboardingPage() {
  const { getToken } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [course, setCourse] = useState("");
  const [interests, setInterests] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const onCompleteOnboarding = async () => {
    try {
      // ─────── DEV PREVIEW ───────
      // Skip network call until backend is ready:
      router.replace("/");
      return;
      // ───────────────────────────

      // ────── WHEN READY ──────
      // const token = await getToken();
      // const res = await fetch(`${API_URL}/api/auth/signup`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     name,
      //     yearOfStudy: Number(yearOfStudy),
      //     course,
      //     interests: interests.split(",").map(s => s.trim()),
      //     bio,
      //     profilePicUrl,
      //     role,
      //   }),
      // });
      // if (!res.ok) {
      //   const err = await res.json();
      //   throw new Error(err.message || "Failed to save profile");
      // }
      // router.replace("/");
      // ─────────────────────────
    } catch (err) {
      console.error("Onboarding error:", err);
      setError(err.message || "Unknown error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Tell us about yourself</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Year of Study"
          keyboardType="numeric"
          value={yearOfStudy}
          onChangeText={setYearOfStudy}
        />
        <TextInput
          style={styles.input}
          placeholder="Course"
          value={course}
          onChangeText={setCourse}
        />
        <TextInput
          style={styles.input}
          placeholder="Interests (comma-separated)"
          value={interests}
          onChangeText={setInterests}
        />
        <TextInput
          style={styles.input}
          placeholder="Short Bio"
          multiline
          numberOfLines={3}
          value={bio}
          onChangeText={setBio}
        />
        <TextInput
          style={styles.input}
          placeholder="Profile Pic URL"
          value={profilePicUrl}
          onChangeText={setProfilePicUrl}
        />

        <View style={{ ...styles.input, padding: 0, borderColor: COLORS.border }}>
          <Picker selectedValue={role} onValueChange={setRole}>
            <Picker.Item label="Student" value="student" />
            <Picker.Item label="Mentor" value="mentor" />
          </Picker>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={onCompleteOnboarding}>
          <Text style={styles.buttonText}>Finish Setup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}