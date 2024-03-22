import { useContext } from 'react';

import UserContext, { UserContextType } from '../contexts/UserContext';

export default function useToken() {
  const { userData: user } = useContext(UserContext) as UserContextType;

  return user.uid;
}
