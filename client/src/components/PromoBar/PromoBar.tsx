import Marquee from "react-fast-marquee";
import "./PromoBar.css";

export function PromoBar() {
	return (
		<>
		<div className="promo-bar">
		<div style={{ backgroundColor: "#1C1C1C" , padding: "5px 0"}}>
			<Marquee>
				  <span className="marquee-text">🚨 This site is currently under construction 🚨</span>
				  <span className="marquee-text">🚨 This site is currently under construction 🚨</span>
				  <span className="marquee-text">🚨 This site is currently under construction 🚨</span>
				  <span className="marquee-text">🚨 This site is currently under construction 🚨</span>
				  <span className="marquee-text">🚨 This site is currently under construction 🚨</span>
				  <span className="marquee-text">🚨 This site is currently under construction 🚨</span>
				  <span className="marquee-text">🚨 This site is currently under construction 🚨</span>
				  <span className="marquee-text">🚨 This site is currently under construction 🚨</span>
			</Marquee>
			</div>
		</div>
		</>
	);
}
