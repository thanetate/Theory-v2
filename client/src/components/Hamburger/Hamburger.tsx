import "./Hamburger.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Squash as HamburgerIcon } from "hamburger-react";

export function Hamburger() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	const navigate = useNavigate();
	const handleAboutClick = () => {
		navigate("/about");
	}
	const handleShopClick = () => {
		navigate("/collections");
	}
	const handleContactClick = () => {
		navigate("/contact");
	}
	return (
		<>
			<div className="hamburger-icn">
				<HamburgerIcon toggled={isOpen} toggle={toggleDrawer} size={25} />
			</div>
			<Drawer
				open={isOpen}
				onClose={toggleDrawer}
				direction="left"
				className="bla bla bla"
				size="100vw"
			>
				<div className="hamburger-nav">
					<button onClick={handleShopClick}>Shop</button>
					<button onClick={handleAboutClick}>About</button>
					<button onClick={handleContactClick}>Contact</button>
				</div>
			</Drawer>
		</>
	);
}
