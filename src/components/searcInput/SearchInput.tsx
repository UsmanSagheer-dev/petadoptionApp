import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './style';
import COLOR from '../../constants/constant';
import Ionicons from "react-native-vector-icons/Ionicons";
import {SearchInputProps} from 'types';
const SearchInput: React.FC<SearchInputProps> = ({
  searchText,
  setSearchText,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search for a pet"
        placeholderTextColor={COLOR.black}
      />
      <TouchableOpacity style={styles.iconContainer}>
     <Ionicons name="search" size={25} color={COLOR.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
