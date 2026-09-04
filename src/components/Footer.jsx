import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ isLoggedIn }) => {
    // Mirrors the NavBar tabs so the footer stays a usable second entry point
    // to every route the current visitor is actually allowed to open.
    const publicTabs = [
        { to: "/", label: "Home" },
        { to: "/myClasses", label: "My Classes" },
        { to: "/myEnrollments", label: "My Enrollments" },
    ];

    const guestTabs = [
        { to: "/login", label: "Login" },
        { to: "/signUp", label: "Sign Up" },
    ];

    const memberTabs = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/notifications", label: "Notifications" },
        { to: "/profile", label: "Profile" },
    ];

    const tabs = [...publicTabs, ...(isLoggedIn ? memberTabs : guestTabs)];

    return (
        <footer className="bg-[#0F172A] text-gray-300 py-4 border-t border-gray-700 mt-auto w-full">
            <div className="container mx-auto px-4 flex flex-col items-center sm:flex-row sm:items-start sm:justify-center gap-x-32 md:gap-x-48 gap-y-4 text-xs">
                <nav aria-label="Footer">
                    <ul className="flex flex-col gap-y-1 items-center sm:items-start">
                        {tabs.map(({ to, label }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 font-medium tracking-wide"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex flex-col gap-y-1 items-center sm:items-start">
                    <p className="font-semibold text-white">© {new Date().getFullYear()} Uni-තක්සලාව</p>
                    <p className="text-gray-400">Developed by Lumos Solutions</p>
                    <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors duration-200">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
