import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import "./AboutPage.css";

export function AboutPage() {
	return (
		<>
			<PromoBar />
			<Header />
			<div className="about-page">
				<div className="aboutpage-img-container">
					<img
						src="./Carousel1.png"
						alt="About Us Image"
						className="aboutpage-img"
					/>
				</div>
				<div className="aboutpage-desc-container">
					<h1 className="aboutpage-desc">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
						mollitia sequi similique asperiores pariatur doloribus, enim aliquid
						quisquam temporibus accusamus sint quo cum ipsam officiis, dolore
						libero, cupiditate maxime eaque.
					</h1>
				</div>
			</div>
			<Footer />
		</>
	);
}
