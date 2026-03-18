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

const HomeScreen = () => {
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
      <ProductCard />
      <ProductCard />
      <ProductCard />
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
