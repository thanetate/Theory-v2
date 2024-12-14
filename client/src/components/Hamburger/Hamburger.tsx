import "./hamburger.css";
import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export function Hamburger() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<div>
			<button onClick={toggleDrawer}>Show</button>
			<Drawer
				open={isOpen}
				onClose={toggleDrawer}
				direction="left"
				className="bla bla bla"
			>
				<div>Hello World</div>
			</Drawer>
		</div>
	);
}
