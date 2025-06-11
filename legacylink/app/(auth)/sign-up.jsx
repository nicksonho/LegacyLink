import { styles } from "@/assets/styles/auth.styles"
import { COLORS } from "@/constants/colors"
import { useSignUp } from "@clerk/clerk-expo"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false)

  // Start sign-up (email + password)
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // basic client-side checks
    if (!isPasswordLongEnough) {
      setError("Password must be at least 8 characters")
      return
    }
    if (passwordStrength <= 2) {
      setError("Please choose a stronger password")
      return
    }

    try {
      await signUp.create({ emailAddress, password })
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setPendingVerification(true)
    } catch (err) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("Email address already in use")
      } else {
        setError("An error occurred")
      }
    }
  }

  // Verify OTP code
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId })

        // ←─── THIS LINE CHANGED ───→
        router.replace("/onboarding")
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  //  Render the OTP step or the email/password form
  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}
        <TextInput
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9A8478"
          onChangeText={setCode}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image source={require("@/assets/images/student-mentor-connect.png")} style={styles.illustration}/>
        </View>
        <Text style={styles.title}>Create Account</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text)
            const meetsLength = text.length >= 8
            setIsPasswordLongEnough(meetsLength)
            if (meetsLength) {
              const result = require("zxcvbn")(text)
              setPasswordStrength(result.score)
            } else {
              setPasswordStrength(0)
            }
          }}
        />

        <View style={{ marginTop: 8, marginBottom: 12 }}>
          {/* length + strength UI omitted for brevity */}
        </View>

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}