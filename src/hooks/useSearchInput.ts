import {useState, useRef} from 'react';
import {TextInput} from 'react-native';
const useSearchInput = () => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<TextInput>(null);
  const handleSearch = () => {
    console.log(searchText);
    inputRef.current?.focus();
  };

  return {searchText, setSearchText, inputRef, handleSearch};
};

export default useSearchInput;
