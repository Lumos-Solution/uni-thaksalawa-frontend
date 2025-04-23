import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ isLoggedIn }) {
    const navigate = useNavigate();

    // This useEffect listens to any click on the page and redirects if not logged in
    useEffect(() => {
        const handleClick = () => {
            if (!isLoggedIn) {
                navigate("/login"); // Redirect to login page if not logged in
            }
        };

        // Attach the event listener to capture clicks anywhere on the page
        document.body.addEventListener("click", handleClick);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.body.removeEventListener("click", handleClick);
        };
    }, [isLoggedIn, navigate]);

    return (
        <div>
            <h1>Welcome to Home Page</h1>
            <p>This is the homepage. Click anywhere to be redirected to login if not logged in.</p>
        </div>
    );
}

export default HomePage;
