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
    <View style={styles.container}>
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
  );
};

type MovieRowProps = {
  movie: Movie;
  onPress: (id: number) => void;
};

const MovieRow = ({ movie, onPress }: MovieRowProps) => (
  <Pressable onPress={() => onPress(movie.id)} style={styles.item}>
    {
      <Image style={styles.poster} source={{uri:movie?.poster_path? `https://image.tmdb.org/t/p/w200${movie?.poster_path}`: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fideas%2Fimages%2F6%2F66%2FFoxAndroidTM2%27s_No_Poster.jpg%2Frevision%2Flatest%3Fcb%3D20230213155127&f=1&nofb=1&ipt=faa14f5f99030b3339e6d214676bb820d37b1e595f866487d64271dc3f196a74'}} resizeMode="contain"/> 
    }
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
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    flexShrink: 1,
  },
  poster: {
    marginRight:10,
    width: 50,
    height: 60,
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
