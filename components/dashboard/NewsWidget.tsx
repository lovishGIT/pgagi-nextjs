import React, { useState } from 'react';
import Link from 'next/link';

interface NewsArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

interface NewsWidgetProps {
    newsData: {
        articles: NewsArticle[];
        status: string;
        totalResults: number;
    };
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ newsData }) => {
    const [activeCategory, setActiveCategory] = useState('business');
    const categories = [
        'business',
        'technology',
        'health',
        'science',
        'sports',
    ];

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString(
            undefined,
            options
        );
    };

    // Get the first 4 articles
    const displayedArticles = newsData?.articles?.slice(0, 4) || [];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-bold mb-2 sm:mb-0">
                    Latest News
                </h2>
                <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() =>
                                setActiveCategory(category)
                            }
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                activeCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {newsData?.status === 'error' ? (
                <div className="py-4 text-center text-gray-500">
                    Unable to load news articles at this time.
                </div>
            ) : displayedArticles.length === 0 ? (
                <div className="py-4 text-center text-gray-500">
                    No articles available.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedArticles.map((article, index) => (
                        <div
                            key={index}
                            className="border rounded-lg overflow-hidden flex flex-col"
                        >
                            <div className="h-48 bg-gray-100 relative">
                                {article.urlToImage ? (
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${article.urlToImage})`,
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        No Image Available
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs text-gray-500">
                                        {article.source.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {formatDate(
                                            article.publishedAt
                                        )}
                                    </span>
                                </div>
                                <h3 className="font-semibold mb-2 line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                    {article.description ||
                                        'No description available.'}
                                </p>
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                    Read full article
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 text-center">
                <Link href="/news" className="inline-block px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        View all news
                </Link>
            </div>
        </div>
    );
};

export default NewsWidget;
