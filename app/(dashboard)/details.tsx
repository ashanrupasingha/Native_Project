// app/plant/details.tsx
import { getAllPlants } from "@/services/plantService";
import { Plant } from "@/types/plant";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PlantDetails = () => {
  const { id } = useLocalSearchParams();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {

    const fetchPlant = async () => {
      try {
        const allPlants = await getAllPlants();
        const foundPlant = allPlants.find((p) => p.id === id);
        setPlant(foundPlant || null);
      } catch (error) {
        console.error("Error fetching plant:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="green" />
        <Text className="text-gray-600 mt-2">Loading plant details...</Text>
      </View>
    );
  }

  if (!plant) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-700">Plant not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Plant Image with Back Button */}
        <View className="relative">
          <Image
            source={{
              uri: plant.imageUrl || "https://via.placeholder.com/150",
            }}
            className="w-full h-72"
            resizeMode="cover"
          />

          {/* Floating Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 bg-white rounded-full p-3 shadow-md"
          >
            <Ionicons name="arrow-back" size={24} color="green" />
          </TouchableOpacity>
        </View>

        {/* Plant Info Section */}
        <View className="p-6 bg-white rounded-t-3xl -mt-8 shadow-lg">
          {/* Plant Name */}
          <Text className="text-3xl font-extrabold text-gray-800">
            {plant.name}
          </Text>

          {/* Price */}
          <Text className="text-2xl text-green-600 font-semibold mt-2">
            {plant.price} LKR
          </Text>

          {/* Description */}
          <Text className="mt-4 text-gray-700 leading-6 text-base">
            {plant.description || "No description available for this plant."}
          </Text>

          {/* Divider */}
          <View className="my-6 border-t border-gray-200" />

          {/* Extra Info (optional future expansion) */}
          <View className="flex-row justify-between mb-6">
            <View className="items-center">
              <Ionicons name="leaf" size={28} color="green" />
              <Text className="text-gray-600 text-sm mt-1">Healthy</Text>
            </View>
            <View className="items-center">
              <Ionicons name="water" size={28} color="blue" />
              <Text className="text-gray-600 text-sm mt-1">Water</Text>
            </View>
            <View className="items-center">
              <Ionicons name="sunny" size={28} color="orange" />
              <Text className="text-gray-600 text-sm mt-1">Sunlight</Text>
            </View>
          </View>

          {/* Order Button */}
          <TouchableOpacity
            className="bg-green-600 py-4 rounded-2xl shadow-md active:bg-green-700"
            onPress={() => alert("Item Deleted!")}
          >
            <Text className="text-white text-center text-lg font-bold">
             Delete
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlantDetails;
