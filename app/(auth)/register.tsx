import { register } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
    <SafeAreaView className="flex-1 bg-gradient-to-b from-green-100 to-green-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <View className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* Title */}
          <Text className="text-3xl font-extrabold text-green-600 text-center">
            Create Account
          </Text>
          <Text className="text-center text-gray-500 text-base mb-8">
            Join FloraLink and start your journey 🌱
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
          <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 mb-6">
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

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
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
                  Register
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <Pressable onPress={() => router.replace("/login")} className="mt-6">
            <Text className="text-center text-gray-700 text-base">
              Already have an account?{" "}
              <Text className="font-semibold text-green-600 underline">
                Login
              </Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;
