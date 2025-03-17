import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Layout from '@/components/global/Layout';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <SessionProvider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </Provider>
    );
};