export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Recover: undefined;
  Home: undefined;
  App: undefined;
  Main: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Search: undefined;
  Favourite: undefined;
  Profiles: {   
    userId?: string;
    name?: string;
    focused: any;
  };
  passwrdUpdates: undefined;
};
