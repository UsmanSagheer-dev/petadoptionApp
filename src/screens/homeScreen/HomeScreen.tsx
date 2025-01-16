import COLOR from '../../constant/constant';
import Header from '../../components/header/Header';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import SearchInput from '../../components/searcInput/SearchInput';
import IMAGES from '../../assets/images';
import ImgWithText from '../../components/imgWithText/ImgWithText';
import CardSection from '../../components/cardSection/CardSection';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const details = [
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
    {
      imageSource: IMAGES.PROFILEIMG,
      label: 'Profile',
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <View>
            <Header navigation={navigation} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Find an Awesome Pets for You</Text>
          </View>
          <View style={styles.searchContainer}>
            <SearchInput />
          </View>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carousel}>
              {details.map((item, index) => (
                <ImgWithText key={index} imageSource={item.imageSource} label={item.label} />
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

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1, 
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 17,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 36,
    fontWeight: 800,
    fontFamily: 'MontserratRegular',
    color: COLOR.primary,
  },
  textContainer: {
    width: 230,
    marginTop: 100,
  },
  searchContainer: {
    marginTop: 27,
  },
  carousel: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 7,
    height: 102,
  },
  foryou: {
    fontSize: 18,
    fontWeight: 700,
    color: COLOR.primary,
    fontFamily: 'MontserratRegular',
    marginTop: 24,
  },
  cardsection: {
    marginTop: 24,
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
  },
});

export default HomeScreen;
