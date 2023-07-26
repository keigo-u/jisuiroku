import React from "react";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./hooks/AuthContext";
import { HelmetProvider } from 'react-helmet-async'

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
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <HelmetProvider>
                    <Router />
                    <ToastContainer hideProgressBar={true} />
                </HelmetProvider>
            </QueryClientProvider>
        </AuthProvider>
    );
};

export default App;