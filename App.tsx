import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from './src/Home';
import { Filters } from './src/Filters';

type Tab = 'home' | 'filters';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        <View style={styles.screen}>
          {tab === 'home' ? <Home /> : <Filters />}
        </View>
        <View style={styles.tabBar}>
          <Pressable
            onPress={() => setTab('home')}
            style={[styles.tab, tab === 'home' && styles.tabActive]}
          >
            <Text style={styles.tabLabel}>Home</Text>
          </Pressable>
          <Pressable
            onPress={() => setTab('filters')}
            style={[styles.tab, tab === 'filters' && styles.tabActive]}
          >
            <Text style={styles.tabLabel}>Filters</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#eee',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});
