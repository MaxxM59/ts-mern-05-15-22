import '../styles/globals.scss';
import type {AppProps} from 'next/app';
import {MantineProvider} from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';
import Head from 'next/head';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NextPage} from 'next';
import {ReactElement, ReactNode} from 'react';

const queryClient = new QueryClient();

// Extended Classes
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <title>Youtube Clone</title>
                <meta
                    name='viewport'
                    content='minimumscale=1, initial-scale=1,width=device-width'
                ></meta>
            </Head>
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{colorScheme: 'light'}}
            >
                <NotificationsProvider>
                    {getLayout(
                        <main>
                            <Component {...pageProps} />
                        </main>
                    )}
                </NotificationsProvider>
            </MantineProvider>
        </>
    );
}

export default MyApp;
