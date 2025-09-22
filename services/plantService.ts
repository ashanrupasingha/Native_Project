// services/plantService.ts
import { db } from "@/firebase";
import { Plant } from "@/types/plant";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const plantRef = collection(db, "plants");

// CREATE
export const addPlant = async (plant: Omit<Plant, "id">) => {
  await addDoc(plantRef, plant);
};

// READ
export const getAllPlants = async (): Promise<Plant[]> => {
  const snapshot = await getDocs(plantRef);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as Plant[];
};

// UPDATE
export const updatePlant = async (id: string, plant: Partial<Plant>) => {
  const docRef = doc(db, "plants", id);
  await updateDoc(docRef, plant);
};

// DELETE
export const deletePlant = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, "plants", id);
    await deleteDoc(docRef);
    return true; // deletion successful
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw new Error("Failed to delete plant");
  }
};