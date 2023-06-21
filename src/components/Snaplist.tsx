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

const Snaplist = ({ navigation, route }) => {
  if (!SyncStorage.get("user")) {
    navigation.reset({
      index: 0,
      routes: [{ name: "Connexion" }],
    });
  } else {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
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

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item._id.toString()}
        />

        {selectedUser && (
            <View>
                <Text>Vous avez sélectionné {selectedUser.username}</Text>
                <Button
                    title="Afficher les snaps"
                    onPress={() =>
                        navigation.navigate("Snaps", {
                            selectedUser: selectedUser,
                        })
                    }
                />
            </View>
        )}
      </View>
    );
  }
};

export default Snaplist;