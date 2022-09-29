import { createAsyncThunk } from '@reduxjs/toolkit';
import { GroupsAPI } from '../../api/groups/groups';
import { IGroup } from '../customers/dto/Customers';

export const getAllGroups = createAsyncThunk<IGroup[]>('getAllGroups', async () => {
  return await new GroupsAPI().getGroups();
});

export const addNewGroup = createAsyncThunk<IGroup, IGroup>('addNewGroup', async (group) => {
  return await new GroupsAPI().saveGroup(JSON.stringify(group));
});
export const deleteGroup = createAsyncThunk<IGroup, string>('deleteGroup', async (id) => {
  return await new GroupsAPI().deleteGroup(id);
});
