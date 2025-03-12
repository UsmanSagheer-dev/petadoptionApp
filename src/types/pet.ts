import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface PetDonationCreate {
  petType: string;
  gender: string;
  vaccinated: string;
  petBreed: string;
  petName: string;
  petAge: string;
  description: string;
  location: string;
  contactNumber: string;
  imageUrl: string[];
  amount?: number | string;
}

export interface AdoptionRequestBasic {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp?: string;
  userName?: string;
  userEmail?: string;
}

export interface Pet extends PetDonationCreate {
  id: string;
  userId: string;
  requests: AdoptionRequestBasic[];
  createdAt: FirebaseFirestoreTypes.Timestamp;
  ownerDisplayName?: string;
  ownerEmail?: string;
  ownerPhotoURL?: string;
  isFavorite?: boolean;
  minWeight: number;
}

export interface AdoptionRequest {
  id?: string;
  userId: string;
  petId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: FirebaseFirestoreTypes.Timestamp;
  message?: string;
  userName?: string;
  userEmail: string;
  timestamp: string;
  userDetails?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    userId: string;
    userName?: string;
    userEmail: string;
    timestamp: string;
  };
}

export interface AdoptionRequestSimple {
  userId: string;
  userName: string;
  userEmail: string;
  timestamp: string;
}