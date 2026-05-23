import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home } from './src/Home';
import { Filters } from './src/Filters';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Tab = 'home' | 'filters';

const queryClient = new QueryClient()

export default function App() {
  const [tab, setTab] = useState<Tab>('home');

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaInsetsContext.Consumer>
              {insets =>  <View style={{ ...styles.root, paddingTop: insets?.top ?? 0, paddingBottom: insets?.bottom   ?? 0 }}>
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
          }
        </SafeAreaInsetsContext.Consumer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </QueryClientProvider>
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
