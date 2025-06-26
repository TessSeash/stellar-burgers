import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  burgerConstructorSelector,
  clearConstructor
} from '../../services/slices/burgerConstructorSlice';
import {
  orderSelector,
  orderBurgerThunk,
  clearOrder
} from '../../services/slices/orderSlice';

import { authenticationStateSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  // Получаем данные из стора
  const constructorItems = useSelector(burgerConstructorSelector);
  const {
    isLoading: orderRequest,
    order: orderModalData,
    error
  } = useSelector(orderSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authentication = useSelector(authenticationStateSelector);

  // Оформление заказа
  const onOrderClick = () => {
    if (!authentication) {
      navigate('/login');
      return;
    }
    const { bun, ingredients } = constructorItems;
    if (!bun || orderRequest) return;
    const orderData: string[] = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];
    dispatch(orderBurgerThunk(orderData));
  };

  // Закрытие модального окна заказа
  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
    navigate('/', { replace: true });
  };

  // Подсчёт цены
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // Очищаем конструктор после успешного заказа
  useEffect(() => {
    if (!orderRequest && !error && orderModalData) {
      dispatch(clearConstructor());
    }
  }, [orderRequest, error, orderModalData, dispatch]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
