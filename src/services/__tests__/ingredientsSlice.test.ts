import ingredientsReducer, {
  IIngredientsState,
  getIngredientsThunk,
  initialState
} from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('Тест ingredientsReducer', () => {
  test('Обрабатывает начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('Обрабатывает getIngredientsThunk.pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Обрабатывает getIngredientsThunk.fulfilled', () => {
    const fakeIngredients: TIngredient[] = [
      {
        _id: '975362',
        name: 'Fake inredient 1',
        type: 'bun',
        proteins: 123,
        fat: 321,
        carbohydrates: 123,
        calories: 232,
        price: 123,
        image: 'test_image.jpg',
        image_large: 'test_image_large.jpg',
        image_mobile: 'test_image_mobile.jpg'
      },
      {
        _id: '93342',
        name: 'Fake inredient 2',
        type: 'main',
        proteins: 9999,
        fat: 5,
        carbohydrates: 5,
        calories: 5,
        price: 1,
        image: 'test_image.jpg',
        image_large: 'test_image_large.jpg',
        image_mobile: 'test_image_mobile.jpg'
      }
    ];

    const action = getIngredientsThunk.fulfilled(
      fakeIngredients,
      '',
      undefined
    );
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(fakeIngredients);
    expect(state.error).toBeNull();
  });

  test('Обрабатывает getIngredientsThunk.rejected', () => {
    const errorMessage = 'Ошибка при загрузке ингредиентов';
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
