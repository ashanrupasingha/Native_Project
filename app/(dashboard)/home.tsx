import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { getAllPlace } from "@/services/taskService";
import { Task } from "@/types/task";

const { width: screenWidth } = Dimensions.get('window');

const Home = () => {
  return (
      <View className="flex-1 justify-center align-items-center">
        <Text className="text-4xl">Asan Jungle Fuckerrrr</Text>
      </View>
    )
}



  
export default Home;