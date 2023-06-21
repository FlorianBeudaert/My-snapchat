import React, { useState, useEffect } from 'react';
import { View, Button, Image, FlatList, TouchableOpacity, Text, TextInput, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Camera } from 'expo-camera';

const Stack = createNativeStackNavigator();

const Photo = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status === 'granted');
    })();
  }, []);

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const takeImageFromCamera = async () => {
    if (cameraPermission) {
      try {
        const { uri } = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
  
        setSelectedImage(uri);
      } catch (error) {
        console.log('Camera capture error:', error);
      }
    } else {
      alert('Permission to access camera is required!');
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Select Image from Gallery" onPress={pickImageFromGallery} />
      <Button title="Take Image from Camera" onPress={takeImageFromCamera} />

      {selectedImage && (
        <View>
          <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
        </View>
      )}

      <Button
        title="Go to User List"
        onPress={() => navigation.navigate('SnapUserList', { selectedImage })}
      />
    </View>
  );
};

export default Photo

