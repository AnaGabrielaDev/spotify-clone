
import { ReactNode, createContext, useEffect, useState } from "react";
import { backend } from "../apis/backend";

interface User {
  id: number
  name: string
  email: string
}

interface Credentials {
  email: string
  password: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  user: User | null
  signIn: (Credentials: Credentials) => Promise<{user: User | null, error?: unknown}>
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps)
export const AuthContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>({} as User);
  const isAuthenticated = !user;

  async function logout() {
    localStorage.removeItem('auth');
    setUser(null);
  }

  async function signIn({email, password}: Credentials) {
    try{
      const response = await backend.post('/login', {email, password});          
      const { accessToken, user } = response.data;
      
      const authData = {
        token: accessToken,
        user
      }

      localStorage.setItem('auth', JSON.stringify(authData))

      backend.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
      setUser(user);

      return {
        user,
        error: null
      };
    }catch(error: unknown){
      return {
        user: null,
        error
      }
    }
  }

  useEffect(() => {
    const authObj = JSON.parse(localStorage.getItem('auth') ?? '{}');
    if(!authObj?.token){
      setUser({} as User);
      backend.defaults.headers['Authorization'] = '';
    } 

    setUser(authObj.user)
    backend.defaults.headers['Authorization'] = `Bearer ${authObj.token}`;
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
} 