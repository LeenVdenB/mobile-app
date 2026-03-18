import { StatusBar } from "expo-status-bar";
import ProductCard from "../components/ProductCard";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import { useState } from "react";
import BlogCard from "../components/BlogCard";

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Onze Producten</Text>
      <TextInput
        style={styles.search}
        placeholder="Zoek een product..."
        placeholderTextColor="#888"
      />
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Toon enkel promoties</Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>
      <ProductCard
        title={"Potjes"}
        description={"Een mooie set potjes voor je tuin"}
        price={"19.99"}
        image={require("../images/potjes.jpg")}
        onPress={() =>
          navigation.navigate("Details", {
            title: "Potjes",
            description: "Een mooie set potjes voor je tuin",
            price: "19.99",
            image: require("../images/potjes.jpg"),
          })
        }
      />
      <BlogCard
        title={"Tips en tricks om oude cd's te veranderen in leuke decoratie"}
        description={
          "Lees hier hoe je oude cd's kan hergebruiken in leuke decoratie voor in huis"
        }
        image={require("../images/cdimg.jpg")}
        onPress={() =>
          navigation.navigate("BlogDetails", {
            title:
              "Tips en tricks om oude cd's te veranderen in leuke decoratie",
            description:
              "Lees hier hoe je oude cd's kan hergebruiken in leuke decoratie voor in huis",
            image: require("../images/cdimg.jpg"),
          })
        }
      />
      <ProductCard
        title={"Brei kit"}
        description={"Een mooie brei kit voor al je breiwerk"}
        price={"29.99"}
        image={require("../images/breiimg.png")}
        onPress={() =>
          navigation.navigate("Details", {
            title: "Brei kit",
            description: "Een mooie brei kit voor al je breiwerk",
            price: "29.99",
            image: require("../images/breiimg.png"),
          })
        }
      />
      <BlogCard
        title={"Stap voor stap: Vlindertandenstokers voor jouw feestje"}
        description={
          "Lees hier hoe je zelf vlindertandenstokers kan maken voor jouw feestje"
        }
        image={require("../images/vlinderimg.webp")}
        onPress={() =>
          navigation.navigate("BlogDetails", {
            title: "Stap voor stap: Vlindertandenstokers voor jouw feestje",
            description:
              "Lees hier hoe je zelf vlindertandenstokers kan maken voor jouw feestje",
            image: require("../images/vlinderimg.webp"),
          })
        }
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  search: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 16,
  },
  toggleRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleLabel: {
    fontSize: 16,
  },
});

export default HomeScreen;
