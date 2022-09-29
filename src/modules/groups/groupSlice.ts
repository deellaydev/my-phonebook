import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../customers/dto/Customers';
import { addNewGroup, deleteGroup, getAllGroups } from './groupsAsyncActions';

interface IGroupInitialState {
  isLoading: boolean;
  count: number;
}

export const groupAdapter = createEntityAdapter<IGroup>();

const GroupSlice = createSlice({
  name: 'groups',
  initialState: groupAdapter.getInitialState<IGroupInitialState>({
    isLoading: false,
    count: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGroups.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
      groupAdapter.setAll(state, action.payload);
      state.count = action.payload.length;
    });
    builder.addCase(addNewGroup.fulfilled, (state, action: PayloadAction<IGroup>) => {
      groupAdapter.addOne(state, action.payload);
    });
    builder.addCase(deleteGroup.fulfilled, (state, action: PayloadAction<IGroup>) => {
      groupAdapter.removeOne(state, action.payload.id);
    });
  },
});

export default GroupSlice.reducer;
