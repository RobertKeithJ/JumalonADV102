import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FormContainers() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Form Authenticate</Text>
      {[
        { name: "Navigate to Login Screen", route: "/screens/exercise8/login" as any },
        { name: "Navigate to Register screen", route: "/screens/exercise8/register" as any },
      ].map((n, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => n.route && router.push(n.route)}
        >
          <Text style={styles.buttonText}>{n.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
