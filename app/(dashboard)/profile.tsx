// app/profile/index.tsx
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // If no user is logged in, redirect to login
        router.replace("/login");
      }
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            const auth = getAuth();
            await signOut(auth); // Sign out the user from Firebase
            router.replace("/login"); // Redirect to login page
          } catch (error) {
            console.error("Logout Error:", error);
            Alert.alert("Logout Failed", "Something went wrong. Please try again.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center p-6">
        {/* Profile Avatar */}
        <View className="mt-8">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            className="w-32 h-32 rounded-full border-4 border-green-500"
          />
        </View>

        {/* User Info */}
        <View className="mt-6 items-center">
          <Text className="text-3xl font-bold text-gray-800">
            {user?.displayName || "User"}
          </Text>
          <Text className="text-lg text-gray-600 mt-2">{user?.email}</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 w-full py-4 rounded-xl mt-12 shadow-md"
          activeOpacity={0.8}
        >
         
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
