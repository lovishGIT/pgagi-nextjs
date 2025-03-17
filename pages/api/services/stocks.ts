import type { NextApiRequest, NextApiResponse } from 'next';

const fetchStocks = async () => {
    const response = await fetch(
        `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
    );
    const data = await response.json();
    return data;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // const { symbol } = req.query;

    // if (symbol && typeof symbol !== 'string') {
    //     res.status(400).json({ error: 'Invalid symbol parameter' });
    //     return;
    // }

    const stockData = await fetchStocks();

    if (stockData) {
        res.status(200).json(stockData);
    } else {
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
};

export default handler;
