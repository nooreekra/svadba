import React from 'react';
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import './i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App lang="kz" />} />
                <Route path="/kz" element={<App lang="kz" />} />
                <Route path="/ru" element={<App lang="ru" />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
