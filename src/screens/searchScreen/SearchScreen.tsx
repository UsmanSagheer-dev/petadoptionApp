import {StyleSheet, View} from 'react-native';
import React from 'react';
import SearchInput from '../../components/searcInput/SearchInput';
import HorizontalTabs from '../../components/horizentolTabs/HorizentolTabs';
const SearchScreen = () => {
  const tabs = [
    {id: 'dogs', label: 'Dogs'},
    {id: 'cats', label: 'Cats'},
    {id: 'bunnies', label: 'Bunnies'},
    {id: 'birds', label: 'Birds'},
    {id: 'turtles', label: 'Turtles'},
  ];

  const handleTabPress = (tabId: string) => {
    console.log(`Selected Tab: ${tabId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput />
      </View>
      <View style={styles.tabsContainer}>
        <HorizontalTabs tabs={tabs} onTabPress={handleTabPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  searchContainer: {
    top: 20,
  },
  tabsContainer: {
    marginTop: 25,
    
  },
});
export default SearchScreen;
