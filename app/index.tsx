import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect } from 'expo-router';

import ProtectedRoute from '@/src/components/Auth/ProtectedRoute';

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
            <ProtectedRoute>
                <Redirect href="home-tabs" />
            </ProtectedRoute>
        </QueryClientProvider>
    );
}
