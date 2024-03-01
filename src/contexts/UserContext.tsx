import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Props } from "../types";
import { User } from '@firebase/auth/dist/auth-public';

const UserContext = createContext({ userData: {} as User, setUserData: (userData: User | object) => { console.log(userData) } });
export default UserContext;

export function UserProvider({ children }: Props) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}