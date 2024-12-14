import "./hamburger.css";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Squash as HamburgerIcon } from "hamburger-react";

export function Hamburger() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

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
				<div>Hello World</div>
			</Drawer>
		</>
	);
}
