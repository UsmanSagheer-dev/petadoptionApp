import {ReactNode} from 'react';
import {ViewStyle, TextStyle, DimensionValue, ImageSourcePropType} from 'react-native';
import {Pet} from './pet';
import {ProfileData} from './auth';

export interface LoginButtonProps {
  onClick: () => void;
  title: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  disabled?: boolean;
}

export interface LoginButtonStyles {
  button: ViewStyle;
  buttonText: TextStyle;
}

export interface CustomeHeaderProps {
  title: string;
  DonateScreen?: boolean;
  navigateTo?: string;
  onPress?: () => void;
}

export interface PetCardProps {
  imageUrl: string | string[];
  name: string;
  age?: string | number;
  location: string;
  gender: string;
  icon: ReactNode;
  onPress: () => void;
  onIconPress: () => void;
  locationIcon: ReactNode;
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

export interface CardProps {
  title: string;
  subtitle: string;
  date: string;
  money?: number | string;
  imageUrl?: string;
}

export interface CustomTextProps {
  title: string;
  style?: TextStyle;
}

export interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  ownerData: ProfileData;
  onAdoptNow: () => Promise<void>;
  selectedPet: Pet | null | undefined;
}

export interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
}

export interface ImgWithTextProps {
  imageSource: ImageSourcePropType;
  label: string;
}

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs: Tab[];
  onTabPress: (tabId: string) => void;
  selectedTab: string;
}

export interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

