import Marquee from "react-fast-marquee";
import "./PromoBar.css";

export function PromoBar() {
	return (
		<>
		<div className="promo-bar">
		<div style={{ backgroundColor: "#1C1C1C" , padding: "5px 0"}}>
			<Marquee>
				  <span className="marquee-text">Free shipping on orders over $100</span>
				  <span className="marquee-text">Free shipping on orders over $100</span>
				  <span className="marquee-text">Free shipping on orders over $100</span>
				  <span className="marquee-text">Free shipping on orders over $100</span>
				  <span className="marquee-text">Free shipping on orders over $100</span>
				  <span className="marquee-text">Free shipping on orders over $100</span>
				  <span className="marquee-text">Free shipping on orders over $100</span>
			</Marquee>
			</div>
		</div>
		</>
	);
}
