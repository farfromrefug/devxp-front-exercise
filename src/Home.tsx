import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const API_KEY = "1d868d05865a228a5fb2fc24c37d7b36";
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=fr-FR&region=FR`;

export const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    axios({ method: "get", url: API_URL }).then((json) => {
      (setMovies(json.data.results), console.log(json.data.results));
    });
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", fontSize: 20 }}>Recent movies</Text>

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 34,
  },
  item: {
    backgroundColor: "lightblue",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
});
