import "./App.css";
import { About } from "./components/About/About";
import { Carousel } from "./components/Carousel/Carousel";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { PromoBar } from "./components/PromoBar/PromoBar";
import { Shop } from "./components/Shop/Shop";
import { useAtom } from "jotai";
import { sessionIdAtom } from "./atoms/userAtom";

function App() {

	const [sessionId] = useAtom(sessionIdAtom);

	console.log("Session Id (atom): ", sessionId);

	return (
		<>
			<PromoBar />
			<Header />
			<Carousel />
			<About />
			<Shop />
			<Footer />
		</>
	);
}

export default App;
