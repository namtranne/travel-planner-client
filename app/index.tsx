import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 5 * 1000
        }
    }
});

export default function Index() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}
