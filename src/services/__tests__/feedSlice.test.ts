import feedReducer, {
  getFeedsThunk,
  initialState,
  getOrderByNumberThunk
} from '../slices/feedSlice';

describe('Тест feedReducer', () => {
  describe('Тест getFeedsThunk', () => {
    test('Обрабатывает getFeedsThunk.pending', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Обрабатывает getFeedsThunk.fulfilled', () => {
      const payload = {
        orders: [{ _id: '1', name: 'Order 1' }],
        total: 23434,
        totalToday: 987
      };
      const action = { type: getFeedsThunk.fulfilled.type, payload };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(payload.orders);
      expect(state.total).toBe(payload.total);
      expect(state.totalToday).toBe(payload.totalToday);
    });

    test('Обрабатывает getFeedsThunk.rejected', () => {
      const errorMessage = 'Ошибка загрузки ленты';
      const action = {
        type: getFeedsThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Тест getOrderByNumberThunk', () => {
    test('Обрабатывает getOrderByNumberThunk.pending', () => {
      const action = { type: getOrderByNumberThunk.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('Обрабатывает getOrderByNumberThunk.fulfilled', () => {
      const payload = { orders: [{ _id: '1', name: 'Order 1' }] };
      const action = { type: getOrderByNumberThunk.fulfilled.type, payload };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(payload.orders[0]);
    });

    test('Обрабатывает getOrderByNumberThunk.rejected', () => {
      const errorMessage = 'Ошибка поиска заказа';
      const action = {
        type: getOrderByNumberThunk.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
