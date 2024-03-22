import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Overview from '../pages/Overview';
import PrivateRoute from '../components/PrivateRoute';
import Grades from '../pages/Grades.tsx';
import Students from '../pages/Student';

function PageRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<HomePage />}/>
                <Route  path="/about" element={<About />}/>
                <Route  path="/sign-up" element={<SignUp />}/>
                <Route  path="/sign-in" element={<SignIn />}/>
                <Route  path="/overview" element={
                    <PrivateRoute>
                        <Overview />
                    </PrivateRoute>
                }/>
                <Route  path="/grades" element={
                    <PrivateRoute>
                        <Grades />
                    </PrivateRoute>
                }/>
                <Route  path="/student/:name" element={
                    <PrivateRoute>
                        <Students />
                    </PrivateRoute>
                }/>
                
                <Route  path="*" element={<Navigate to={'/'} />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRouter;