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
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { Picker } from "@react-native-picker/picker";

const categoryNames = {
  "": "Alle categorieën",
  "69b03cc82034142762e9cde4": "Klei kits",
  "69b03bdf44c4e17c86248aeb": "Brei en naai kits",
  "69b03b65963ab12242b0d037": "Verf kits",
  "69b03b324fce98cb8fcca8ef": "3D houtpuzzels",
  "699f17bd9605648963158865": "Stap voor stap",
  "699f176fde5f5b12980c2d96": "Tips",
  "699ef99058e25af58090912b": "DIY",
};

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  //products
  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/698c7fd44871d7541625e267/products",
      {
        headers: {
          authorization:
            "Bearer bffa2a7a053afd181167ea29424430b96e9f7fa7b956ea6db8ac7adb6a9e6420",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            description: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100,
            image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
            category:
              categoryNames[item.product.fieldData.category[0]] ||
              "Onbekende categorie",
          })),
        );
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  //blogs
  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/collections/699ef93f293793a9704700a7/items",
      {
        headers: {
          authorization:
            "Bearer bffa2a7a053afd181167ea29424430b96e9f7fa7b956ea6db8ac7adb6a9e6420",
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(
          data.items.map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            description: item.fieldData["post-summary"],
            content: item.fieldData["post-body"],
            image: { uri: item.fieldData["main-image"]?.url },
          })),
        );
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Onze Producten</Text>
      <TextInput
        style={styles.search}
        placeholder="Zoek een product..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Toon enkel promoties</Text>
        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
        />
      </View>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        style={styles.picker}
      >
        <Picker.Item label="Alle categorieën" value="" />
        <Picker.Item label="Klei kits" value="Klei kits" />
        <Picker.Item label="Brei en naai kits" value="Brei en naai kits" />
        <Picker.Item label="Verf kits" value="Verf kits" />
        <Picker.Item label="3D houtpuzzels" value="3D houtpuzzels" />
        <Picker.Item label="DIY" value="DIY" />
      </Picker>

      <Picker
        selectedValue={sortOption}
        onValueChange={setSortOption}
        style={styles.picker}
      >
        <Picker.Item label="Prijs: Laag naar hoog" value="price-asc" />
        <Picker.Item label="Prijs: Hoog naar laag" value="price-desc" />
        <Picker.Item label="Naam: A tot Z" value="name-asc" />
        <Picker.Item label="Naam: Z tot A" value="name-desc" />
      </Picker>

      <Text style={styles.title}>Onze Producten</Text>
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          onPress={() => navigation.navigate("Details", product)}
        />
      ))}

      <Text style={styles.title}>Onze Blogs</Text>
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          onPress={() => navigation.navigate("BlogDetails", blog)}
        />
      ))}

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
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});

export default HomeScreen;
