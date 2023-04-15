import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import HomePage from "./pages/home/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <div className="bg-gray-50 dark:bg-slate-900">
                <Sidebar />
                
                {/* Main Content */}
                <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72">
                    <Routes>
                        <Route path={`/`} element={<HomePage />} /> 
                        <Route path={`/share`} element={<About />} />
                        <Route path={`/mypage`} element={<Dashboard />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

function About() {
    return(
        <div className="text-2xl">About</div>
    );
}

function Dashboard() {
    return(
        <div className="text-2xl">Dashboard</div>
    );
}

export default Router;