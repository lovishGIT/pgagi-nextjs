import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle } from "@/types";

const initialState: { articles: NewsArticle[] } = {
    articles: [],
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNews: (state, action: PayloadAction<NewsArticle[]>) => {
            state.articles = action.payload;
        },
    },
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;
