import userReducer, {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  getUserThunk,
  updateUserThunk,
  getOrdersThunk,
  initialState
} from '../slices/userSlice';

describe('Тест userReducer', () => {
  const fakeUser = { email: 'fake@mail.com', name: 'fakeUser' };
  const fakeUserObj = { user: fakeUser };

  describe('Тест loginUserThunk', () => {
    test('Тест loginUserThunk.pending', () => {
      const action = { type: loginUserThunk.pending.type };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Тест loginUserThunk.fulfilled', () => {
      const action = { type: loginUserThunk.fulfilled.type, payload: fakeUser };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(false);
      expect(state.user).toEqual(fakeUser);
      expect(state.authenticationState).toBe(true);
    });

    test('Тест loginUserThunk.rejected', () => {
      const errorMessage = 'Ошибкапри авторизации';
      const action = {
        type: loginUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Тест logoutUserThunk', () => {
    test('pending', () => {
      const action = { type: logoutUserThunk.pending.type };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(true);
      expect(state.authenticationState).toBe(false);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const loggedInState = {
        ...initialState,
        user: fakeUser,
        authenticationState: true,
        userLoginRequest: true
      };
      const action = { type: logoutUserThunk.fulfilled.type };
      const state = userReducer(loggedInState, action);

      expect(state.userLoginRequest).toBe(false);
      expect(state.authenticationState).toBe(false);
      expect(state.user).toBeNull();
    });
  });

  describe('Тест registerUserThunk', () => {
    test('Тест registerUserThunk.pending', () => {
      const action = { type: registerUserThunk.pending.type };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Тест registerUserThunk.fulfilled', () => {
      const action = {
        type: registerUserThunk.fulfilled.type,
        payload: fakeUser
      };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(false);
      expect(state.user).toEqual(fakeUser);
      expect(state.authenticationState).toBe(true);
    });

    test('Тест registerUserThunk.rejected', () => {
      const errorMessage = 'Ошибка при регистрации';
      const action = {
        type: registerUserThunk.rejected.type,
        error: { message: errorMessage }
      };

      const state = userReducer(initialState, action);
      expect(state.userLoginRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Тест getUserThunk', () => {
    test('Тест getUserThunk.pending', () => {
      const action = { type: getUserThunk.pending.type };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(true);
      expect(state.error).toBeNull();
      expect(state.userChecked).toBe(false);
    });

    test('Тест getUserThunk.fulfilled', () => {
      const action = {
        type: getUserThunk.fulfilled.type,
        payload: fakeUserObj
      };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(false);
      expect(state.authenticationState).toBe(true);
      expect(state.user).toEqual(fakeUser);
      expect(state.userChecked).toBe(true);
    });

    test('Тест getUserThunk.rejected', () => {
      const errorMessage = 'Ошибка при получении пользователя';
      const action = {
        type: getUserThunk.rejected.type,
        payload: errorMessage
      };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBe(errorMessage);
      expect(state.userChecked).toBe(true);
    });
  });

  describe('Тест updateUserThunk', () => {
    test('Тест updateUserThunk.pending', () => {
      const action = { type: updateUserThunk.pending.type };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Тест updateUserThunk.fulfilled', () => {
      const action = {
        type: updateUserThunk.fulfilled.type,
        payload: fakeUserObj
      };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(false);
      expect(state.authenticationState).toBe(true);
      expect(state.user).toEqual(fakeUser);
    });

    test('Тест updateUserThunk.rejected', () => {
      const errorMessage = 'Ошибка при обновлении пользователя';
      const action = {
        type: updateUserThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);

      expect(state.userLoginRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Тест getOrdersThunk', () => {
    test('Тест getOrdersThunk.pending', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = userReducer(initialState, action);

      expect(state.ordersRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Тест getOrdersThunk.fulfilled', () => {
      const fakeOrders = [
        { _id: '1', name: 'Order 1' },
        { _id: '2', name: 'Order 2' }
      ];
      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: fakeOrders
      };
      const state = userReducer(initialState, action);

      expect(state.ordersRequest).toBe(false);
      expect(state.orders).toEqual(fakeOrders);
    });

    test('Тест getOrdersThunk.rejected', () => {
      const errorMessage = 'Ошибка при получении заказов';
      const action = {
        type: getOrdersThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);

      expect(state.ordersRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
