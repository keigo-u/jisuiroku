import "../js/bootstrap";
import "../css/app.css";
import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./app";
import('preline')

const container = document.getElementById('app') as HTMLInputElement;
const root = createRoot(container);
root.render(<App />);