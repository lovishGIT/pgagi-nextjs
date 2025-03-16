export interface UserLocation {
    id?: number;
    name: string;
    lat: Number;
    lng: Number;
}

export interface User {
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

export interface Stock {
    symbol: string;
    price: number;
    change: number;
    fundamentals?: {
        investors?: string[],
        profit: {
            annual: number, // Can go Negative Too
            quaterly: number
        },
    }
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}