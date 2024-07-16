import { createSlice } from '@reduxjs/toolkit';



const boxSlice = createSlice({ //Управление состоянием списка квадратов
  name: 'boxes',
  initialState: [], //Начальное состояние
  reducers: {
    addBox: (state) => { //Редьюсеры для добавления и удаления
      state.unshift({
        id: Date.now(),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      });
    },
    removeBox: (state) => {
      state.pop();
    },
  },
});

export const { addBox, removeBox } = boxSlice.actions;
export default boxSlice.reducer;
