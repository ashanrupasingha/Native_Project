import { db } from "@/firebase";
import { Flower } from "@/types/Flower";
import {
collection,
addDoc,
getDocs,
updateDoc,
deleteDoc,
doc,
query,
orderBy
} from "firebase/firestore";

const flowersRef = collection(db, "flowers");

// Add a new flower
export const addFlower = async (flower: Omit<Flower, "id">): Promise<string> => {
try {
const docRef = await addDoc(flowersRef, {
...flower,
createdAt: new Date(),
updatedAt: new Date()
});
return docRef.id;
} catch (error) {
console.error("Error adding flower:", error);
throw error;
}
};

// Get all flowers
export const getAllFlowers = async (): Promise<Flower[]> => {
try {
const q = query(flowersRef, orderBy("createdAt", "desc"));
const snapshot = await getDocs(q);
return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Flower));
} catch (error) {
console.error("Error fetching flowers:", error);
throw error;
}
};

// Update a flower
export const updateFlower = async (id: string, flower: Partial<Flower>): Promise<void> => {
try {
const docRef = doc(db, "flowers", id);
await updateDoc(docRef, {
...flower,
updatedAt: new Date()
});
} catch (error) {
console.error("Error updating flower:", error);
throw error;
}
};

// Delete a flower
export const deleteFlower = async (id: string): Promise<void> => {
try {
const docRef = doc(db, "flowers", id);
await deleteDoc(docRef);
} catch (error) {
console.error("Error deleting flower:", error);
throw error;
}
};

// Get flowers by category
export const getFlowersByCategory = async (category: string): Promise<Flower[]> => {
try {
const q = query(flowersRef, orderBy("createdAt", "desc"));
const snapshot = await getDocs(q);
const allFlowers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Flower));
return allFlowers.filter(flower => flower.category === category);
} catch (error) {
console.error("Error fetching flowers by category:", error);
throw error;
}
};
[file content end]

[file name]: app/home.tsx
[file content begin]
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Flower } from "@/types/Flower";
import { getAllFlowers } from "@/services/flowerService";
import FooterNav from "@/components/FooterNav";
import { useLoader } from "@/context/LoaderContext";

const Home = () => {
const router = useRouter();
const { user } = useAuth();
const { showLoader, hideLoader } = useLoader();
const [flowers, setFlowers] = useState<Flower[]>([]);
const [refreshing, setRefreshing] = useState(false);

const loadFlowers = async () => {
try {
showLoader();
const flowerData = await getAllFlowers();
setFlowers(flowerData);
} catch (error) {
console.error("Error loading flowers:", error);
} finally {
hideLoader();
setRefreshing(false);
}
};

useEffect(() => {
loadFlowers();
}, []);

const onRefresh = () => {
setRefreshing(true);
loadFlowers();
};

return (
<View className="flex-1 bg-gray-50">
<ScrollView
className="flex-1 p-4"
refreshControl={
<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
>
<View className="mb-6">
<Text className="text-3xl font-bold text-green-800">Welcome to FloraLink</Text>
<Text className="text-lg text-gray-600">Hello, {user?.email}</Text>


</View>
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-green-700">Featured Plants</Text>
        <TouchableOpacity onPress={() => router.push("/addFlower")}>
          <Text className="text-blue-500 text-lg">Add New +</Text>
        </TouchableOpacity>
      </View>

      {flowers.length === 0 ? (
        <View className="bg-white p-6 rounded-lg shadow-sm items-center">
          <Text className="text-gray-500 text-lg mb-4">No flowers added yet</Text>
          <TouchableOpacity 
            className="bg-green-600 px-6 py-3 rounded-lg"
            onPress={() => router.push("/addFlower")}
          >
            <Text className="text-white text-lg">Add Your First Flower</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row flex-wrap justify-between">
          {flowers.map((flower) => (
            <TouchableOpacity 
              key={flower.id}
              className="bg-white w-[48%] mb-4 rounded-lg shadow-sm p-3"
              onPress={() => router.push(`/flowerDetails/${flower.id}`)}
            >
              {flower.imageUrl ? (
                <Image 
                  source={{ uri: flower.imageUrl }} 
                  className="w-full h-32 rounded-lg mb-2"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-32 bg-gray-200 rounded-lg mb-2 items-center justify-center">
                  <Text className="text-gray-500">No Image</Text>
                </View>
              )}
              <Text className="font-bold text-lg text-green-800" numberOfLines={1}>
                {flower.name}
              </Text>
              <Text className="text-green-600 font-semibold">
                ${flower.price}
              </Text>
              <Text className="text-gray-500 text-sm" numberOfLines={2}>
                {flower.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>

    <View className="mb-6">
      <Text className="text-2xl font-bold text-green-700 mb-4">Categories</Text>
      <View className="flex-row flex-wrap justify-between">
        {['Flowers', 'Plants', 'Packages'].map((category) => (
          <TouchableOpacity 
            key={category}
            className="bg-white w-[30%] p-4 rounded-lg shadow-sm items-center mb-3"
            onPress={() => router.push(`/category/${category.toLowerCase()}`)}
          >
            <Text className="text-green-700 font-semibold text-center">
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </ScrollView>
  <FooterNav />
</View>