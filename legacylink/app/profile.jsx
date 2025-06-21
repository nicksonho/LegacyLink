import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

// Replace with your current local IP if needed
const API_URL = "http://192.168.10.235:3000";

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
  }, []);

  const handleUpdate = async () => {
    try {
      const token = await getToken();

      // Protect against NaN or blank values
      const safeData = {
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
        body: JSON.stringify(safeData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      setIsEditing(false);
      alert("✅ Profile updated!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 100 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: userData.profilePicUrl || "https://via.placeholder.com/150",
        }}
        style={styles.avatar}
      />

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
            value={
              userData.yearOfStudy === undefined || userData.yearOfStudy === null
                ? ""
                : String(userData.yearOfStudy)
            }
            onChangeText={(text) =>
              setUserData({
                ...userData,
                yearOfStudy: text === "" ? "" : text, // Keep as string for now
              })
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
          <Text style={styles.infoText}>
            📚 {userData.course} • Year {userData.yearOfStudy}
          </Text>
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
        <Text style={styles.buttonText}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fffaf5",
    minHeight: "100%",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 14,
    color: "gray",
    fontStyle: "italic",
    marginTop: 6,
    marginBottom: 16,
  },
  infoBox: {
    width: "100%",
    marginVertical: 20,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "500",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  chip: {
    backgroundColor: "#333",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    margin: 4,
  },
  chipText: {
    color: "white",
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
    marginTop: 20,
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