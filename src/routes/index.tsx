import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from '../pages/HomePage';
import About from '../pages/About';

function PageRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<HomePage />}/>
                <Route  path="/about" element={<About />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;