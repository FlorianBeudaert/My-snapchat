import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import axios from "axios";
import SyncStorage from "sync-storage";

const UserListScreen = ({ navigation, route }) => {
  if (!SyncStorage.get("user")) {
    navigation.reset({
      index: 0,
      routes: [{ name: "Connexion" }],
    });
  } else {
    const { selectedImage } = route.params;
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [duration, setDuration] = useState("");
    const user = SyncStorage.get("user");

    useEffect(() => {
      axios
        .get(
          "https://mysnapchat.epidoc.eu/user",
          {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setUsers(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }, []);

    const renderUserItem = ({ item }) => (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => setSelectedUser(item)}
      >
        <Text>{item.username}</Text>
      </TouchableOpacity>
    );

    const sendImage = () => {
      const readuri = new 
      console.log("To (id):", selectedUser._id);
      console.log("image : ", selectedImage);
      console.log("duration : ", duration);
      axios
        .post(
          "https://mysnapchat.epidoc.eu/snap",
          {
            to: selectedUser._id,
            image: selectedImage,
            duration: duration,
          },
          {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          navigation.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          });
        })
        .catch((error) => {
          console.error("Error sending image:", error);
        });
    };

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id.toString()}
        />

        {selectedUser && (
          <View>
            <Text>Send Image to: {selectedUser.username}</Text>
            <TextInput
              placeholder="Duration"
              value={duration}
              onChangeText={setDuration}
              style={{ borderWidth: 1, padding: 10, marginTop: 10 }}
            />
            <Button title="Send Image" onPress={sendImage} />
          </View>
        )}
      </View>
    );
  }
};

export default UserListScreen;