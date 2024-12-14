import Marquee from "react-fast-marquee";
import "./PromoBar.css";

export function PromoBar() {
	return (
		<div className="promo-bar">
			<Marquee>
				  <span className="marquee-text">Free shipping on orders over $100</span>
			</Marquee>
		</div>
	);
}
