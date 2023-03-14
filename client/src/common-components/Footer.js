import { Outlet, Link } from "react-router-dom"
import '../styles/general-styles/footer.css'

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-content">
                    <div className="footer-description">
                        <h1>Trophy Station</h1>
                        <p>Trophy station is a tournament organization platform where you can simply build your tournament and manage easily via different features. Our system allows you to create multiple number of tournament for free and there you can make your own brackets and gather your candidates in a one place and make it easy to getting approach to your tournament!</p>
                    </div>
                    <div className="footer-links">
                        <div>
                            <h1>Main Content</h1>
                            <ul>
                                <li>
                                    <Link to="/" className="link">Home</Link>
                                </li>
                                <li>
                                    <Link to="/" className="link">About</Link>
                                </li>
                                <li>
                                    <Link to="/" className="link">Games</Link>
                                </li>
                                <li>
                                    <Link to="/" className="link">Guide</Link>
                                </li>
                                <li>
                                    <Link to="/" className="link">Contact</Link>
                                </li>  
                            </ul>
                        </div>
                        <div>
                            <h1>Links</h1>
                            <Link to="/" className="footer-link-button">Sign in</Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="register-message to-be-hidden-when-logged">
                        <h2>Register for free</h2>
                        <div>
                            <Link to="/" className="footer-link-button sign-up">Sign Up</Link>
                        </div>   
                    </div>
                    <div className="footer-icon-container">
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-youtube"></i>
                        <i className="fa-brands fa-twitch"></i>
                        <i className="fa-brands fa-twitter+"></i>
                    </div>
                    <div className="rights">
                        <p><i className="fa-regular fa-copyright"></i> 2023 Copyright: www.trophystation.com</p>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Footer