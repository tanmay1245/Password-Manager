import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.js";
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    user: userSlice
});

const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false
        })

});

export default store;
export const persistor = persistStore(store);