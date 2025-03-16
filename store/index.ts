import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import weatherReducer from './slices/weather.slice';
import stocksReducer from './slices/stocks.slice';
import todosReducer from './slices/todos.slice';
import locationReducer from './slices/location.slice';
import newsReducer from './slices/news.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        weather: weatherReducer,
        stocks: stocksReducer,
        todos: todosReducer,
        location: locationReducer,
        news: newsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
