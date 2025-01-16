import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';
import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import IMAGES from '../../assets/images';
import { NavigationProp } from '@react-navigation/native';

type HeaderProps = {
  navigation: NavigationProp<any>;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height; // Changed to screen height instead of window height

const Header: React.FC<HeaderProps> = ({navigation}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-windowWidth - 50)).current;

  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? -windowWidth - 50 : 0;
    
    Animated.timing(slideAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Image source={IMAGES.MODELTABL} alt='modeltab' />
          </TouchableOpacity>
      
          <TouchableOpacity>
            <Image source={IMAGES.PROFILEIMG} alt='modeltab' style={styles.profile} />
          </TouchableOpacity>
        </View>

        {/* Sidebar */}
        <Animated.View 
          style={[
            styles.sidebar,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.sidebarHeader}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Sidebar Content */}
          <View style={styles.sidebarContent}>
            <TouchableOpacity style={styles.sidebarItem}>
              <Text style={styles.sidebarText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem}>
              <Text style={styles.sidebarText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem}>
              <Text style={styles.sidebarText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem}>
              <Text style={styles.sidebarText}>Help</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Overlay */}
        {isSidebarOpen && (
          <TouchableOpacity 
            style={styles.overlay}
            activeOpacity={1}
            onPress={toggleSidebar}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  profile: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,  // Use full screen height
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2,
  },
  sidebarHeader: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#333',
  },
  sidebarContent: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  sidebarItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarText: {
    fontSize: 16,
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: windowHeight,
    zIndex: 1,
  },
});

export default Header;