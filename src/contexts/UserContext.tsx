import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Props } from "../types";

const UserContext = createContext({ userData: '', setUserData: (userData: any) => { console.log(userData) } });
export default UserContext;

export function UserProvider({ children }: Props) {
  const [userData, setUserData] = useLocalStorage('userData', {});
  
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}