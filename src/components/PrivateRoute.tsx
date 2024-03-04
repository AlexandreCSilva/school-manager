import React from 'react';
import useToken from '../hooks/useToken';
import { Navigate } from 'react-router-dom';
import { Props } from '../types';

function PrivateRoute({ children }: Props) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>
    {children}
  </>;
}

export default PrivateRoute;
