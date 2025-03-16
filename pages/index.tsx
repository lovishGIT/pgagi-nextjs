import React from 'react';
import Layout from '@/components/global/Layout';
import { withAuth } from '@/components/auth/withAuth';
import { useAuth } from '@/hooks/useAuth';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

import WeatherWidget from '@/components/dashboard/WeatherWidget';
import TodoWidget from '@/components/dashboard/TodoWidget';
import StocksWidget from '@/components/dashboard/StocksWidget';
import NewsWidget from '@/components/dashboard/NewsWidget';
import LocationWidget from '@/components/dashboard/LocationWidget';

import { fetchUserLocations } from '@/services/location.service';
import { fetchTodos } from '@/services/todo.service';
import { useAppDispatch } from '@/store/hooks';
import { setTodos } from '@/store/slices/todos.slice';
import { setLocations } from '@/store/slices/location.slice';
import { setStocks } from '@/store/slices/stocks.slice';
import { UserLocation } from '@/types';

interface DashboardProps {
    stocksData: any;
    todos: any[];
}

export default function Dashboard({
    stocksData,
    todos,
}: DashboardProps) {
    const dispatch = useAppDispatch();
    const [userLocations, setUserLocations] = React.useState<UserLocation[]>([]);

    React.useEffect(() => {
        dispatch(setStocks(stocksData));
        dispatch(setTodos(todos));

        const fetchFromUser = async () => {
            const locations = await fetchUserLocations("new");
            if (locations) {
                setUserLocations(locations);
                dispatch(setLocations(locations));
            }
        };
        fetchFromUser();
    }, [
        dispatch,
        stocksData,
        todos,
    ]);
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
                        <WeatherWidget locations={userLocations} />
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-1">
                    <TodoWidget todos={todos} />
                </div>

                <div className="col-span-1 lg:col-span-2 xl:col-span-1">
                    <StocksWidget stocksData={stocksData} />
                </div>

                <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                    <NewsWidget />
                </div>
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
            const stocksData = await fetchStocks('MSFT');
            const todos = await fetchTodos();

            return {
                props: {
                    stocksData,
                    todos,
                },
            };
        } catch (error) {
            console.error('Error fetching dashboard data:', error);

            return {
                props: {
                    stocksData: {},
                    todos: [],
                },
            };
        }
    }
);
