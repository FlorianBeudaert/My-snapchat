import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import SyncStorage from "sync-storage";

const Profile = ({ navigation }) => {
  if (SyncStorage.get("user")) {
    const goToSettings = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Settings" }],
      });
    };
    const goToSnap = () => {
      navigation.navigate("Snap");
    };
    const gotoSnapList = () => {
      navigation.navigate("Snaplist");
    };
    const Disconnect = () => {
      SyncStorage.remove("user");
      navigation.reset({
        index: 0,
        routes: [{ name: "Connexion" }],
      });
    };
    const user = SyncStorage.get("user");
    return (
      <View style={styles.container}>
        <Pressable onPress={goToSettings} style={styles.settingsbutton}>
            <Image source={require("../../assets/settings.png")} style={styles.imagesettings} />
        </Pressable>
        <Image source={require("../../assets/logo2.png")} style={styles.logo} />
        <Text style={styles.texttitle}>Bienvenue sur l'application</Text>
        <Text style={styles.nametext}>Bonjour {user.data.username}</Text>
        <Pressable onPress={goToSnap}>
          <Text style={styles.button}>Envoyer un snap</Text>
        </Pressable>
        <Pressable onPress={gotoSnapList}>
          <Text style={styles.button}>Voir mes snaps</Text>
        </Pressable>
        <View style={styles.buttonGroup}>
          <Pressable onPress={Disconnect} style={styles.logoutbutton}>
            <Text style={styles.textbutton}>Se déconnecter</Text>
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
  buttonGroup: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textbutton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    textTransform: "uppercase",
    padding: 30,
  },
  logoutbutton: {
    backgroundColor: "#FC4B71",
    width: "100%",
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
  nametext: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
  },
  settingsbutton: {
    width: 50,
    height: 50,
    margin: 10,
    alignSelf: "flex-end",
  },
  imagesettings: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  button : {
    backgroundColor: "#1E90FF",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    textTransform: "uppercase",
    padding: 30,
    margin: 10,
  }
});

export default Profile;
