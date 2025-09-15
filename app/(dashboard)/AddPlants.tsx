import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import { addPlant } from "@/services/plantService";
import { Plant } from "@/types/plant";
import { addPlace } from "@/services/taskService";

const AddPlant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddPlant = async () => {
    if (!name || !description || !price) {
      Alert.alert("Error", "Please fill all required fields!");
      return;
    }

    const newPlant: Plant = {
      name,
      description,
      price: parseFloat(price),
      imageUrl,
    };

    try {
      await addPlace(newPlant);
      Alert.alert("Success", "Plant added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      Alert.alert("Error", "Failed to add plant.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>➕ Add New Plant</Text>

      <TextInput
        style={styles.input}
        placeholder="Plant Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddPlant}>
        <Text style={styles.buttonText}>Save Plant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#F0FDF4" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 20, textAlign: "center", color: "#065F46" },
  input: { backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: "#D1FAE5" },
  button: { backgroundColor: "#059669", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
});

export default AddPlant;
