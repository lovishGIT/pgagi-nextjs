import { NextApiRequest, NextApiResponse } from 'next';

const fetchWeather = async (lat: number, lon: number) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        return res
            .status(405)
            .json({ message: 'Method not allowed' });
    }

    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res
            .status(400)
            .json({ message: 'Latitude and longitude are required' });
    }

    try {
        const weatherData = await fetchWeather(lat, lon);
        return res.status(200).json(weatherData);
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to fetch weather data' });
    }
};