import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';

import { Routes, Route } from 'react-router-dom';
import { useDispatch } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />}>
          <Route path='orders' element={<ProfileOrders />} />
          <Route path='orders/:number' element={<OrderInfo />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
