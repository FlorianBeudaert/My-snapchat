import React from "react";
import {
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import SyncStorage from "sync-storage";

const Inscription = ({ navigation }) => {
  if (SyncStorage.get("user")) {
    navigation.reset({
      index: 0,
      routes: [{ name: "Profile" }],
    });
  } else {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

    const handleRegister = async () => {
      console.log("Envoi des données...");

      try {
        const response = await axios.post(
          "https://mysnapchat.epidoc.eu/user",
          {
            email: email,
            username: username,
            profilePicture: "",
            password: password,
          }
        );
        console.log("Réponse du serveur :", response.data);

        if (response.status === 200) {
          console.log("Les données ont été envoyées avec succès !");
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

    const goToLogin = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Connexion" }],
      });
    };

    return (
      <View style={styles.container}>
        <Image source={require("../../assets/logo2.png")} style={styles.logo} />
        <Text style={styles.texttitle}>Inscription</Text>
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
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.textButton}>S'inscrire</Text>
        </Pressable>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.puchable}>Vous avez déjà un compte ?</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  puchable: {
    color: "black",
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20,
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
});

export default Inscription;
