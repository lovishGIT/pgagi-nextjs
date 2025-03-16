import React from 'react';
import { useRouter } from 'next/router';
import { UserLocation, WeatherData } from '@/types';

const WeatherWidget = ({ locations }: {
    locations: UserLocation[];
}) => {
    const router = useRouter();
    const [weatherData, setWeatherData] = React.useState<WeatherData | null>(null);

    React.useEffect(() => {
        const fetchWeatherData = async () => {
            if (locations && locations.length > 0) {
                const weather = await fetch(`/api/services/weather?lat=${locations[0].lat}&lon=${locations[0].lng}`);
                const data = await weather.json();
                // console.log(data);
                setWeatherData(data);
            }
        };
        fetchWeatherData();
    }, [locations]);

    if (!weatherData || !weatherData.weather) {
        return (
            <div className="dark:bg-white dark:text-black bg-black text-white rounded-lg shadow p-4 h-full flex items-center justify-center">
                <p className="text-gray-500">
                    Weather data unavailable
                </p>
            </div>
        );
    }

    const getWeatherIcon = (iconCode: string) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div
            className="bg-white text-black rounded-lg overflow-hidden cursor-pointer border-2 border-gray-400 shadow-sm"
            onClick={() => router.push('/weather')}
        >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                <h3 className="font-bold text-lg">Current Weather</h3>
                <p className="text-sm text-blue-100">
                    {weatherData.name}
                </p>
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src={getWeatherIcon(
                                weatherData.weather[0].icon
                            )}
                            alt={weatherData.weather[0].description}
                            className="w-16 h-16"
                        />
                        <div className="ml-2">
                            <div className="text-3xl font-bold">
                                {Math.round(weatherData.main.temp)}°C
                            </div>
                            <div className="text-gray-500 capitalize">
                                {weatherData.weather[0].description}
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-sm text-gray-500">
                            Feels like:{' '}
                            {Math.round(weatherData.main.feels_like)}
                            °C
                        </div>
                        <div className="text-sm text-gray-500">
                            Wind: {weatherData.wind.speed} m/s
                        </div>
                        <div className="text-sm text-gray-500">
                            Humidity: {weatherData.main.humidity}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center cursor-pointer">
                Click for detailed forecast
            </div>
        </div>
    );
};

export default WeatherWidget;