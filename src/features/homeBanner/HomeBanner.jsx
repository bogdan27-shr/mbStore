import './HomeBanner.scss';

import arrowBackIcon from '../../assets/img/banners/arrowBack.svg';
import arrowNextIcon from '../../assets/img/banners/arrowNext.svg';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { bannerData } from './bannerData';


export default function HomeBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  function showNextSlide() {
    setActiveSlide((current) => (current + 1) % bannerData.length);
  }

  function showPrevSlide() {
    setActiveSlide(
      (current) => (current - 1 + bannerData.length) % bannerData.length
    );
  }

  useEffect(() => {
    const timer = setTimeout(showNextSlide, 7000);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  return (
    <section className="home-banner">
      <div className="home-banner__viewport">
        <div
          className="home-banner__track"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
          }}
        >
          {bannerData.map((slide, index) => (
            <div
              key={slide.id}
              className={`home-banner__slide ${
                index === 1 ? 'home-banner__slide--second' : ''
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="home-banner__content">
                <h1 className="home-banner__title">
                  {slide.title}
                </h1>

                <p className="home-banner__description">
                  {slide.description}
                </p>

                <Link
                  className="home-banner__button"
                  to={slide.link}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="home-banner__controls">
          <button
            className="home-banner__arrow"
            type="button"
            onClick={showPrevSlide}
            aria-label="Previous slide"
          >
            <img src={arrowBackIcon} alt="" />
          </button>

          <button
            className="home-banner__arrow"
            type="button"
            onClick={showNextSlide}
            aria-label="Next slide"
          >
            <img src={arrowNextIcon} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
}