import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import NewsFeed from './Src/Containers/Components/NewsFeed';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <NewsFeed />
    </SafeAreaView>
  );
};

export default App;
