import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from '../pages/HomePage/HomePage';
import About from '../pages/About/About';
import SignUp from '../pages/SignUp/Register';

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