import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import RenderHTML from "react-native-render-html";

const BlogDetail = ({ route }) => {
  const { title, content, image } = route.params;
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Image source={image} style={styles.image} />
      <View style={styles.divider} />
      <RenderHTML
        contentWidth={width}
        source={{ html: content }}
        tagsStyles={htmlStyles}
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
});

const htmlStyles = {
  p: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 12,
  },

  h1: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
  },

  h2: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },

  strong: {
    fontWeight: "bold",
  },
};

export default BlogDetail;
