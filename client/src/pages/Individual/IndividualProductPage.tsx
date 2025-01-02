import "./IndividualProductPage.css";
import "../../components/Carousel/Carousel.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { singleProductAtom } from "../../atoms/productAtom";
import { fetchProductById } from "../../atoms/productAtom";
import { useParams } from "react-router-dom";
import { PromoBar } from "../../components/PromoBar/PromoBar";
import { sessionIdAtom } from "../../atoms/userAtom";
import { addToCartAtom } from "../../atoms/cartAtom";
import { useNavigate } from "react-router-dom";

export function IndividualProductPage() {
	const { productId } = useParams<{ productId: string }>();
	const [product] = useAtom(singleProductAtom);
	const [, fetchProduct] = useAtom(fetchProductById);
	const [sessionId] = useAtom(sessionIdAtom);
	console.log("Session id in atom: ", sessionId);
	const [size, setSize] = useState("x-small");
	const [addToCart] = useAtom(addToCartAtom);
	const navigate = useNavigate();

	useEffect(() => {
		if (productId) {
			fetchProduct({ productId: Number(productId) });
		}
	}, [fetchProduct, productId]);

	const handlePrevClick = () => {};
	const handleNextClick = () => {};
	const [quantity, setQuantity] = useState(1);

	const handleQuantityChange = (amount: number) => {
		setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
	};

	const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSize(event.target.value);
	};

	const handleAddToCart = () => {
		if (!sessionId) {
			navigate("/account");
		}
		else {
			if (product) {
				addToCart(product, quantity, size);
			}
		}
	}

	if (!product) {
		return <div>Loading...</div>;
	}

	console.log("Session ID", sessionId);

	return (
		<>
			<PromoBar />
			<Header />
			<div className="product-page-container">
				<div className="leftside">
					<div className="i-product-img-container">
						<img
							src={product.image}
							alt="Product Image"
							className="i-product-img"
						/>
					</div>
					<div className="extra-img-container">
						{/* todo: make buttons dynamic */}
						<img
							src="/example-product.webp"
							alt="Product Image"
							className="extra-img"
						/>
						<img
							src="/example-product.webp"
							alt="Product Image"
							className="extra-img"
						/>
					</div>
					<div className="carousel-btn-container">
						<button className="carousel-btn" onClick={handlePrevClick}>
							<img src="/icons/leftarrow.svg" alt="Left Arrow" />
						</button>
						<button className="carousel-btn" onClick={handleNextClick}>
							<img src="/icons/rightarrow.svg" alt="Right Arrow" />
						</button>
					</div>
				</div>
				<div className="rightside">
					<div className="i-product-info">
						<h1>{product.name}</h1>
						<h3 className="price">${product.price}.00 USD</h3>
						<p> Shipping calculated at checkout.</p>
						<div className="size">
							<h2>Size</h2>
							<select
								name="size"
								className="size-container"
								onChange={handleSizeChange}
							>
								<option value="x-small">X-Small</option>
								<option value="small">Small</option>
								<option value="medium">Medium</option>
								<option value="large">Large</option>
								<option value="x-large">X-Large</option>
							</select>
						</div>
						<div className="quantity">
							<h2>Quantity</h2>
							<div className="quantity-box">
								<button onClick={() => handleQuantityChange(-1)}>-</button>
								<input
									type="text"
									value={quantity}
									readOnly
									className="quantity-input"
								/>
								<button onClick={() => handleQuantityChange(1)}>+</button>
							</div>
						</div>
						<div className="checkout">
							<button onClick={handleAddToCart}>
								Add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
