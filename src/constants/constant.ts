import IMAGES from '../assets/images/index';
const COLOR = {
  primary: '#101C1D',
  secondary: '#FFC300',
  tertiary: '#F2F3FA',
  quaternary: '#C4C4C4',
  lightGrey: '#D3D3D3',
  white: '#FFFFFF',
  black: '#000000',
  error: '#FF0000',
  success: '#008000',
  info: '#1E90FF',
  warning: '#FFD700',
  BorderBack: '#E2E2E2',
  infoBar: '#fef6ea',
  infoText: '#F6A530',
  PRIMARY_RED: '#ff5733',
  imageupload:'#E2E2E2'
};
export default COLOR;
export const PET_TABS = [
  {id: 'Dogs', label: 'Dogs'},
  {id: 'Cats', label: 'Cats'},
  {id: 'Bunnies', label: 'Bunnies'},
  {id: 'Birds', label: 'Birds'},
  {id: 'Turtles', label: 'Turtles'},
];

export const PET_TYPE_MAP: Record<string, string> = {
  Dogs: 'dog',
  Cats: 'cat',
  Bunnies: 'bunnies',
  Birds: 'birds',
  Turtles: 'turtle',
};

export const PET_TYPE_OPTIONS = [
  {label: 'Select', value: ''},
  {label: 'Dog', value: 'dog'},
  {label: 'Cat', value: 'cat'},
  {label: 'Bunnies', value: 'bunnies'},
  {label: 'Birds', value: 'birds'},
];

export const VACCINATION_OPTIONS = [
  {label: 'Select', value: ''},
  {label: 'Yes', value: 'yes'},
  {label: 'No', value: 'no'},
];

export const GENDER_OPTIONS = [
  {label: 'Select', value: ''},
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

export const PET_DETAILS = [
  {
    imageSource: IMAGES.DOGIMG,
    label: 'Dog',
  },
  {
    imageSource: IMAGES.BIRD,
    label: 'Bird',
  },
  {
    imageSource: IMAGES.CATIMG,
    label: 'Cat',
  },
  {
    imageSource: IMAGES.BUNNIES,
    label: 'Bunnies',
  },
];
