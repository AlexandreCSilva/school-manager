import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Props } from "../types";
import { User } from "firebase/auth";

const UserContext = createContext<any | null>(null);
export default UserContext;

export function UserProvider({ children }: Props) {
  const [userData, setUserData] = useLocalStorage('userData', null);
  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}