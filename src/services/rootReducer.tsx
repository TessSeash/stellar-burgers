import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import feedSlice from './slices/feedSlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  user: userSlice,
  burgerConstructor: burgerConstructorSlice,
  feed: feedSlice,
  order: orderSlice
});

export default rootReducer;
