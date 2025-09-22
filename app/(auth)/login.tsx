import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { login } from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (isLoading) return;

    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      console.log("Login Success:", res);
      router.push("/home");
    } catch (err) {
      console.error(err);
      Alert.alert("Login failed", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-green-50 to-green-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <View className="bg-white rounded-2xl p-8 shadow-xl">
          <Text className="text-4xl font-extrabold text-green-600 text-center mb-8">
            FloraLink
          </Text>

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-4 mb-4 text-gray-900 focus:border-green-500"
            placeholderTextColor="#9CA3AF"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          {/* Password Input */}
          <TextInput
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 rounded-xl px-4 py-4 mb-6 text-gray-900 focus:border-green-500"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.85}
            className="rounded-xl overflow-hidden"
          >
            <LinearGradient
              colors={["#22C55E", "#16A34A"]} // green shades
              className="p-4 rounded-xl"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <Text className="text-center text-xl font-semibold text-white">
                  Login
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Register Link */}
          <Pressable onPress={() => router.push("/register")} className="mt-6">
            <Text className="text-center text-green-600 text-lg">
              Don’t have an account?{" "}
              <Text className="font-semibold underline">Register</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
