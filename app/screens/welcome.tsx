import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  const goBack = () => {
    router.push("/(tabs)/exercise");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>

      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Go Back to Exercise</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "red",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "red", // changed to red
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red", // match button color
  },
  buttonText: {
    color: "white", // changed to white
    fontSize: 18,
    fontWeight: "bold",
  },
});
