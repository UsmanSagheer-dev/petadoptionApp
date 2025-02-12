export interface AdoptionRequest {
    userId: string;
    userName: string;
    userEmail: string;
    petId: string;
    petName: string;
    petType: string;
    petAge: string | number;
    petGender: string;
    petWeight: string | number;
    petVaccinated: boolean;
    petLocation: string;
  }