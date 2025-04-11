import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import productsReducer from "./products/slice";
import settingsReducer from "./settings/slice";
import ordersReducer from "./orders/slice";

// Persisting token field from auth slice to localstorage
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "userId","isLoggedIn","isRefreshing","user"],
};

const ordersPersistConfig = {
  key: "orders",
  storage,
  whitelist: ["shopingCartList"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    products: productsReducer,
    settings: settingsReducer,
    orders: persistReducer(ordersPersistConfig, ordersReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
