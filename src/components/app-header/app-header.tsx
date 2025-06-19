import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppHeaderUI } from '@ui';
import { userSelector } from '../../../src/services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userSelector);
  const userName = user?.name ?? '';
  return <AppHeaderUI userName={userName} />;
};
