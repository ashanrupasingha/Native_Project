import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Alert,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { addPlace, getAllPlace, deletePlace, updatePlace } from '@/services/taskService';
import { Task } from '@/types/task';

const { width: screenWidth } = Dimensions.get('window');

const Places = () => {
  return (
      <View className="flex-1 justify-center align-items-center">
        <Text className="text-4xl">Asan Jungle Fuckerrrr</Text>
      </View>
    )
  }

  

export default Places;