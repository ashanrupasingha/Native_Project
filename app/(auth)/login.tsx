import { login } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
    <SafeAreaView className="flex-1 bg-gradient-to-b from-green-100 to-green-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <View className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* App Title */}
          <Text className="text-4xl font-extrabold text-green-600 text-center">
            FloraLink
          </Text>
          <Text className="text-center text-gray-500 text-base mb-8">
            Welcome back! Sign in to continue
          </Text>

          {/* Email Input */}
          <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 mb-4">
            <Ionicons name="mail-outline" size={22} color="#6B7280" />
            <TextInput
              placeholder="Email"
              className="flex-1 ml-3 text-gray-900"
              placeholderTextColor="#9CA3AF"
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 mb-2">
            <Ionicons name="lock-closed-outline" size={22} color="#6B7280" />
            <TextInput
              placeholder="Password"
              className="flex-1 ml-3 text-gray-900"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Forgot Password */}
          <Pressable onPress={() => Alert.alert("Coming Soon!")}>
            <Text className="text-right text-sm text-green-600 mb-6">
              Forgot Password?
            </Text>
          </Pressable>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.85}
            className="rounded-2xl overflow-hidden shadow-md"
          >
            <LinearGradient
              colors={["#16A34A", "#22C55E"]}
              className="p-4 rounded-2xl"
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="large" />
              ) : (
                <Text className="text-center text-xl font-bold text-white">
                  Login
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Register Link */}
          <Pressable onPress={() => router.push("/register")} className="mt-6">
            <Text className="text-center text-gray-700 text-base">
              Don’t have an account?{" "}
              <Text className="font-semibold text-green-600 underline">
                Register
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
