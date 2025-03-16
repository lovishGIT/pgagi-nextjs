import React from 'react';
import { useRouter } from 'next/router';

interface WeatherData {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    name: string;
}

interface WeatherWidgetProps {
    weatherData: WeatherData;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
    weatherData,
}) => {
    const router = useRouter();

    if (!weatherData || !weatherData.weather) {
        return (
            <div className="bg-white text-black rounded-lg shadow p-4 h-full flex items-center justify-center">
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
            className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
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

            <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center">
                Click for detailed forecast
            </div>
        </div>
    );
};

export default WeatherWidget;