import { 
  View, Text, ScrollView, Image, StyleSheet, 
  ActivityIndicator, Dimensions 
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllPlants } from "@/services/plantService";
import { Plant } from "@/types/plant";

const { width: screenWidth } = Dimensions.get("window");

const Home = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const allPlants = await getAllPlants();
      setPlants(allPlants);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#22C55E" />
        <Text style={styles.loadingText}>Loading plants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌿 FloraLink</Text>
        <Text style={styles.subtitle}>Discover flowers & plants</Text>
      </View>

      {plants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🌱</Text>
          <Text style={styles.emptyTitle}>No plants added yet</Text>
          <Text style={styles.emptySubtitle}>
            Use the Add Plant page to create your first listing!
          </Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {plants.map((plant, index) => (
            <View 
              key={plant.id || index} 
              style={[styles.card, { marginTop: index === 0 ? 0 : 16 }]}
            >
              {plant.imageUrl && (
                <Image 
                  source={{ uri: plant.imageUrl }} 
                  style={styles.plantImage} 
                  resizeMode="cover" 
                />
              )}
              <View style={styles.textContent}>
                <Text style={styles.plantTitle}>{plant.name}</Text>
                <Text style={styles.plantDescription}>{plant.description}</Text>
                <Text style={styles.plantPrice}>💲 {plant.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0FDF4" },
  header: { padding: 20, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: "#D1FAE5" },
  title: { fontSize: 28, fontWeight: "800", textAlign: "center", color: "#065F46" },
  subtitle: { fontSize: 16, textAlign: "center", color: "#047857" },

  scrollView: { flex: 1 },
  scrollContent: { padding: 16 },

  card: { backgroundColor: "white", borderRadius: 12, padding: 12, elevation: 2 },
  plantImage: { width: "100%", height: 150, borderRadius: 12, marginBottom: 10 },
  textContent: { gap: 4 },
  plantTitle: { fontSize: 20, fontWeight: "700", color: "#065F46" },
  plantDescription: { fontSize: 14, color: "#4B5563" },
  plantPrice: { fontSize: 16, fontWeight: "600", color: "#059669" },

  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#065F46" },

  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyIcon: { fontSize: 50, marginBottom: 12 },
  emptyTitle: { fontSize: 22, fontWeight: "700", color: "#065F46" },
  emptySubtitle: { fontSize: 14, color: "#047857", textAlign: "center" },
});

export default Home;
