import React from 'react';
import { useRouter } from 'next/router';

interface StockData {
    'Global Quote'?: {
        '01. symbol': string;
        '02. open': string;
        '03. high': string;
        '04. low': string;
        '05. price': string;
        '09. change': string;
        '10. change percent': string;
    };
    sampleData?: {
        userStocks: {
            symbol: string;
            name: string;
            price: number;
            change: number;
            changePercent: string;
        }[];
        topStocks: {
            symbol: string;
            name: string;
            price: number;
            change: number;
            changePercent: string;
        }[];
    };
}

interface StocksWidgetProps {
    stocksData: StockData;
}

const StocksWidget: React.FC<StocksWidgetProps> = ({
    stocksData,
}) => {
    const router = useRouter();

    const sampleData = {
        userStocks: [
            {
                symbol: 'AAPL',
                name: 'Apple Inc.',
                price: 145.85,
                change: 0.23,
                changePercent: '+0.16%',
            },
            {
                symbol: 'MSFT',
                name: 'Microsoft',
                price: 287.7,
                change: -1.35,
                changePercent: '-0.47%',
            },
            {
                symbol: 'GOOGL',
                name: 'Alphabet',
                price: 2732.38,
                change: 12.25,
                changePercent: '+0.45%',
            },
        ],
        topStocks: [
            {
                symbol: 'NVDA',
                name: 'NVIDIA',
                price: 195.2,
                change: 5.8,
                changePercent: '+3.06%',
            },
            {
                symbol: 'AMZN',
                name: 'Amazon',
                price: 3335.55,
                change: 16.75,
                changePercent: '+0.50%',
            },
        ],
    };

    const data = stocksData.sampleData || sampleData;

    return (
        <div
            className="bg-white text-black rounded-lg shadow h-full flex flex-col cursor-pointer"
            onClick={() => router.push('/stocks')}
        >
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
                <h3 className="font-bold text-lg">Stock Portfolio</h3>
                <p className="text-sm text-purple-100">
                    Your stocks vs market leaders
                </p>
            </div>

            <div className="p-4 flex-grow overflow-auto">
                <div className="mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                        Your Portfolio
                    </h4>
                    <div className="space-y-2">
                        {data.userStocks.map((stock) => (
                            <div
                                key={stock.symbol}
                                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                            >
                                <div>
                                    <div className="font-medium">
                                        {stock.symbol}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {stock.name}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">
                                        ${stock.price.toFixed(2)}
                                    </div>
                                    <div
                                        className={`text-xs ${
                                            stock.change >= 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }`}
                                    >
                                        {stock.change >= 0
                                            ? '▲'
                                            : '▼'}{' '}
                                        {stock.changePercent}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                        Top Performers
                    </h4>
                    <div className="space-y-2">
                        {data.topStocks.map((stock) => (
                            <div
                                key={stock.symbol}
                                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
                            >
                                <div>
                                    <div className="font-medium">
                                        {stock.symbol}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {stock.name}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">
                                        ${stock.price.toFixed(2)}
                                    </div>
                                    <div
                                        className={`text-xs ${
                                            stock.change >= 0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }`}
                                    >
                                        {stock.change >= 0
                                            ? '▲'
                                            : '▼'}{' '}
                                        {stock.changePercent}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center">
                Click for detailed analysis
            </div>
        </div>
    );
};

export default StocksWidget;
