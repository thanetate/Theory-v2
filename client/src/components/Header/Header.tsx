import { Hamburger } from "../Hamburger/Hamburger";
import "./Header.css";

export function Header() {
	return (
		<div className="header">
			<div className="small-nav">
				<Hamburger />
			</div>
		</div>
	);
}
