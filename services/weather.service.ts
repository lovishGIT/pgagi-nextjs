import { AppDispatch } from '@/store';
import { setWeather } from '@/store/slices/weather.slice';

export const fetchWeather = async (
    dispatch: AppDispatch,
    lat: number,
    lon: number
) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        dispatch(setWeather(data));
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};
