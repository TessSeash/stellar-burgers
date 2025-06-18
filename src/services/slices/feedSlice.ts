import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

// Получение списка заказов
export const getFeedsThunk = createAsyncThunk('feed/getFeeds', async () =>
  getFeedsApi()
);

// Получение заказа по номеру
export const getOrderByNumberThunk = createAsyncThunk(
  'feed/getOrderByNumber',
  async (orderId: number) => getOrderByNumberApi(orderId)
);

export interface IFeedState {
  orders: TOrder[]; // Массив заказов
  total: number; // Общее количество заказов
  totalToday: number; // Количество заказов, сделанных сегодня
  isLoading: boolean;
  error: string | null; // Сообщение об ошибке
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

// Создание слайса для работы с лентой заказов (feed)
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state: IFeedState) => state,
    getOrdersSelector: (state: IFeedState) => state.orders
  },
  extraReducers: (builder) => {
    builder
      // Загрузка списка заказов
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Успешное получения списка заказов
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      // ошибка при получении списка заказов
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      // Загрузка заказа по номеру
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Ошибка при получении заказа по номеру
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.error = action.error.message!;
        state.isLoading = false;
      })
      // Успешное получение заказа по номеру
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload.orders;
      });
  }
});

export const { getFeedSelector, getOrdersSelector } = feedSlice.selectors;

export default feedSlice.reducer;
