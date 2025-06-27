import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

export interface IBurgerConstructorState {
  // Интерфейс состояния слайса конструктора бургера
  burgerConstructor: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
}

export const initialState: IBurgerConstructorState = {
  // Начальное состояние слайса для конструктора бургера
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  error: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    burgerConstructorSelector: (state: IBurgerConstructorState) =>
      state.burgerConstructor
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerConstructor.bun = action.payload;
        } else {
          state.burgerConstructor.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },
    clearConstructor: (state) => {
      state.burgerConstructor.bun = null;
      state.burgerConstructor.ingredients = [];
    },
    // Перемещает ингредиент в массиве вверх или вниз на одну позицию
    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) => {
      // Получаем массив ингредиентов из состояния
      const array = state.burgerConstructor.ingredients;
      // Извлекаем индекс и направление из action
      const { index, direction } = action.payload;

      // Если направление вверх и элемент не первый — перемещаем вверх
      if (direction === 'up' && index > 0) {
        // Удаляем элемент по индексу и вставляем его на позицию выше
        array.splice(index - 1, 0, array.splice(index, 1)[0]);
      }
      // Если направление вниз и элемент не последний — перемещаем вниз
      if (direction === 'down' && index < array.length - 1) {
        // Удаляем элемент по индексу и вставляем его на позицию ниже
        array.splice(index + 1, 0, array.splice(index, 1)[0]);
      }
    }
  }
});

export const { burgerConstructorSelector } = burgerConstructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
