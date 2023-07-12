import { configureStore, combineReducers } from "@reduxjs/toolkit"
import appReducer from "./reducer/app.reducer"

const rootReducer = combineReducers({
    app: appReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export { store };