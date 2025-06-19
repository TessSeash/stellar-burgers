// Компонент защищённого маршрута для роутинга
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import {
  authenticationStateSelector,
  userLoginRequestSelector
} from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
  // children — вложенный компонент
};

// Основной компонент ProtectedRoute
export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuth = useSelector(authenticationStateSelector);
  const isLoading = useSelector(userLoginRequestSelector);
  const location = useLocation();

  // Пока идёт проверка авторизации или запрос на вход в систему — показываем прелоадер
  if (isLoading) {
    return <Preloader />;
  }

  // Если страница только для неавторизованных и пользователь авторизован — редирект на главную
  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  // Если страница защищённая и пользователь не авторизован — редирект на /login
  if (!onlyUnAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // Если пользователь авторизован и страница доступна для авторизованных — возвращаем вложенный компонент
  return children;
};
