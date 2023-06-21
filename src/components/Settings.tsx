import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import SyncStorage from "sync-storage";
import axios from "axios";

const Settings = ({ navigation }) => {
  if (SyncStorage.get("user")) {
    const goToProfile = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Profile" }],
      });
    };
    const user = SyncStorage.get("user");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");
    const handleEdit = async () => {
      console.log("Envoi des données...");
      try {
        const response = await axios.patch(
          "https://mysnapchat.epidoc.eu/user",
          {
            email: email,
            username: username,
            profilePicture: "",
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${user.data.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log("Réponse du serveur :", response.data);
        
        if (response.status === 200) {
          console.log("Les données ont été envoyées avec succès !");
          const updatedUser = {
            _id: user.data._id,
            email: email,
            profilePicture: "",
            token: user.data.token,
            username: username,
          };
          SyncStorage.set("user", { data: updatedUser });
          navigation.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          });
        } else {
          console.log("Une erreur s'est produite lors de l'envoi des données.");
        }
      } catch (error) {
          console.error("Une erreur s'est produite lors de la requête :", error);
        }
    };

    const goToDelete = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Delete" }],
      });
    };

    return (
      <View style={styles.container}>
        <Pressable onPress={goToProfile}>
          <Image
            source={require("../../assets/back.png")}
            style={styles.back}
          />
        </Pressable>
        <Image source={require("../../assets/logo2.png")} style={styles.logo} />
        <Text style={styles.texttitle}>Paramètres</Text>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.text}>Nom d'utilisateur</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.text}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable style={styles.button} onPress={handleEdit}>
          <Text style={styles.textButton}>Enregistrer</Text>
        </Pressable>
        <Pressable style={styles.deletebutton} onPress={goToDelete}>
          <Text style={styles.textButton}>Supprimer mon compte</Text>
        </Pressable>

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
  input: {
    backgroundColor: "#F7F7F7",
    width: "80%",
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    display: "flex",
    alignSelf: "center",
    paddingLeft: 20,
  },
  text: {
    paddingLeft: 43,
  },
  button: {
    backgroundColor: "#FFFC00",
    width: "50%",
    height: 50,
    borderRadius: 50,
    marginVertical: 10,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  back: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 20,
  },
  deletebutton: {
    backgroundColor: "#FF3936",
    width: "50%",
    height: 50,
    borderRadius: 50,
    marginVertical: 10,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default Settings;
