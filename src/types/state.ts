import {Pet} from './pet';

export interface RootState {
  donation: {
    pet: Pet[];
  };
}

export interface FavoriteState {
  favorites: Pet[];
}

export interface PetState {
  loading: boolean;
  error: string | null;
  donations: Pet[];
  favorites: Pet[];
}

export interface FormDataState {
  selectedTab: string;
  searchText: string;
  allPets: Pet[];
}