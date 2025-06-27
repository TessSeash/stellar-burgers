import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

// Интерфейс состояния слайса ингредиентов
export interface IIngredientsState {
  isLoading: boolean; // состояние загрузки данных
  ingredients: TIngredient[];
  error: string | null;
}

// Начальное состояние слайса
export const initialState: IIngredientsState = {
  isLoading: false,
  ingredients: [],
  error: null
};

// получение ингредиентов с сервера
export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi // Функция для получения ингредиентов из API
);

// Создание слайса для ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    // Селектор для получения ингредиентов из состояния
    ingredientsSelector: (state: IIngredientsState) => state.ingredients,
    // Селектор для получения загрузки
    ingredientsIsLoadingSelector: (state: IIngredientsState) => state.isLoading
  },
  // Обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      // загрузка началась
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // загрузка завершена успешно
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      // ошибка загрузки
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке ингредиентов';
      });
  }
});

export const { ingredientsSelector, ingredientsIsLoadingSelector } =
  ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
