import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import MyclassesPage from "./pages/MyClassesPage.jsx";
import NavBar from "./components/NavBar.jsx";
import MyEnrollmentsPage from "./pages/MyEnrollmentsPage.jsx";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem("isLoggedIn") === "true";
    });

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    }, [isLoggedIn]);

    const ProtectedRoute = ({ children }) => {
        return isLoggedIn ? children : <Navigate to="/login" />;
    };

    const UserLayout = () => (
        <div>
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Outlet />
        </div>
    );

    return (
        <Router>
            <Routes>
                <Route element={<UserLayout />}>
                    <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/myClasses" element={<MyclassesPage />} />

                    <Route path="/myEnrollments" element={<ProtectedRoute><MyEnrollmentsPage /></ProtectedRoute>} />
                </Route>

                <Route path="/login" element={<SignInPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signUp" element={<SignUpPage />} />
            </Routes>
        </Router>
    );
}

export default App;
