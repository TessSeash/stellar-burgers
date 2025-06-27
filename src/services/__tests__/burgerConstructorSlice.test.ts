import { expect, test, describe } from '@jest/globals';
import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  clearConstructor,
  initialState,
  moveIngredient,
  IBurgerConstructorState
} from '../slices/burgerConstructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('Тест burgerConstructor', () => {
  const fakeIngredient: TIngredient = {
    _id: '341295678',
    name: 'Tasty ingredient',
    type: 'main',
    proteins: 999,
    fat: 999,
    carbohydrates: 999,
    calories: 999,
    price: 999,
    image: 'test-url',
    image_large: 'test-url',
    image_mobile: 'test-url'
  };

  const fakeConstructorIngredient: TConstructorIngredient = {
    ...fakeIngredient,
    id: '123id'
  };

  test('Добавление ингредиента в конструктор', () => {
    const state = burgerConstructorReducer(
      initialState,
      addIngredient(fakeIngredient)
    ).burgerConstructor;
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({ ...fakeIngredient, id: expect.any(String) })
    );
  });

  test('Добавление булки в конструктор', () => {
    const fakeBuns: TIngredient = {
      ...fakeIngredient,
      type: 'bun'
    };

    const state = burgerConstructorReducer(
      initialState,
      addIngredient(fakeBuns)
    ).burgerConstructor;

    expect(state.bun).toEqual(
      expect.objectContaining({ ...fakeBuns, id: expect.any(String) })
    );
  });

  test('Удаление ингредиента', () => {
    const testState: IBurgerConstructorState = {
      ...initialState,
      burgerConstructor: {
        ...initialState.burgerConstructor,
        ingredients: [fakeConstructorIngredient]
      }
    };
    const stateAfterRemove = burgerConstructorReducer(
      testState,
      removeIngredient(fakeConstructorIngredient)
    ).burgerConstructor;
    expect(stateAfterRemove.ingredients.length).toBe(0);
  });

  test('Изменение положения ингредиента в очереди', () => {
    const firstIngredient: TConstructorIngredient = {
      ...fakeIngredient,
      id: 'fakeId1'
    };

    const secondIngredient: TConstructorIngredient = {
      ...fakeIngredient,
      id: 'fakeId2'
    };

    const testState: IBurgerConstructorState = {
      ...initialState,
      burgerConstructor: {
        ...initialState.burgerConstructor,
        ingredients: [firstIngredient, secondIngredient]
      }
    };

    const stateMoveIngrDown = burgerConstructorReducer(
      testState,
      moveIngredient({ index: 0, direction: 'down' })
    ).burgerConstructor;
    expect(stateMoveIngrDown.ingredients[0].id).toBe('fakeId2');
    expect(stateMoveIngrDown.ingredients[1].id).toBe('fakeId1');
  });

  test('Очистка конструктора бургера', () => {
    //clearConstructor
    const filledState: IBurgerConstructorState = {
      burgerConstructor: {
        bun: { ...fakeConstructorIngredient, type: 'bun' },
        ingredients: [
          { ...fakeConstructorIngredient, id: '1' },
          { ...fakeConstructorIngredient, id: '2' }
        ]
      },
      error: null
    };

    const clearedState = burgerConstructorReducer(
      filledState,
      clearConstructor()
    );
    const { burgerConstructor } = clearedState;

    expect(burgerConstructor.bun).toBeNull();
    expect(burgerConstructor.ingredients.length).toBe(0);
  });
});
