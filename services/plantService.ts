import { Plant } from "@/types/plant";
import { getAllPlace } from "./taskService";

//const API_URL = "http://your-backend.com/api/plants"; // change this
const API_URL = "http://10.0.2.2:8080/api/plants";


// Fetch all plants
export const getAllPlants = async (): Promise<Plant[]> => {
  try {
    const response = await getAllPlace();
    return response;
  } catch (error) {
    console.error("Error fetching plants:", error);
    return [];
  }
};

// Add new plant
export const addPlant = async (plant: Plant): Promise<void> => {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plant),
    });
  } catch (error) {
    console.error("Error adding plant:", error);
  }
};

// Update plant
export const updatePlant = async (id: string, plant: Plant): Promise<void> => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plant),
    });
  } catch (error) {
    console.error("Error updating plant:", error);
  }
};

// Delete plant
export const deletePlant = async (id: string): Promise<void> => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting plant:", error);
  }
};
