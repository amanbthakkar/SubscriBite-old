import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  //and we can have methods to change these values
  authenticate: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null);
  }

  //now a value object that is supposed to tie the store values to these apparently
  const value = {
    token: authToken,
    isAuthenticated: !!authToken, //basically true if string is not null
    authenticate: authenticate,
    logout: logout, //store: function_defined_here
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
