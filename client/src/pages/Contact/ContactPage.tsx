import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import "./ContactPage.css";

export function ContactPage() {
	return (
		<>
			<PromoBar />
			<Header />
			<div className="contact-page">
				<h1>
					We are here to help you. If you have any questions, feel free to
					contact us at <span>thanetate1@gmail.com</span>
				</h1>
			</div>
			<Footer />
		</>
	);
}
