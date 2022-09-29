import { createAsyncThunk } from '@reduxjs/toolkit';
import { CategoriesAPI } from '../../api/categories/categories';

export const getAllCategories = createAsyncThunk('getAllCategories', async () => {
  return await new CategoriesAPI().getCategories();
});
