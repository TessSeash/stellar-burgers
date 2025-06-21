// Слайс для авторизации пользователя
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TUser } from '../../utils/types';
import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';

export const loginUserThunk = createAsyncThunk(
  // Авторизация пользователя
  'user/loginUser',
  async (loginData: TLoginData) => {
    const response = await loginUserApi(loginData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUserThunk = createAsyncThunk(
  // Выход пользователя
  'user/logoutUser',
  async () => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
);

export const registerUserThunk = createAsyncThunk(
  // Регистрация пользователя
  'user/registerUser',
  async (registerData: TRegisterData) => {
    const response = await registerUserApi(registerData);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const getUserThunk = createAsyncThunk(
  // Получение данных пользователя
  'user/getUser',
  async () => getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  // Обновление данных пользователя
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const getOrdersThunk = createAsyncThunk('user/getOrders', async () => {
  const response = await getOrdersApi();
  return response;
});

export interface IUserState {
  authenticationState: boolean; // Состояние аутентификации пользователя
  userLoginRequest: boolean; // Запрос на авторизацию пользователя
  user: TUser | null; // Данные пользователя
  orders: TOrder[]; // Заказы пользователя
  ordersRequest: boolean; // Запрос на получение заказов пользователя
  error: string | null; // Сообщение об ошибке
}

const initialState: IUserState = {
  authenticationState: false,
  userLoginRequest: false,
  user: null,
  orders: [],
  ordersRequest: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    authenticationStateSelector: (state: IUserState) =>
      state.authenticationState,
    userLoginRequestSelector: (state: IUserState) => state.userLoginRequest,
    userSelector: (state: IUserState) => state.user,
    ordersSelector: (state: IUserState) => state.orders,
    errorSelector: (state: IUserState) => state.error
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.userLoginRequest = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userLoginRequest = false;
        state.user = action.payload;
        state.authenticationState = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.userLoginRequest = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.userLoginRequest = true;
        state.authenticationState = false;
        state.error = null;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.userLoginRequest = false;
        state.authenticationState = false;
        state.user = null;
      });

    builder
      .addCase(getUserThunk.pending, (state) => {
        state.userLoginRequest = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.userLoginRequest = false;
        state.authenticationState = true;
        state.user = action.payload.user;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.userLoginRequest = false;
        state.user = null;
        if (action.payload === null) {
          state.error = null;
        } else {
          state.error = action.payload as string;
        }
      });

    builder
      .addCase(updateUserThunk.pending, (state) => {
        state.userLoginRequest = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.userLoginRequest = false;
        state.authenticationState = true;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.userLoginRequest = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(getOrdersThunk.pending, (state) => {
        state.ordersRequest = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.ordersRequest = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.ordersRequest = false;
        state.error = action.error.message as string;
      });

    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.userLoginRequest = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.userLoginRequest = false;
        state.user = action.payload;
        state.authenticationState = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.userLoginRequest = false;
        state.error = action.error.message as string;
      });
  }
});

export const { clearErrors } = userSlice.actions;

export const {
  authenticationStateSelector,
  userLoginRequestSelector,
  userSelector,
  ordersSelector,
  errorSelector
} = userSlice.selectors;

export default userSlice.reducer;
