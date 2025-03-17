import type { NextApiRequest, NextApiResponse } from 'next';

const fetchNews = async (
    category: string = 'business',
    limit: number = 4
) => {
    const response = await fetch(
        `https://newsapi.org/v2/everything?q=${category}&apiKey=${process.env.NEWS_API_KEY}&pageSize=${limit}`
    );
    const data = await response.json();
    return data.articles;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { category, limit } = req.query;
    try {
        const articles = await fetchNews(category as string , parseInt(limit as string));
        res.status(200).json({ articles });
    } catch (err) {
        console.warn("Error at news service api: ", err);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
};

export default handler;