import { addPlant, deletePlant, getAllPlants, updatePlant } from "@/services/plantService";
import { Plant } from "@/types/plant";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddPlant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // ✅ track editing

  // Fetch all plants
  const loadPlants = async () => {
    try {
      setLoading(true);
      const allPlants = await getAllPlants();
      setPlants(allPlants);
    } catch (error) {
      console.error("Error loading plants:", error);
      Alert.alert("Error", "Could not load plants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlants();
  }, []);

  // Save or Update
  const handleSavePlant = async () => {
    if (!name || !price || !imageUrl) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      if (editingId) {
        // ✅ Update
        await updatePlant(editingId, {
          name,
          description,
          price: parseFloat(price),
          imageUrl,
        });
        Alert.alert("Success", "Plant updated successfully!");
      } else {
        // ✅ Add
        await addPlant({
          name,
          description,
          price: parseFloat(price),
          imageUrl,
        });
        Alert.alert("Success", "Plant added successfully!");
      }

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setEditingId(null);
      loadPlants();
    } catch (error) {
      console.error("Error saving plant:", error);
      Alert.alert("Error", "Could not save plant. Try again.");
    }
  };

  // Edit Plant
  const handleEditPlant = (plant: Plant) => {
    setName(plant.name);
    setDescription(plant.description || "");
    setPrice(String(plant.price));
    setImageUrl(plant.imageUrl||'');
    setEditingId(plant.id||''); // ✅ set id to update
  };

  // Delete Plant
  const handleDeletePlant = async (id: string) => {
    try {
      await deletePlant(id);
      Alert.alert("Deleted", "Plant removed successfully!");
      loadPlants();
    } catch (error) {
      console.error("Error deleting plant:", error);
      Alert.alert("Error", "Failed to delete plant.");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="p-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text className="text-3xl font-extrabold text-green-700 text-center mb-6">
          🌱 {editingId ? "Update Plant" : "Add New Plant"}
        </Text>

        {/* Form */}
        <View className="bg-white rounded-2xl shadow-lg p-5 mb-8">
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              className="w-full h-48 rounded-xl mb-4"
              resizeMode="cover"
            />
          ) : (
            <View className="w-full h-48 rounded-xl mb-4 bg-gray-200 items-center justify-center">
              <Text className="text-gray-500">Plant image preview</Text>
            </View>
          )}

          {/* Name */}
          <Text className="text-gray-800 font-semibold mb-2">Plant Name *</Text>
          <TextInput
            placeholder="Enter plant name"
            value={name}
            onChangeText={setName}
            className="bg-gray-100 border border-gray-300 p-3 rounded-xl mb-4 text-gray-800"
          />

          {/* Description */}
          <Text className="text-gray-800 font-semibold mb-2">Description</Text>
          <TextInput
            placeholder="Enter plant description"
            value={description}
            onChangeText={setDescription}
            multiline
            className="bg-gray-100 border border-gray-300 p-3 rounded-xl mb-4 h-28 text-gray-800"
          />

          {/* Price */}
          <Text className="text-gray-800 font-semibold mb-2">Price (LKR) *</Text>
          <TextInput
            placeholder="Enter price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            className="bg-gray-100 border border-gray-300 p-3 rounded-xl mb-4 text-gray-800"
          />

          {/* Image URL */}
          <Text className="text-gray-800 font-semibold mb-2">Image URL *</Text>
          <TextInput
            placeholder="Paste plant image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
            className="bg-gray-100 border border-gray-300 p-3 rounded-xl mb-4 text-gray-800"
          />

          {/* Save/Update Button */}
          <TouchableOpacity
            onPress={handleSavePlant}
            className={`py-4 rounded-2xl shadow-md ${
              editingId ? "bg-blue-600" : "bg-green-600"
            }`}
          >
            <Text className="text-white text-center text-lg font-bold">
              {editingId ? "Update Plant" : "Save Plant"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Added Plants */}
        <Text className="text-2xl font-bold text-gray-800 mb-3">
          🌿 Added Plants
        </Text>

        {plants.length === 0 ? (
          <Text className="text-gray-500 text-center">No plants added yet.</Text>
        ) : (
          <FlatList
            data={plants}
            keyExtractor={(item) => item.id || ""}
            renderItem={({ item }) => (
              <View className="flex-row items-center bg-white rounded-xl shadow-md p-4 mb-3">
                {/* Image */}
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-16 h-16 rounded-lg mr-4"
                  resizeMode="cover"
                />

                {/* Info */}
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {item.price} LKR
                  </Text>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                  onPress={() => handleEditPlant(item)}
                  className="bg-blue-500 p-2 rounded-full mr-2"
                >
                  <Ionicons name="create" size={20} color="white" />
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  onPress={() => handleDeletePlant(item.id || "")}
                  className="bg-red-500 p-2 rounded-full"
                >
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPlant;
