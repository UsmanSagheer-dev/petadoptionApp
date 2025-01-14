export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Recover: undefined;
  Home: undefined;
  App: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Profiles: {
    userId?: string;
    name?: string;
  };
};