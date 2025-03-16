import React from 'react';
import { useRouter } from 'next/router';

interface StockData {
    ticker: string;
    price: number;
    change_amount: number;
    change_percentage: string;
    volume?: string;
}

const sampleData: StockData[] = [
    {
        ticker: 'NVIDIA',
        price: 195.2,
        change_amount: 5.8,
        change_percentage: '+3.06%',
    },
    {
        ticker: 'Amazon',
        price: 3335.55,
        change_amount: 16.75,
        change_percentage: '+0.50%',
    },
];

const StocksWidget = () => {
    const router = useRouter();

    const [gainers, setGainers] = React.useState<StockData[] | null>(
        null
    );
    const [losers, setLosers] = React.useState<StockData[] | null>(
        null
    );

    React.useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch('/api/services/stocks');
            const data = await response.json();
            console.log('Stocks Data', data);
            setGainers(data.top_gainers);
            setLosers(data.top_losers);
        };
        fetchStocks();
    }, []);

    return (
        <div
            className="bg-white rounded-lg shadow h-full flex flex-col cursor-pointer border-2 border-gray-400 dark:border-0"
            onClick={() => router.push('/stocks')}
        >
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white rounded-t-xl">
                <h3 className="font-bold text-lg">
                    Stock Market Leaders
                </h3>
            </div>

            <div className="p-4 flex-grow overflow-auto">
                <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                        Top Performers
                    </h4>
                    <div className="space-y-2">
                        {gainers &&
                            gainers
                                .slice(0, 3)
                                .map(
                                    (
                                        stock: StockData,
                                        index: number
                                    ) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                                        >
                                            <div className="text-xs text-gray-500">
                                                {stock.ticker}
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">
                                                    ${stock.price}
                                                </div>
                                                <div
                                                    className={`flex text-xs text-green-500`}
                                                >
                                                    ▲{' '}
                                                    {
                                                        stock.change_percentage
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                        {losers &&
                            losers
                                .slice(0, 3)
                                .map(
                                    (
                                        stock: StockData,
                                        index: number
                                    ) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                                        >
                                            <div className="text-xs text-gray-500">
                                                {stock.ticker}
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">
                                                    ${stock.price}
                                                </div>
                                                <div
                                                    className={`text-xs text-red-500`}
                                                >
                                                    ▼{' '}
                                                    {
                                                        stock.change_percentage
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                        {(!gainers || !losers) && (
                            <div className="text-gray-500 text-center">
                                Unable to fetch Stock Data
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center rounded-b-lg">
                Click for detailed analysis
            </div>
        </div>
    );
};

export default StocksWidget;
