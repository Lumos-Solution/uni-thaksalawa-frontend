import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const isLoggedIn=localStorage.getItem("isLoggedIn");
    return (
        <nav className="bg-[#1E293B] p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                    <span className="text-white font-bold text-xl tracking-wide">
                        Uni-Thaksalawa
                    </span>
                </Link>

                {/* Hamburger Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white hover:text-teal-400 transition duration-200">
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Navigation Links */}
                <ul
                    className={`${
                        isOpen ? "block" : "hidden"
                    } md:flex md:items-center md:space-x-8 mt-4 md:mt-0 w-full md:w-auto bg-[#1E293B] md:bg-transparent md:static absolute left-0 top-16 p-4 md:p-0 z-50 rounded-b-lg shadow-md md:shadow-none`}
                >
                    {/* Mobile Close Button */}
                    <li className="md:hidden flex justify-end mb-2">
                        <button onClick={closeMenu} className="text-white hover:text-red-400 text-sm">
                            ✖ Close
                        </button>
                    </li>

                    <li>
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="block text-white hover:text-teal-400 transition duration-200"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/myClasses"
                            onClick={closeMenu}
                            className="block text-white hover:text-teal-400 transition duration-200"
                        >
                            My Classes
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/myEnrollments"
                            onClick={closeMenu}
                            className="block text-white hover:text-teal-400 transition duration-200"
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
                                    className="block text-white hover:text-teal-400 transition duration-200"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/signUp"
                                    onClick={closeMenu}
                                    className="block text-white hover:text-teal-400 transition duration-200"
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
                                    className="block text-white hover:text-teal-400 transition duration-200"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/notifications"
                                    onClick={closeMenu}
                                    className="block text-white hover:text-teal-400 transition duration-200"
                                >
                                    Notifications
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    onClick={closeMenu}
                                    className="block text-white hover:text-teal-400 transition duration-200"
                                >
                                    Profile
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
