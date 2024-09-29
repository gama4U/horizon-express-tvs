import React, { createContext, useContext, useEffect, useState } from 'react';
import { SessionData } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';

const AuthContext = createContext<{
  session: SessionData,
  login: (token: string, user: IUser) => void,
  logout: () => void,
  loading: boolean | null
}>({
  session: {token: null, user: null},
  login: () => {},
  logout: () => {},
  loading: null
});

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData>({
    token: null,
    user: null
  });
  
  useEffect(() => {
    const storedToken = localStorage.getItem('sessionToken');
    const storedUser = localStorage.getItem('sessionUser');
    setSession({
      token: storedToken,
      user: storedUser ? JSON.parse(storedUser) : null
    })
    setLoading(false)
  }, []);

  const login = (token: string, user: IUser) => {
    localStorage.setItem('sessionToken', token);
    localStorage.setItem('sessionUser', JSON.stringify(user));
    setSession({ token, user});
  }

  const logout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('sessionUser');
    setSession({ token: null, user: null});
  }

  return (
    <AuthContext.Provider value={{ session, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);

