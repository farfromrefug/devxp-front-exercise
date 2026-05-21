import { memo, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MovieTitle } from "./MovieTitle";
import { fetchNowPlaying, fetchSearch, type Movie } from "./tmdb";
import { useDebounce } from "./useDebounce";
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';


const SearchBar = ({query, onChangeText, onClear}: {query:string; onChangeText: (text: string) => void; onClear: ()=>void}) => (
  <View style={styles.searchBar}>
    <TextInput
      style={styles.input}
      placeholder="Search movies…"
      placeholderTextColor="#888"
      value={query}
      onChangeText={onChangeText}
      autoCorrect={false}
      autoCapitalize="none"
    />
    <Pressable
      onPress={()=>onClear()}
      style={styles.clearButton}
      hitSlop={8}
    >
      <Text style={styles.clearText}>×</Text>
    </Pressable>
  </View>
);
export const Home = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 1000);

  const displayedMovies = searchResults ?? nowPlaying

  useEffect(() => {
    fetchNowPlaying().then(setNowPlaying);
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults(null);
      return;
    }
    fetchSearch(debouncedQuery).then(setSearchResults);
  }, [debouncedQuery]);


  const clearQuery = () => {
    if (query.length) {
      setQuery("");
      setSearchResults(null);
    }
  }

  const handleMoviePress = (id: number) => {
    console.log("Movie pressed:", id);
  };

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets =>  <View style={{ ...styles.container, paddingTop: insets?.top ?? 0 }}>
        <Text style={styles.header}>Recent movies</Text>

        <SearchBar query={query} onChangeText={setQuery} onClear={clearQuery}/>

        <FlatList
          data={displayedMovies}
          renderItem={({ item }) => (
            <MovieRow movie={item} onPress={(id) => handleMoviePress(id)} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      }
    </SafeAreaInsetsContext.Consumer>
    
  );
};

type MovieRowProps = {
  movie: Movie;
  onPress: (id: number) => void;
};

const MovieRow = ({ movie, onPress }: MovieRowProps) => (
  <Pressable onPress={() => onPress(movie.id)} style={styles.item}>
    <MovieTitle title={movie.title} />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: "center",
    fontSize: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  clearButton: {
    paddingHorizontal: 8,
  },
  clearText: {
    fontSize: 22,
    color: "#888",
  },
  item: {
    backgroundColor: "lightblue",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    // flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
  poster: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});
