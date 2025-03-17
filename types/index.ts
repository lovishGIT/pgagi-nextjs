export interface UserLocation {
    id?: number;
    name: string;
    lat: number;
    lng: number;
}

export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export interface NewsArticle {
    title: string;
    description: string;
    url: string;
    source: { name: string };
}

export interface StockData {
    ticker: string;
    price: number;
    change_amount: number;
    change_percentage: string;
    volume?: string;
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: string;
}

export interface WeatherData {
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