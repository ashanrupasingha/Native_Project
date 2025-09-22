import { register } from "@/services/authService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (isLoading) return;

    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please enter email and password.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await register(email, password);
      console.log("Registration Success:", res);

      Toast.show({
        type: "success",
        text1: "Registration Successful 🎉",
        text2: "You can now log in.",
      });

      router.replace("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      Toast.show({
        type: "error",
        text1: "Registration Failed ❌",
        text2: err?.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center p-6"
      >
        <View className="bg-white rounded-2xl p-6 shadow-lg">
          <Text className="text-3xl font-bold text-green-700 text-center mb-6">
            Register
          </Text>

          <TextInput
            placeholder="Email"
            className="bg-green-100 border border-green-300 rounded-lg px-4 py-3 mb-4 text-gray-900"
            placeholderTextColor="#6B7280"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            className="bg-green-100 border border-green-300 rounded-lg px-4 py-3 mb-4 text-gray-900"
            placeholderTextColor="#6B7280"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            className="bg-green-600 p-4 rounded-lg mt-2"
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="large" />
            ) : (
              <Text className="text-center text-xl font-semibold text-white">
                Register
              </Text>
            )}
          </TouchableOpacity>

          <Pressable onPress={() => router.replace("/login")} className="mt-6">
            <Text className="text-center text-green-700 text-lg font-medium">
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
