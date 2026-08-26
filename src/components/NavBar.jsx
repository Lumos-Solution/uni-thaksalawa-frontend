import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, UserCircle, X } from "lucide-react";
import { signOut } from "../auth/authService";
import { API_BASE_URL } from "../auth/apiClient";

function NavBar({ isLoggedIn, setIsLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const profilePic = localStorage.getItem("profilePic");

    /*
     * The server stores only the bare upload filename (see UserController), so it
     * has to be turned into a URL against the API host - a bare filename would
     * otherwise resolve against the frontend origin and 404.
     */
    const avatarUrl = !profilePic
        ? null
        : /^(https?:|blob:|data:)/.test(profilePic)
            ? profilePic
            : `${API_BASE_URL}/uploads/profilePics/${profilePic}`;

    const handleLogout = () => {
        signOut();
        setIsLoggedIn(false);
        closeMenu();
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#1E293B] p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/logo.svg" alt="Uni-තක්සලාව logo" className="h-8 w-8" />
                    <span className="text-white font-bold text-xl tracking-wide">
                        Uni-තක්සලාව
                    </span>
                </Link>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white hover:text-teal-400 transition duration-200">
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                <ul
                    className={`${
                        isOpen ? "block" : "hidden"
                    } md:flex md:items-center md:space-x-8 mt-4 md:mt-0 w-full md:w-auto bg-[#1E293B] md:bg-transparent md:static absolute left-0 top-16 p-4 md:p-0 z-50 rounded-b-lg shadow-md md:shadow-none`}
                >
                    <li className="md:hidden flex justify-end mb-2">
                        <button onClick={closeMenu} className="text-white hover:text-red-400 text-sm">
                        </button>
                    </li>

                    <li>
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="block text-white hover:text-teal-400 transition duration-200 font-medium tracking-wide"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/myClasses"
                            onClick={closeMenu}
                            className="block text-white hover:text-teal-400 transition duration-200 font-medium tracking-wide"
                        >
                            My Classes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/myEnrollments"
                            onClick={closeMenu}
                            className="block text-white hover:text-teal-400 transition duration-200 font-medium tracking-wide"
                        >
                            My Enrollments
                        </Link>
                    </li>

                    {!isLoggedIn ? (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="block text-white hover:text-teal-400 transition duration-200 font-medium tracking-wide"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signUp"
                                    onClick={closeMenu}
                                    className="block text-white hover:text-teal-400 transition duration-200 font-medium tracking-wide"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/dashboard"
                                    onClick={closeMenu}
                                    className="block text-white hover:text-teal-400 transition duration-200 font-medium tracking-wide"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/notifications"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 text-white hover:text-teal-400 transition duration-200 font-medium tracking-wide"
                                >
                                    <Bell size={20} aria-hidden="true" />
                                    <span>Notifications</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 text-white hover:text-teal-400 transition duration-200 font-medium tracking-wide"
                                >
                                    {avatarUrl && !avatarFailed ? (
                                        <img
                                            src={avatarUrl}
                                            alt=""
                                            onError={() => setAvatarFailed(true)}
                                            className="h-7 w-7 rounded-full object-cover ring-2 ring-teal-400/70"
                                        />
                                    ) : (
                                        <UserCircle size={24} aria-hidden="true" />
                                    )}
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="block text-white hover:text-red-400 transition duration-200 font-medium tracking-wide"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
