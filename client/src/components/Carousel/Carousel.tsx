import "./Carousel.css";
import { useState } from "react";

const images = [
	"./Carousel2.png",
	"./Carousel6.png",
	"./Carousel4.png",
	"./Carousel3.png",
	"./Carousel1.png",
	"./Carousel5.png",
];

export function Carousel() {
	const [currentImage, setCurrentImage] = useState(0);

	const handlePrevClick = () => {
		setCurrentImage((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};
	const handleNextClick = () => {
		setCurrentImage((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="carousel-outter-container">
			<div className="carousel-container">
				<div className="carousel-img">
					<img src={images[currentImage]} alt="Carousel" />
				</div>
				<div className="carousel-btn-container">
					<button className="carousel-btn" onClick={handlePrevClick}>
						<img src="/icons/leftarrow.svg" alt="Left Arrow" />
					</button>
					{images.map((_, index) => (
						<div
							key={index}
							className={`carousel-circle ${
								index === currentImage ? "active" : ""
							}`}
						>
							<img src="/icons/circle.svg" alt="Circle" />
						</div>
					))}
					<button className="carousel-btn" onClick={handleNextClick}>
						<img src="/icons/rightarrow.svg" alt="Right Arrow" />
					</button>
				</div>
			</div>
		</div>
	);
}
