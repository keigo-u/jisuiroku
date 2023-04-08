import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            </ul>

        <hr />
            <Routes>
                <Route path={`/`} element={<Home />} /> 
                <Route path={`/about`} element={<About />} />
                <Route path={`/dashboard`} element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

function Home() {
    return(
        <div className="text-2xl">Home</div>
    );
}

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