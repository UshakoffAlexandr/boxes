import { configureStore } from '@reduxjs/toolkit';
import boxReducer from '../features/boxSlice';

const store = configureStore({ //Хранилище
  reducer: {
    boxes: boxReducer, //reducer
  },
});

export default store;
