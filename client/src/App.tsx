import "./App.css";
import { About } from "./components/About/About";
import { Carousel } from "./components/Carousel/Carousel";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { PromoBar } from "./components/PromoBar/PromoBar";
import { Shop } from "./components/Shop/Shop";
import axios from "axios";
import { useEffect } from "react";

function App() {
	//custom hook
	useEffect(() => {
		axios
			.get("http://localhost:5255/weatherforecast/")
			.then((response) => {
				console.log(response.data); // Log the weather forecast data to the console
			})
			.catch((error) => {
				console.error("There was an error fetching the weather data!", error);
			});
	}, []);

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
