import { StockData } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { stocks: StockData[] } = {
    stocks: [],
};

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setStocks: (state, action: PayloadAction<StockData[]>) => {
            state.stocks = action.payload;
        },
    },
});

export const { setStocks } = stocksSlice.actions;
export default stocksSlice.reducer;
