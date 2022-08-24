import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/usersSlice";
import todosReducer from "../slices/todosSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const usersPersistConfig = {
  key: 'userSliceState',
  storage: storage
}

const usersReducerPersisted = persistReducer(usersPersistConfig, usersReducer);

const store = configureStore({
  reducer: {
    users: usersReducerPersisted,
    todos: todosReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

const persistor = persistStore(store)

export { store, persistor };
