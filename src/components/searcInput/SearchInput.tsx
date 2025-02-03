import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import IMAGES from '../../assets/images';
import COLOR from '../../constant/constant';

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for a pet"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Image source={IMAGES.SEARCHICON} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: 25,
  },
  input: {
    flex: 1,
    height: 48,
    paddingLeft: 21,
    borderRadius: 20,
    backgroundColor: COLOR.tertiary,
  },
  iconContainer: {
    width: 82,
    height: 62,
    backgroundColor: 'black',
    position: 'absolute',
    right: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  icon: {
    width: 25,
    height: 35,
  },
});

export default SearchInput;
