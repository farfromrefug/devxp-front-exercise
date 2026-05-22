import { memo, useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MovieTitle } from "./MovieTitle";
import { fetchNowPlaying, fetchSearch, type Movie } from "./tmdb";
import { useDebounce } from "./useDebounce";
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import useAsyncStorage from "./useAsyncStorage";

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

  const [debouncedQuery, setDebouncedQuery] = useDebounce(query, 1000);
  const [lastQueries, setLastQueries] = useAsyncStorage<string[]>("lastQueries", []);

  const displayedMovies = searchResults ?? nowPlaying

  useEffect(() => {
    fetchNowPlaying().then(setNowPlaying);
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults(null);
      return;
    }
    // dedup by first removing if existing then pushing
    const set = new Set([...lastQueries])
    set.delete(debouncedQuery);
    const newLastQueries = [...set, debouncedQuery].slice(-5)
    setLastQueries(newLastQueries);
    fetchSearch(debouncedQuery).then(setSearchResults);
  }, [debouncedQuery]);


  const clearQuery = useCallback(() => {
    if (query.length) {
      setQuery("");
      setSearchResults(null);
    }
  }, [query]);

  const handleMoviePress = useCallback((id: number) => {
    console.log("Movie pressed:", id);
  }, []);

  const setQueryFromRecent = useCallback((historyQuery: string) => {
    setDebouncedQuery(historyQuery);
    setQuery(historyQuery);
  }, []);

  return (
    <SafeAreaInsetsContext.Consumer>
      {insets =>  <View style={{ ...styles.container, paddingTop: insets?.top ?? 0 }}>
        <Text style={styles.header}>Recent movies</Text>

        <SearchBar query={query} onChangeText={setQuery} onClear={clearQuery}/>
        <RecentSearch lastQueries={lastQueries} setQueryFromRecent={setQueryFromRecent} />

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

type RecentSearchProps = {
  lastQueries: string[],
  setQueryFromRecent: (query: string) => void
}
type RecentChipProps = {
  query: string,
  onChipPress: (query: string) => void
}

const RecentChip = memo(({ query, onChipPress }: RecentChipProps)=>{
    return (
      <Pressable
          onPress={() => onChipPress(query)}
          style={styles.chip}
        >
          <Text style={styles.chipText}>
            {query}
          </Text>
        </Pressable>
    );
  })
const RecentSearch = ({lastQueries, setQueryFromRecent}: RecentSearchProps) => {

  return (<ScrollView contentContainerStyle={styles.searchRecent}>
    {lastQueries.map((query) => {
      return (
        <RecentChip
          key={query}
          query={query}
          onChipPress={setQueryFromRecent}
        />
      );
    })}
  </ScrollView>)
}

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
  searchRecent: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingVertical: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingBottom: 16,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#fafafa",
    borderWidth: 1.5,
    borderColor: "#d4d4d4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  chipText: {
    color: "#1a1a1a",
    fontSize: 13,
    fontWeight: "600",
  },
});
