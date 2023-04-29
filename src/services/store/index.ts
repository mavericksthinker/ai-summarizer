import { configureStore } from '@reduxjs/toolkit';

import { articleAPI } from './article';
import logger from 'redux-logger';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        [articleAPI.reducerPath]: articleAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(articleAPI.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})