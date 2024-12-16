import "./Footer.css";
import { useNavigate } from "react-router-dom";

export function Footer() {
	const navigate = useNavigate();

	const handleHomeClick = () => {
		navigate("/");
	};
	const handleCollectionClick = () => {
		navigate("/collections");
	};
	const handleAboutClick = () => {
		navigate("/about");
	};
	const handleAccountClick = () => {
		navigate("/account");
	};
	return (
		<>
			<div className="line"></div>
			<footer className="footer">
				<div className="dir-container">
					<h1>Directory</h1>
					<button onClick={handleHomeClick}>Home</button>
					<button onClick={handleCollectionClick}>Collections</button>
					<button onClick={handleAboutClick}>About</button>
					<button onClick={handleAccountClick}>Log In / Sign Up</button>
				</div>
				<div className="contact-container">
					<h1>Contact</h1>
					<h2>Please contact thanetate1@gmail.com for any questions.</h2>
				</div>
				<div className="socialmedia-container">
                    <img src="./icons/instagram.svg" alt="Theory Instagram Icon" />
				</div>
			</footer>
                <div className="line"></div>
				<div className="createdby-container">
					<h2>Website Designed & Created by <span>Thane Tate</span></h2>
					<div className="icons-container">
						<img src="./icons/github.svg" alt="Theory Github Icon" />
						<img src="./icons/linkedin.svg" alt="Thane Tate LinkedIn Icon" />
					</div>
				</div>
				<div className="copyright-container">
					<h2>Copyright © 2024 - All rights reserved by Theory Climbing</h2>
				</div>
		</>
	);
}
