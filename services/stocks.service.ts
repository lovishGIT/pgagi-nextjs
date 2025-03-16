import { AppDispatch } from '@/store';
import { setStocks } from '@/store/slices/stocks.slice';

export const fetchStocks = async (
    dispatch: AppDispatch,
    symbol: string = 'MSFT'
) => {
    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
        );
        const data = await response.json();
        dispatch(setStocks(data));
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
};
