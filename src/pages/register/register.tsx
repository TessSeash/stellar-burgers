import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearErrors,
  errorSelector,
  registerUserThunk,
  authenticationStateSelector
} from '../../services/slices/userSlice';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);
  const isAuthenticated = useSelector(authenticationStateSelector);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUserThunk({ name: userName, email, password }));
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <RegisterUI
      errorText={error as string}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
