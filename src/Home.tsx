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
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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
const Loader = ()=> (
  <View style={styles.loadingContainer}>
    <Text style={styles.loading}>Loading movies...</Text>
  </View>
)
const Error = ({message}: {message: string})=> (
  <View style={styles.errorContainer}>
    <Text style={styles.error}>{message}</Text>
  </View>
)

const TMDBFlatList = ({query}: {query: string}) => {
  const isSearch = query?.length > 0
  const { data } = useSuspenseQuery({
    queryKey: ['tmdb', {query, api: isSearch ? 'search' : 'now_playing'}],
    queryFn: () => isSearch ? fetchSearch(query): fetchNowPlaying(),
    staleTime: (isSearch ? 60 : 5) * 60 * 1000, // cache for 5 min for nowPlaying, 1h for search
  });

  const handleMoviePress = useCallback((id: number) => {
    console.log("Movie pressed:", id);
  }, []);

  if (data.length) {
    return (<FlatList
        data={data}
        renderItem={({ item }) => (
          <MovieRow movie={item} onPress={(id) => handleMoviePress(id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />)
  }
  return (<Error message="No movie found"/>)
};

export const Home = () => {
  const [query, setQuery] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useDebounce(query, 1000);
  const [lastQueries, setLastQueries] = useAsyncStorage<string[]>("lastQueries", []);


  useEffect(() => {
    if (!debouncedQuery) {
      return;
    }
    // dedup by first removing if existing then pushing
    const set = new Set([...lastQueries])
    set.delete(debouncedQuery);
    const newLastQueries = [...set, debouncedQuery].slice(-5)
    setLastQueries(newLastQueries);
  }, [debouncedQuery]);


  const clearQuery = useCallback(() => {
    if (query.length) {
      setDebouncedQuery("");
      setQuery("");
    }
  }, [query]);

  const setQueryFromRecent = useCallback((historyQuery: string) => {
    setDebouncedQuery(historyQuery);
    setQuery(historyQuery);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent movies</Text>

      <SearchBar query={query} onChangeText={setQuery} onClear={clearQuery}/>
      <RecentSearch lastQueries={lastQueries} setQueryFromRecent={setQueryFromRecent} />
      <ErrorBoundary fallbackRender={({ error }: { error: any }) => <Error message={`Failed to load Movies: ${error.message}`}/>}>
        <Suspense fallback={<Loader/>}>
          <TMDBFlatList query={debouncedQuery}/>
        </Suspense>
      </ErrorBoundary> 
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

  return (<ScrollView contentContainerStyle={styles.searchRecent} style={styles.searchRecentHolder} horizontal={true}>
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
  searchRecentHolder: {
    flexGrow:0,
    height:50,
  },
  searchRecent: {
    paddingHorizontal: 16,
    height:30,
    flexDirection: "row",
    gap: 8,
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
  loadingContainer : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loading : {
    fontSize: 17,
  },
  errorContainer : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  error : {
    fontSize: 17,
  },
});
