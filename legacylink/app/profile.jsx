// 📁 profile.jsx
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { styles } from "@/assets/styles/profile.styles";
import { COLORS } from "@/constants/colors";

const API_URL = "http://192.168.10.235:3000"; // ✅ Update this to match your backend IP

export default function ProfilePage() {
  const { getToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("❌ Failed to fetch profile");

        const data = await res.json();
        if (isMounted) {
          setProfile(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("🚨 Profile fetch error:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    const timeout = setTimeout(() => {
      if (isMounted) setLoading(false);
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  const handleChange = (key) => (val) => {
    setProfile((prev) => ({ ...prev, [key]: val }));
  };

  const onSave = async () => {
    setSaving(true);
    const token = await getToken();
    await fetch(`${API_URL}/api/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    alert("✅ Profile updated!");
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (!profile) return <Text style={{ marginTop: 50, textAlign: 'center' }}>❌ Failed to load profile</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: profile?.profilePicUrl || "https://via.placeholder.com/150" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{profile.name || "Unnamed User"}</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={styles.input}
          value={profile.bio}
          onChangeText={handleChange("bio")}
          multiline
        />

        <Text style={styles.label}>Course</Text>
        <TextInput
          style={styles.input}
          value={profile.course}
          onChangeText={handleChange("course")}
        />

        <Text style={styles.label}>Year of Study</Text>
        <TextInput
          style={styles.input}
          value={String(profile.yearOfStudy || '')}
          onChangeText={handleChange("yearOfStudy")}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Interests</Text>
        <TextInput
          style={styles.input}
          value={(profile.interests || []).join(", ")}
          onChangeText={(val) => handleChange("interests")(val.split(",").map(s => s.trim()))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSave} disabled={saving}>
        <Text style={styles.buttonText}>{saving ? "Saving..." : "Save Changes"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}