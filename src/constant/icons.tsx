// icons.tsx
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

// Define the type for our icons
type IconType = Record<string, (size?: number, color?: string) => JSX.Element>;

const ICONS: IconType = {
  home: (size = 24, color = "black") => (
    <MaterialIcons name="home" size={size} color={color} />
  ),
  user: (size = 24, color = "black") => (
    <FontAwesome name="user" size={size} color={color} />
  ),
  settings: (size = 24, color = "black") => (
    <MaterialIcons name="settings" size={size} color={color} />
  ),
  heartFilled: (size = 24, color = "red") => (
    <MaterialIcons name="favorite" size={size} color={color} />
  ),
  heartOutline: (size = 24, color = "gray") => (
    <MaterialIcons name="favorite-border" size={size} color={color} />
  ),
  search: (size = 24, color = "black") => (
    <Ionicons name="search" size={size} color={color} />
  ),
  back: (size = 24, color = "black") => (
    <Ionicons name="arrow-back" size={size} color={color} />
  ),
  forward: (size = 24, color = "black") => (
    <Ionicons name="arrow-forward" size={size} color={color} />
  ),
};

export default ICONS;
