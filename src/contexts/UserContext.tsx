import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Props } from "../types";
import { User } from 'firebase/auth';

export type UserContextType = { userData: User | null, setUserData: (user: User | null) => void }

const UserContext = createContext<UserContextType>({ userData: null, setUserData: (user: User | null) => user});

export default UserContext;

export function UserProvider({ children }: Props) {
  const [userData, setUserData] = useLocalStorage('userData', null);
  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}