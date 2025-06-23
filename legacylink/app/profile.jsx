import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  // ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Constants from 'expo-constants';

const API_URL =
  Constants.expoConfig?.extra?.apiUrl ??
  Constants.manifest?.extra?.apiUrl;

export default function Profile() {
  const { getToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load profile");

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [getToken]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserData({ ...userData, profilePicUrl: result.assets[0].uri });
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await getToken();

      const safeData = {
              name: userData.name,
              bio: userData.bio,
              course: userData.course,
              interests: userData.interests,
              yearOfStudy:
                userData.yearOfStudy === "" ? undefined : parseInt(userData.yearOfStudy),
            };

            // Only send image if it's already a remote URL
            if (userData.profilePicUrl?.startsWith("http")) {
              safeData.profilePicUrl = userData.profilePicUrl;
            }

      const res = await fetch(`${API_URL}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(safeData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      setIsEditing(false);
      Toast.show({
        type: "success",
        text1: "Profile updated!",
        text2: "Your changes have been saved 🎉",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <LinearGradient colors={["#fffaf5", "#fbe0c3"]} style={styles.container}>
      <Text style={styles.header}>Welcome to <Text style={{ color: "#744d32" }}>LegacyLink</Text> ✨</Text>

      <View style={styles.card}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: userData.profilePicUrl || "https://via.placeholder.com/150" }}
            style={styles.avatar}
          />
          <Text style={styles.tapToChange}>📸 Tap to change</Text>
        </TouchableOpacity>

        {isEditing ? (
          <>
            <TextInput
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
              style={styles.input}
              placeholder="Name"
            />
            <TextInput
              value={userData.bio}
              onChangeText={(text) => setUserData({ ...userData, bio: text })}
              style={styles.input}
              placeholder="Bio"
            />
          </>
        ) : (
          <>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.bio}>{userData.bio}</Text>
          </>
        )}

        {isEditing ? (
          <>
            <TextInput
              value={userData.course}
              onChangeText={(text) => setUserData({ ...userData, course: text })}
              style={styles.input}
              placeholder="Course"
            />
            <TextInput
              value={userData.yearOfStudy === undefined || userData.yearOfStudy === null ? "" : String(userData.yearOfStudy)}
              onChangeText={(text) =>
                setUserData({ ...userData, yearOfStudy: text === "" ? "" : text })
              }
              style={styles.input}
              placeholder="Year of Study"
              keyboardType="numeric"
            />
            <TextInput
              value={userData.interests?.join(", ") || ""}
              onChangeText={(text) =>
                setUserData({
                  ...userData,
                  interests: text.split(",").map((i) => i.trim()),
                })
              }
              style={styles.input}
              placeholder="Interests (comma-separated)"
            />
          </>
        ) : (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>📚 {userData.course} • Year {userData.yearOfStudy}</Text>
            <View style={styles.chipContainer}>
              {userData.interests?.map((tag, i) => (
                <View key={i} style={styles.chip}>
                  <Text style={styles.chipText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={isEditing ? handleUpdate : () => setIsEditing(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isEditing ? "Save Changes" : "Edit Profile"}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#5e3c2b",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
  },
  tapToChange: {
    textAlign: "center",
    marginTop: 6,
    color: "#777",
    fontSize: 13,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
  },
  bio: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
    marginTop: 4,
    marginBottom: 16,
  },
  infoBox: {
    alignItems: "center",
    marginVertical: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chip: {
    backgroundColor: "#3a2e25",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    margin: 4,
  },
  chipText: {
    color: "#fff",
    fontSize: 12,
  },
  input: {
    width: "100%",
    padding: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#5e3c2b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 100,
  },
});
