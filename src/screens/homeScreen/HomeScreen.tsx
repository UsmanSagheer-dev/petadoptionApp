import COLOR from '../../constant/constant';
import Header from '../../components/header/Header';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import styles from './HomeScreenStyle';
import SearchInput from '../../components/searcInput/SearchInput';
import ImgWithText from '../../components/imgWithText/ImgWithText';
import CardSection from '../../components/cardSection/CardSection';
import { PET_DETAILS} from '../../constant/constant';
import {HomeScreenProps} from '../../types/types'

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchText, setSearchText] = useState<string>('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <View>
            <Header />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Find an Awesome Pets for You</Text>
          </View>
          <View style={styles.searchContainer}>
            <SearchInput searchText={searchText} setSearchText={setSearchText} />
          </View>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carousel}>
              {PET_DETAILS.map((item, index) => (
                <ImgWithText
                  key={index}
                  imageSource={item.imageSource}
                  label={item.label}
                />
              ))}
            </ScrollView>
          </View>
          <Text style={styles.foryou}>For You</Text>
          <View style={styles.cardsection}>
            <CardSection />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
