import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import IMAGES from "../../assets/images";
import styles from "./SearchInputStyle";
import COLOR from "../../constant/constant";
import {SearchInputProps} from '../../types/types'
const SearchInput: React.FC<SearchInputProps> = ({ searchText, setSearchText }) => {
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
        <Image source={IMAGES.SEARCHICON} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
