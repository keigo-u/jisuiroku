import "../js/bootstrap";
import "../css/app.css";
import React from "react";
import { createRoot } from 'react-dom/client';

const App = () => {
    const title: string = "Laravel 10 Vite with TypeScript React !!";
    return <div className="text-center text-2xl">{title}</div>;
};
const container = document.getElementById('app') as HTMLInputElement;
const root = createRoot(container);
root.render(<App />);