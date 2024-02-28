import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import SignUp from '../pages/SignUp/SignUp';

function PageRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<HomePage />}/>
                <Route  path="/about" element={<About />}/>
                <Route  path="/sign-up" element={<SignUp />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;