import { AppDispatch } from '@/store';
import { setNews } from '@/store/slices/news.slice';

export const fetchNews = async (
    dispatch: AppDispatch,
    category: string = 'business'
) => {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
        );
        const data = await response.json();
        dispatch(setNews(data.articles));
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};
