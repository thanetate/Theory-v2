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
import toast from "react-hot-toast";
//import ClipLoader from "react-spinners/ClipLoader";

export function IndividualProductPage() {
	const { productId } = useParams<{ productId: string }>();
	const [product] = useAtom(singleProductAtom);
	const [, fetchProduct] = useAtom(fetchProductById);
	const [sessionId] = useAtom(sessionIdAtom);
	console.log("Session Id (Atom): ", sessionId);
	const [size, setSize] = useState("small");
	const [addToCart] = useAtom(addToCartAtom);
	const navigate = useNavigate();
	const [displayPrice, setDisplayPrice] = useState<number | null>(null);

	useEffect(() => {
		if (product) {
			setDisplayPrice(product.price);
		}
	}, [product]);

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
		const selectedSize = event.target.value;
		setSize(selectedSize);
	
		if (product) {
			// Example price adjustment logic:
			if (selectedSize === "large") {
				setDisplayPrice(product.price + 10); // Adjust by +$10 for large
			} else {
				setDisplayPrice(product.price); // Default price for small
			}
		}
	};

	const handleAddToCart = () => {
		if (!sessionId) {
			navigate("/account");
		} else {
			if (product) {
				const updatedProduct = { ...product };
				
				if (size === "large") {
					updatedProduct.price = product.price + 10;
				}

				toast.success("Added to cart");
				console.log('CART', updatedProduct);
				addToCart(updatedProduct, quantity, size);
			}
		}
	};

	if (!product) {
		return (
			<>
				<div className="spinner-container">
					{/* <ClipLoader
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/> */}
				</div>
			</>
		);
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
					{/* <div className="extra-img-container">
						<img
							src="/example-product.png"
							alt="Product Image"
							className="extra-img"
						/>
						<img
							src="/example-product.png"
							alt="Product Image"
							className="extra-img"
						/>
					</div> */}
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
						{/* <h3 className="price">${product.price}.00 USD</h3> */}
						<h3 className="price">${displayPrice !== null ? displayPrice.toFixed(2) : product.price.toFixed(2)} USD</h3>
						<p>{product.description}</p>
						<p> Shipping calculated at checkout.</p>
						<div className="size">
							<h2>Size</h2>
							<select
								name="size"
								className="size-container"
								onChange={handleSizeChange}
							>
								{/* <option value="x-small">X-Small</option> */}
								<option value="small">12" x 15"</option>
								{/* <option value="medium">Medium</option> */}
								<option value="large">16" x 20"</option>
								{/* <option value="x-large">X-Large</option> */}
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
							<button onClick={handleAddToCart}>Add to cart</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
