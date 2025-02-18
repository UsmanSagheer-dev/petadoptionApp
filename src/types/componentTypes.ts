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
  DonateScreen?: boolean;
}


export interface PetCardProps {
  
  imageUrl?: string;
  name: string;
  age?
  : string;
  location: string;
  gender: string;

 
 
  locationIcon: any;
  onPress: () => void;
  onIconPress:any
  icon: any;
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


export type Pet ={
  id: string;
  userId?:string;
  petBreed: string;
  petWeight?: number;
  location: string;
  gender: string;
  isFavorite?: boolean;
  imageUrl: string;
  age: string;
  weight?: string;
  vaccinated: boolean;
  type: string;
  description: string;
  petType: string;
 
  amount?: number;  // Add this to match donation money
}


export interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedPet?: Pet | null;
}

