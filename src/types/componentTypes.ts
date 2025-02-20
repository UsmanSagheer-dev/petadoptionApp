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
  imageUrl: string | string[];
  name: string;
  age:any;
  location: string;
  gender: string;
  icon: React.ReactNode;
  onPress: () => void;
  onIconPress: () => void;
}


export interface PetCardProps {
  
  
  gender: string;

 
 
  locationIcon: any;

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
  money: string;
}

export interface CustomTextProps {
  title: string;
  style?: TextStyle;
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
 donation: string;
  amount?: number;  
}


export interface CustomBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  selectedPet?: Pet | null;
}

