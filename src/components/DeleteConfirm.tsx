import React from "react";
import { View, Pressable, Text, StyleSheet, Image, TextInput } from "react-native";
import SyncStorage from "sync-storage";
import axios from "axios";

const DeleteConfirm = ({ navigation }) => {
  if (SyncStorage.get("user")) {
    const user = SyncStorage.get("user");
    const handleDelete = async () => {
      console.log("Envoi des données...");
      try {
        const response = await axios.delete(
          "https://mysnapchat.epidoc.eu/user",
          {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Réponse du serveur :", response.data);

        if (response.status === 200) {
          console.log("Les données ont été envoyées avec succès !");
          SyncStorage.remove("user");
          navigation.reset({
            index: 0,
            routes: [{ name: "Connexion" }],
          });
        } else {
          console.log("Une erreur s'est produite lors de l'envoi des données.");
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la requête :", error);
      }
    };
    const goToSettings = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Settings" }],
      });
    };

    return (
      <View style={styles.container}>
        <Image source={require("../../assets/logo2.png")} style={styles.logo} />
        <Text style={styles.texttitle}>Paramètres</Text>
        <Text style={styles.texttitle}>
          Êtes-vous sûr de vouloir supprimer votre compte ?
        </Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={handleDelete} style={styles.yesbutton}>
            <Text style={styles.textButton}>Oui</Text>
          </Pressable>
          <Pressable onPress={goToSettings} style={styles.nobutton}>
            <Text style={styles.textButton}>Non</Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    navigation.reset({
      index: 0,
      routes: [{ name: "Connexion" }],
    });
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    width: 75,
    height: 75,
    alignSelf: "center",
    marginTop: 50,
  },
  texttitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  yesbutton: {
    backgroundColor: "green",
    width: "40%",
    height: 50,
    borderRadius: 50,
    marginVertical: 20,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  nobutton: {
    backgroundColor: "red",
    width: "40%",
    height: 50,
    borderRadius: 50,
    marginVertical: 20,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  textButton: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DeleteConfirm;
