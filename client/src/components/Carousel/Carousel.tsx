import "./Carousel.css";

export function Carousel() {
	return (
		<>
			<div className="carousel-container">
				<div className="carousel-img"></div>
				<div className="carousel-btn-container">
					<button className="carousel-btn">
						<img src="./icons/leftarrow.svg" alt="Left Arrow" />
					</button>
					<div className="carousel-circle">
						<img src="./icons/circle.svg" alt="Circle" />
					</div>
					<div className="carousel-circle">
						<img src="./icons/circle.svg" alt="Circle" />
					</div>
					<div className="carousel-circle">
						<img src="./icons/circle.svg" alt="Circle" />
					</div>
					<div className="carousel-circle">
						<img src="./icons/circle.svg" alt="Circle" />
					</div>
					<div className="carousel-circle">
						<img src="./icons/circle.svg" alt="Circle" />
					</div>
					<button className="carousel-btn">
						<img src="./icons/rightarrow.svg" alt="Right Arrow" />
					</button>
				</div>
			</div>
		</>
	);
}
