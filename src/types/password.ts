export interface UpdatePasswordPayload {
    oldPassword: string;
    newPassword: string;
  }
  
  export interface PasswordUpdateState {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    isLoading: boolean;
  }