import { getAllPlants } from "@/services/plantService";
import { Plant } from "@/types/plant";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const Home = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  // Mock categories - you might want to fetch these from your API
  const categories = [
    { id: "all", name: "All", icon: "🌿" },
    { id: "indoor", name: "Indoor", icon: "🏠" },
    { id: "outdoor", name: "Outdoor", icon: "🌞" },
    { id: "succulents", name: "Succulents", icon: "🌵" },
    { id: "flowers", name: "Flowers", icon: "🌸" },
    { id: "herbs", name: "Herbs", icon: "🌱" },
  ];

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    filterPlants();
  }, [plants, searchQuery, selectedCategory]);

  const fetchPlants = async () => {
    try {
      const data = await getAllPlants();
      setPlants(data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchPlants();
  };

  const filterPlants = () => {
    let filtered = plants;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((plant) =>
        plant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category (this is a mock filter - adjust based on your data structure)
    if (selectedCategory !== "all") {
      filtered = filtered.filter((plant) => {
        // This assumes your plant data has a category field
        // Adjust based on your actual data structure
        return plant.category === selectedCategory;
      });
    }

    setFilteredPlants(filtered);
  };

  const handleNavigateToDetails = (plantId: string) => {
    router.push(`(dashboard)/details?id=${plantId}`);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <View className="items-center">
          <View className="w-24 h-24 rounded-full bg-emerald-50 justify-center items-center mb-6">
            <Ionicons name="leaf" size={40} color="#10b981" />
          </View>
          <ActivityIndicator size="large" color="#10b981" />
          <Text className="mt-4 text-lg text-gray-600">Loading plants...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 pt-3 pb-2 bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-3xl font-bold text-emerald-900">FloraLink</Text>
            <Text className="text-gray-500">Find your perfect plant</Text>
          </View>
          <TouchableOpacity 
            className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center"
            onPress={() => console.log("Profile")}
          >
            <Ionicons name="person-outline" size={20} color="#047857" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-4">
          <Ionicons name="search" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-gray-700"
            placeholder="Search plants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          )}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                selectedCategory === category.id
                  ? "bg-emerald-500"
                  : "bg-emerald-50"
              }`}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text
                className={`mr-1 ${
                  selectedCategory === category.id ? "text-white" : "text-emerald-800"
                }`}
              >
                {category.icon}
              </Text>
              <Text
                className={
                  selectedCategory === category.id
                    ? "text-white font-medium"
                    : "text-emerald-800"
                }
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Plant Grid */}
      {filteredPlants.length > 0 ? (
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => item.id!}
          className="px-4"
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-white rounded-2xl shadow-sm mb-4 w-[48%] p-3 border border-gray-100"
              onPress={() => handleNavigateToDetails(item.id!)}
              activeOpacity={0.8}
            >
              <View className="relative">
                <Image
                  source={{
                    uri: item.imageUrl || "https://via.placeholder.com/150",
                  }}
                  className="w-full h-40 rounded-xl"
                  resizeMode="cover"
                />
                <View className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 items-center justify-center shadow">
                  <Ionicons name="heart-outline" size={16} color="#374151" />
                </View>
              </View>
              
              <View className="mt-3">
                <Text className="text-lg font-semibold text-gray-900" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-gray-500 text-sm mt-1" numberOfLines={1}>
                  {item.description || "Ornamental Plant"}
                </Text>
                
                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-emerald-700 font-bold text-lg">
                    {item.price} LKR
                  </Text>
                  <TouchableOpacity className="bg-emerald-100 p-2 rounded-full">
                    <Ionicons name="add" size={16} color="#047857" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center px-10">
          <Ionicons name="search-outline" size={60} color="#d1d5db" />
          <Text className="text-xl font-medium text-gray-400 mt-4 text-center">
            No plants found
          </Text>
          <Text className="text-gray-400 text-center mt-2">
            Try adjusting your search or filter to find what you're looking for.
          </Text>
          <TouchableOpacity 
            className="bg-emerald-500 rounded-full px-6 py-3 mt-6"
            onPress={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            <Text className="text-white font-medium">Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;