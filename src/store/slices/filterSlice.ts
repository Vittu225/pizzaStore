import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, SortType } from '../../types';

const initialState: FilterState = {
  categoryId: 0,
  sortType: { name: 'по цене', sortProperty: 'price' },
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;

