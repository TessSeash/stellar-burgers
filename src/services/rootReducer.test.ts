import rootReducer from './rootReducer';
import store from './store';

describe('Тестирование rootReducer', () => {
  test('Функция возвращает корректное начальное состояние хранилища', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(store.getState());
  });
});
