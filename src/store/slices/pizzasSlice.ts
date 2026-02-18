import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza } from '../../types';
import { RootState } from '../index';

interface PizzasState {
  items: Pizza[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PizzasState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { categoryId, sortType, searchValue } = state.filter;

    const params: Record<string, string> = {
      select: '*',
    };

    if (categoryId > 0) {
      params.category = `eq.${categoryId}`;
    }

    if (searchValue) {
      params.title = `ilike.*${searchValue}*`;
    }

    const orderColumn = sortType.sortProperty;
    const orderDirection = orderColumn === 'price' ? 'asc' : 'desc';
    params.order = `${orderColumn}.${orderDirection}`;

    const response = await axios.get('https://xdohmfsrkglvtqpislgx.supabase.co/rest/v1/pizzas', {
      params,
      headers: {
        apikey: 'sb_publishable_Slg5D6vf-XCnILpb_l50CA_oMXs3xIm',
        Authorization: `Bearer sb_publishable_Slg5D6vf-XCnILpb_l50CA_oMXs3xIm`,
      },
    });

    return response.data as Pizza[];
  }
);

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка при загрузке пицц';
      });
  },
});

export default pizzasSlice.reducer;

