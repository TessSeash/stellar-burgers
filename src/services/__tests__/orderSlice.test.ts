import orderReducer, {
  initialState,
  orderBurgerThunk
} from '../slices/orderSlice';

describe('Тестирование orderReducer', () => {
  test('Обрабатывает начальное состояние', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('Обрабатывает orderBurgerThunk.pending', () => {
    const state = orderReducer(initialState, {
      type: orderBurgerThunk.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Обрабатывает orderBurgerThunk.fulfilled', () => {
    const fakeOrder = { order: { number: 123, name: 'Fake order' } };
    const action = {
      type: orderBurgerThunk.fulfilled.type,
      payload: fakeOrder
    };
    const state = orderReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(fakeOrder.order);
  });

  test('Обрабатывает orderBurgerThunk.rejected', () => {
    const errorMessage = 'Ошибка при создании заказа';
    const action = {
      type: orderBurgerThunk.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
