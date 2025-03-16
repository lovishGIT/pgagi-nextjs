import React from 'react';
import { GetServerSideProps } from 'next';
import { withAuth } from '@/components/auth/withAuth';
import Layout from '@/components/global/Layout';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { getSession } from 'next-auth/react';

import WeatherWidget from '@/components/dashboard/WeatherWidget';
import TodoWidget from '@/components/dashboard/TodoWidget';
import StocksWidget from '@/components/dashboard/StocksWidget';
import NewsWidget from '@/components/dashboard/NewsWidget';
import LocationWidget from '@/components/dashboard/LocationWidget';

import { fetchUserLocations } from '@/services/location.service';
import { fetchWeather } from '@/services/weather.service';
import { fetchStocks } from '@/services/stocks.service';
import { fetchNews } from '@/services/news.service';
import { fetchTodos } from '@/services/todo.service';
import { useAppDispatch } from '@/store/hooks';

interface DashboardProps {
    weatherData: any;
    stocksData: any;
    newsData: any;
    userLocations: any[];
    todos: any[];
}

export default function Dashboard({
    weatherData,
    stocksData,
    newsData,
    userLocations,
    todos,
}: DashboardProps) {
    const { session } = useAuth();

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {session?.user?.name}
                </h1>
                <p className="text-gray-600">
                    Here's an overview of your dashboard
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="col-span-1 lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <LocationWidget locations={userLocations} />
                        <WeatherWidget weatherData={weatherData} />
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-1">
                    <TodoWidget todos={todos} />
                </div>

                <div className="col-span-1 lg:col-span-2 xl:col-span-1">
                    <StocksWidget stocksData={stocksData} />
                </div>

                <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                    <NewsWidget newsData={newsData} />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/weather" className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">
                        Weather Details
                    </h3>
                    <p>
                        View detailed weather forecasts for all
                        your locations
                    </p>
                </Link>

                <Link href="/todos" className="p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">
                        Todo List
                    </h3>
                    <p>
                        Manage your tasks and track your
                        productivity
                    </p>
                </Link>

                <Link href="/stocks" className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">
                        Stock Analysis
                    </h3>
                    <p>
                        Compare your portfolio with top market
                        performers
                    </p>
                </Link>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = withAuth(
    async (context) => {
        const session = await getSession(context);

        if (!session) {
            return {
                redirect: {
                    destination: '/auth/signin',
                    permanent: false,
                },
            };
        }

        try {
            const dispatch = useAppDispatch();
            const userLocations = await fetchUserLocations(dispatch);
            const weatherData = await fetchWeather(
                dispatch,
                userLocations[0].lat,
                userLocations[0].lng
            );
            const stocksData = await fetchStocks('MSFT');
            const newsData = await fetchNews();
            const todos = fetchTodos();

            return {
                props: {
                    weatherData,
                    stocksData,
                    newsData,
                    userLocations,
                    todos,
                },
            };
        } catch (error) {
            console.error('Error fetching dashboard data:', error);

            return {
                props: {
                    weatherData: {},
                    stocksData: {},
                    newsData: { articles: [] },
                    userLocations: [],
                    todos: [],
                },
            };
        }
    }
);