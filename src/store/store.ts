import { combineReducers, configureStore } from '@reduxjs/toolkit';
import GroupReducer from '../modules/groups/groupSlice';

const rootReducer = combineReducers({
  GroupReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type typeGlobalState = ReturnType<typeof rootReducer>;
