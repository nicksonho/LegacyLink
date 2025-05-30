import { styles } from "@/assets/styles/auth.styles";
import { COLORS } from "@/constants/colors";
import { useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0); // 0 (weak) to 4 (strong)
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false); 

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Client-side validation
    if (!isPasswordLongEnough) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (passwordStrength <= 2) {
      setError("Please choose a stronger password");
      return;
    }

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("email address already in use");
      } else {
        setError("An error occured");
      }
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>
          Verify your email
        </Text>

        {/*error catcher*/}
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
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
       </View>
    )
  }


  return (
    <KeyboardAwareScrollView
      style={{ flex: 1}}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
        <View style={styles.container}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require("@/assets/images/student-mentor-connect.png")} style={styles.illustration}/>
          </View>
          <Text style={styles.title}>Create Account</Text>

          {/*error catcher*/}
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
            value={emailAddress}
            placeholderTextColor="#9A8478"
            placeholder="Enter email"
            onChangeText={(emailAddress)=> setEmailAddress(emailAddress)}
          />
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#9A8478"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
              // Check length requirement
              const meetsLength = text.length >= 8;
              setIsPasswordLongEnough(meetsLength);
              
              // Check strength if long enough
              if (meetsLength) {
                const result = require('zxcvbn')(text);
                setPasswordStrength(result.score);
              } else {
                setPasswordStrength(0);
              }
            }}
          />

          {/* Password requirements feedback */}
          <View style={{ marginTop: 8, marginBottom: 12 }}>
            {/* Length requirement */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons 
                name={isPasswordLongEnough ? "checkmark-circle" : "close-circle"} 
                size={16} 
                color={isPasswordLongEnough ? COLORS.income : COLORS.expense} 
              />
              <Text style={{ marginLeft: 4, color: COLORS.textLight }}>
                Minimum 8 characters
              </Text>
            </View>
            
            {/* Strength meter */}
            {isPasswordLongEnough && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Ionicons 
                  name={passwordStrength > 2 ? "checkmark-circle" : "close-circle"} 
                  size={16} 
                  color={passwordStrength > 2 ? COLORS.income : COLORS.expense} 
                />
                <Text style={{ marginLeft: 4, color: COLORS.textLight }}>
                  Strength:{" "}
                  <Text style={{ 
                    color: passwordStrength > 2 ? COLORS.income : COLORS.expense 
                  }}>
                    {passwordStrength <= 2 ? "Weak" : "Strong"}
                  </Text>
                </Text>
              </View>
            )}
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
  );
}