import React, { useEffect } from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import SyncStorage from "sync-storage";

const Home = ({ navigation }) => {
  useEffect(() => {
    const checkUser = SyncStorage.get("user");

    if (checkUser) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Profile" }],
      });
    }
  }, []);

  const goToLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Connexion" }],
    });
  };

  const goToRegister = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Inscription" }],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.buttonGroup}>
        <Pressable style={styles.loginbutton} onPress={goToLogin}>
          <Text style={styles.textbutton}>Se connecter</Text>
        </Pressable>
        <Pressable style={styles.registerbutton} onPress={goToRegister}>
          <Text style={styles.textbutton}>S'inscrire</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFA00",
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
  loginbutton: {
    backgroundColor: "#FC4B71",
    width: "100%",
  },
  registerbutton: {
    backgroundColor: "#08DFFE",
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginVertical: 150,
  },
});

export default Home;