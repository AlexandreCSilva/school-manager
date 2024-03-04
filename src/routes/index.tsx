import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/PrivateRoute';

function PageRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<HomePage />}/>
                <Route  path="/about" element={<About />}/>
                <Route  path="/sign-up" element={<SignUp />}/>
                <Route  path="/sign-in" element={<SignIn />}/>
                <Route  path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }/>
                <Route  path="*" element={<HomePage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;