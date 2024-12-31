import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { productAtom } from "../../atoms/productAtom";
import { fetchProductsAtom } from "../../atoms/productAtom";
import { useEffect } from "react";
import "./CollectionsPage.css";

export function CollectionsPage() {
	const [products] = useAtom(productAtom);
	const [, fetchProducts] = useAtom(fetchProductsAtom);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const navigate = useNavigate();

	const handleProductClick = (productId: number) => {
		navigate(`/collections/${productId}`); //change this later
	};
	return (
		<>
			<PromoBar />
			<Header />
			<div className="collections-header">
				<div className="num-of-products">
					{Array.isArray(products) ? products.length : 0} products
				</div>
			</div>
			<div className="collections-main">
				<div className="product-container">
					<div className="product-img-container">
						{Array.isArray(products) &&
							products.map((product, index) => (
								<div
									key={index}
									className="product-card"
									onClick={() => handleProductClick(product.id)}
								>
									<img src={product.image} className="product-img" />
									<div className="product-price">${product.price}.00</div>
								</div>
							))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
