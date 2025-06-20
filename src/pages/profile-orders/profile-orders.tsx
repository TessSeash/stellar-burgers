import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrdersThunk,
  ordersSelector
} from '../../services/slices/userSlice';
import { getFeedSelector } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  console.log('ProfileOrders mounted');
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  console.log('orders:', orders);

  return <ProfileOrdersUI orders={orders} />;
};
