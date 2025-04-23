import { Link } from "react-router-dom";

function NavBar({ isLoggedIn }) {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-around">
                <li>
                    <Link to="/" className="text-white hover:text-yellow-400">Home</Link>
                </li>

                {!isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/login" className="text-white hover:text-yellow-400">Login</Link>
                        </li>
                        <li>
                            <Link to="/signUp" className="text-white hover:text-yellow-400">Sign Up</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/dashboard" className="text-white hover:text-yellow-400">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/myClasses" className="text-white hover:text-yellow-400">My Classes</Link>
                        </li>
                        <li>
                            <Link to="/myEnrollments" className="text-white hover:text-yellow-400">My Enrollments</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
