import { Stock } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { stocks: Stock[] } = {
    stocks: [],
};

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action: PayloadAction<Stock[]>) => {
            state.stocks = action.payload;
        },
    },
});

export const { setStocks } = stocksSlice.actions;
export default stocksSlice.reducer;
