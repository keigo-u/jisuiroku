import React from "react";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
            mutations: {
                retry: false
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
        <Router />
        </QueryClientProvider>
    );
};

export default App;