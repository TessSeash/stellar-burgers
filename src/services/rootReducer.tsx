import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import feedSlice from './slices/feedSlice';
import orderSlice from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  feed: feedSlice,
  order: orderSlice
});

export default rootReducer;
