import '@/styles/globals.css';
import {QueryClient, QueryClientProvider, Hydrate} from '@tanstack/react-query';
import type {AppProps} from 'next/app';

// Initialize the query client
const queryClient = new QueryClient();


export default function App({Component, pageProps : {dehydratedState}}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
      <Component client={queryClient}/>
      </Hydrate>
    </QueryClientProvider>
  );
}
