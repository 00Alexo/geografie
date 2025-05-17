import { createContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });
  
  // Adaugă starea isAuthReady
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Verifică autentificarea la încărcarea aplicației
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
    
    // Marchează autentificarea ca fiind verificată
    setIsAuthReady(true);
  }, []);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};