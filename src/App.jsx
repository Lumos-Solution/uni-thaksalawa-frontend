import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from "react-router-dom";
import {useState, useEffect} from "react";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import MyclassesPage from "./pages/MyClassesPage.jsx";
import NavBar from "./components/NavBar.jsx";
import MyEnrollmentsPage from "./pages/MyEnrollmentsPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Footer from "./components/Footer.jsx";
import { hasValidSession } from "./auth/tokenStorage.js";

function App() {

    // A session exists only if a non-expired JWT is stored - a leftover
    // "isLoggedIn" flag is no longer enough to get past a protected route.
    const [isLoggedIn, setIsLoggedIn] = useState(hasValidSession);

    useEffect(() => {
        localStorage.setItem("isLoggedIn", isLoggedIn.toString());
    }, [isLoggedIn]);

    const ProtectedRoute = ({children}) => {
        return isLoggedIn ? children : <Navigate to="/login"/>;
    };

    const UserLayout = () => (
        <div className="flex flex-col min-h-screen">
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer isLoggedIn={isLoggedIn} />
        </div>
    );

    return (
        <Router>
            <Routes>

                <Route element={<UserLayout/>}>
                    <Route path="/" element={<HomePage isLoggedIn={isLoggedIn}/>}/>
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
                    <Route path="/myClasses" element={<ProtectedRoute><MyclassesPage/></ProtectedRoute>}/>
                    <Route path="/myEnrollments" element={<ProtectedRoute><MyEnrollmentsPage/></ProtectedRoute>}/>
                    <Route path="/notifications" element={<ProtectedRoute><NotificationPage/></ProtectedRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>

                </Route>

                <Route path="/login" element={<SignInPage setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
