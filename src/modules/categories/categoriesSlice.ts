import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../customers/dto/Customers';
import { getAllCategories } from './categoriesAsyncActions';

interface ICategoriesInitialState {
  isLoading: boolean;
  count: number;
}

export const categoriesAdapter = createEntityAdapter<IGroup>();

const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState<ICategoriesInitialState>({
    isLoading: false,
    count: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
      categoriesAdapter.setAll(state, action.payload);
      state.count = action.payload.length;
    });
  },
});
