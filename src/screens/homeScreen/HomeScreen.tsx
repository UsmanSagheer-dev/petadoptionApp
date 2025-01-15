import COLOR from '../../constant/constant';
import Header from '../../components/header/Header';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SearchInput from '../../components/searcInput/SearchInput';
import IMAGES from '../../assets/images';
import ImgWithText from '../../components/imgWithText/ImgWithText';
import CardSection from '../../components/cardSection/CardSection';

const HomeScreen = () => {
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
    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View>
          <Header />
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
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1, // Allows the content to grow and scroll
  },
  container: {
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
    marginTop: 39,
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
