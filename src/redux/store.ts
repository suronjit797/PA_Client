import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./features/authSlice";
import helperReducer from "./features/helperSlice";
import themeReducer from "./features/themeSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { ThunkAction, Action } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  helper: helperReducer,
  theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Define a custom hook for useDispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

