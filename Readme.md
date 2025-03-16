# pgagi-nextjs

This is a (Next.js based) PGAGI Dashboard. It is a web application that allows users to view and manage their daily life. Whether it is about checking weather, managing tasks, or tracking stocks and some daily news, this application has got you covered.

![Dashboard Image](https://github.com/lovishGIT/pgagi-nextjs/tree/main/public/Dashboard.png)

## Ideation

This application was developed as a part of the PGAGI recruitment process. The idea was to create a dashboard that contains weather, stocks, news, etc. Goal was to use Next.js and Tailwind CSS to build the application. Using the APIs provided by the PGAGI team, the application was developed.

## Features

The application has the following features:

- **Weather:** Users can check the weather of their location.
- **Tasks:** Users can add, delete, and mark tasks as completed.
- **Stocks:** Users can track the stock prices of their favorite companies.
- **News:** Users can read the latest news.

## Getting Started

Follow these steps to run the application:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/pgagi-nextjs.git .
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file:**
    Create a `.env` file in the root directory of the project and add the necessary environment variables. Check the `.env.sample` for the same. For example:

    - Google Credentials = [GCP Console](https://console.cloud.google.com/)

    - OPENWEATHER_API_KEY = [Weather Api](https://home.openweathermap.org/api_keys)

    - ALPHAVANTAGE_API_KEY = [Stocks Api](https://www.alphavantage.co/support/#api-key)

    - NEWS_API_KEY = [News Api](https://newsapi.org/account)

4. **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Author

- [Lovish Bansal](https://lovishbansal.me)

