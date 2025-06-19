import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export interface IOrderState {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderState = {
  order: null,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    orderSelector: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Начало загрузки заказа
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Успешное получение заказа
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      })
      // Ошибка при получении заказа
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при создании заказа';
      });
  }
});

export const { orderSelector } = orderSlice.selectors;

export default orderSlice.reducer;
