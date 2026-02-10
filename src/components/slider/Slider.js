import './slider.css'
import { useCallback, useEffect, useRef, useState } from "react";

const Slider = ({
    slides = [],
    autoplayDelay = 3000,
    showDots = true,
    showArrows = true,
    infinite = true
}) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [direction, setDirection] = useState('next');

    const autoplayRef = useRef(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Переход к следующему слайду
    const goToNext = useCallback(() => {
        setDirection('next');
        setCurrentIndex((prevIndex) =>
            infinite
                ? (prevIndex + 1) % slides.length
                : Math.min(prevIndex + 1, slides.length - 1)
        )
    }, [slides.length, infinite])

    // Переход к предыдущему слайду
    const goToPrevious = useCallback(() => {
        setDirection('prev');
        setCurrentIndex((prevIndex) =>
            infinite
                ? (prevIndex - 1 + slides.length) % slides.length
                : Math.max(prevIndex - 1, 0)
        )
    }, [slides.length, infinite])

    // Переход к конкретному слайду
    const goToSlide = useCallback((index) => {
        setDirection(index > currentIndex ? 'next' : 'prev')
        setCurrentIndex(index)
    }, [currentIndex])

    // Автоплей
    useEffect(() => {
        if(!autoplay || slides.length <= 1) return;

        autoplayRef.current = setInterval(()=>{
            goToNext()
        }, autoplayDelay)

        return () => {
            if(autoplayRef.current) {
                clearInterval(autoplayRef.current)
            }
        }
    }, [autoplay, autoplayDelay, goToNext, slides.length ])

    // Пауза автоплея при наведении
    const handleMouseEnter = () => setAutoplay(false);
    const handleMouseLeave = () => setAutoplay(true)

    // Touch события для свайпа
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
        const diff = touchStartX.current - touchEndX.current;
        const minSwiperDistance = 50;

        if(Math.abs(diff) > minSwiperDistance) {
            if (diff> 0) {
                goToNext()
            } else {
                goToPrevious()
            }
        }
    }
    
    // Клавиатурная навигация
    useEffect(() => {
        const handleKeydown = (e) => {
            if(e.key === 'ArrowLeft') goToPrevious();
            if(e.key === 'ArrowRight') goToNext();
        }

        window.addEventListener('keydown', handleKeydown)

        return() => window.removeEventListener('keydown', handleKeydown)
    }, [goToNext, goToPrevious])

    return (
        <div className="slider"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="slider-wrapper">
                <div className="slider-content"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id || index}
                            className={`slide ${index === currentIndex ? 'active' : ''} ${direction}`}>
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="slide-image"
                            />
                            {slide.title && (
                                <div className="slide-content">
                                    <h2 className="slide-title">{slide.title}</h2>
                                    {slide.description && (
                                        <p className="slide-description">{slide.description}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {showArrows && slides.length > 1 && (
                <>
                    <button
                        className="slider-button prev"
                        onClick={goToPrevious}
                        aria-label="Previous slide"
                        disabled={!infinite && currentIndex === 0}
                    >
                        ‹
                    </button>
                    <button
                        className="slider-button next"
                        onClick={goToNext}
                        aria-label="Next slide"
                        disabled={!infinite && currentIndex === slides.length - 1}
                    >
                        ›
                    </button>
                </>
            )}
            {showDots && slides.length > 1 && (
                <div className="slider-dots">
                    {slides.map((_, index) => (
                        <button
                            className={index === currentIndex ? 'dot active' : 'dot'}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            key={index}
                        />
                    ))}
                </div>
            )}
            <div className="slider-counter">
                {currentIndex + 1} / {slides.length}
            </div>
        </div>
    )
}

export default Slider;