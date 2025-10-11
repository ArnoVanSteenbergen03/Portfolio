import { useState } from "react";

function ImageSlider({ images, projectTitle, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !images || images.length === 0) return null;

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  return (
    <div
      className="image-slider-overlay"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="image-slider">
        <button
          className="slider-close"
          onClick={onClose}
          aria-label="Close slider"
        >
          ✕
        </button>

        <div className="slider-content">
          <button
            className="slider-nav prev"
            onClick={goToPrevious}
            aria-label="Previous image"
            disabled={images.length <= 1}
          ></button>

          <div className="slider-image-container">
            <img
              src={images[currentImageIndex]}
              alt={`${projectTitle} - Image ${currentImageIndex + 1}`}
              className="slider-image"
            />
          </div>

          <button
            className="slider-nav next"
            onClick={goToNext}
            aria-label="Next image"
            disabled={images.length <= 1}
          ></button>
        </div>

        {images.length > 1 && (
          <div className="slider-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${
                  index === currentImageIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="slider-counter">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
