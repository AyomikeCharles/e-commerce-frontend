import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slicer/cartSlice";
import authReducer from "../slicer/authSlice";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, cartReducer)



export const store = configureStore({
    reducer:{
       cart:persistedReducer,
       authUser:authReducer
    },
    middleware:getDefaultMiddleware =>
       getDefaultMiddleware({
         serializableCheck: false,
       }),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
