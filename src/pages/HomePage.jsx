import { useNavigate } from "react-router-dom";
import '../components/tailwindStyles';

function HomePage({ isLoggedIn }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">Uniතක්සලාව</div>
                <div className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Subjects</a>
                    <a href="#">Contact</a>
                </div>
                <div className="auth-buttons">
                    <button className="btn btn-outline" onClick={handleLogin}>Log In</button>
                    <button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <h1>Find the Perfect Tutor Near You</h1>
                    <p className="description">
                        Uniතක්සලාව connects students with qualified tutors in their area.
                        Get personalized learning support from experts in various subjects and improve your academic performance.
                    </p>
                </div>
                <div className="cta-container">
                    <a href="#" className="cta-button">
                        <span className="globe-icon">🌐</span>
                        Find Your Tutor
                    </a>
                </div>
                <div className="hero-image">
                    <img src="/api/placeholder/500/400" alt="Students learning with tutors" />
                </div>
            </section>

            <section className="features">
                <div className="features-container">
                    <div className="features-heading">
                        <h2>Why Choose Uniතක්සලාව?</h2>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📍</div>
                            <h3>Local Tutors</h3>
                            <p>Find qualified tutors in your neighborhood for in-person or online sessions.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📚</div>
                            <h3>All Subjects</h3>
                            <p>Get help with math, science, languages, humanities, and more.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⭐</div>
                            <h3>Verified Experts</h3>
                            <p>All tutors are screened and verified for qualifications and experience.</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2025 Uniතක්සලාව. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
