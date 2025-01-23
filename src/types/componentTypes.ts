import {ReactNode} from 'react';
import {ViewStyle, TextStyle, DimensionValue} from 'react-native';

export interface LoginButtonProps {
  onClick: () => void;
  title: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;
  disabled?: boolean;
}

export interface LoginButtonStyles {
  button: ViewStyle;
  buttonText: TextStyle;
}
export interface CustomeHeaderProps {
  title: string;
}


export interface PetCardProps {
  
  imageUrl?: string;
  name: string;
  age: string;
  location: string;
  gender: string;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  favoriteIcon: any; // Type this based on your icon assets, or use `ImageSourcePropType` from `react-native`
  unfavoriteIcon: any; // Same as above
  locationIcon: any; // Same as above
  onPress: () => void;
}
export interface TabItem {
  id: string;
  label: string;
}

export interface PickerInputProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: {label: string; value: string}[];
}

export interface TermsCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
