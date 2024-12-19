import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import { useNavigate } from "react-router-dom";
import "./CollectionsPage.css";

const products = [
	{
	  image: "./example-product.webp",
	  alt: "Example Product",
	  price: "$ 100.00",
	},
	{
	  image: "./example-product.webp",
	  alt: "Example Product",
	  price: "$ 100.00",
	},
	{
	  image: "./example-product.webp",
	  alt: "Example Product",
	  price: "$ 100.00",
	},
  ];

export function CollectionsPage() {
	const navigate = useNavigate();

	const handleProductClick = () => {
		navigate("/product"); //change this later
	}

	return (
		<>
			<PromoBar />
			<Header />
			<div className="collections-header">
				<div className="num-of-products">{products.length} products</div>
			</div>
			<div className="collections-main">
				<div className="product-container">
					<div className="product-img-container">
						{products.map((product, index) => (
							<div key={index} className="product-card" onClick={handleProductClick}>
								<img src={product.image} alt={product.alt} className="product-img"/>
								<div className="product-price">{product.price}</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
