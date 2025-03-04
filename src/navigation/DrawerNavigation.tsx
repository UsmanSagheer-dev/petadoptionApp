import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState} from 'react';
import SearchInput from '../components/searcInput/SearchInput';
import COLOR from '../constant/constant';
import {menuItems} from '../constant/screen';
import FONTS from 'assets/fonts';
const CustomDrawer = ({navigation}: DrawerContentComponentProps) => {
  const handleLogout = () => {
    auth().signOut();
    GoogleSignin.signOut();
  };
  const [searchText, setSearchText] = useState('');

  return (
    <DrawerContentScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.closeDrawer()}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
        <View>
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
        </View>
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}>
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: COLOR.white,
  },
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  closeButton: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    color: COLOR.primary,
    fontSize: 18,
    fontWeight:600,
    fontFamily: 'MontserratRegular',

  },
  logoutButton: {
    marginBottom: 30,
  },
  logoutText: {
    color:COLOR.error,
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'MontserratRegular',
  },
});

export default CustomDrawer;
