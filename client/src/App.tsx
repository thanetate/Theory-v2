import "./App.css";
import { About } from "./components/About/About";
import { Carousel } from "./components/Carousel/Carousel";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { PromoBar } from "./components/PromoBar/PromoBar";
import { Shop } from "./components/Shop/Shop";
import { useAtom } from "jotai";
import { getAllProducts } from "./atoms/productAtom";
import { useEffect } from "react";

function App() {

	const [, fetchProducts] = useAtom(getAllProducts);

    useEffect(() => {
        fetchProducts().then(() => {
            console.log("Products fetched successfully:");
        });
    }, [fetchProducts]);

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
