
import { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import useMountAnimation from '../../hooks/useMountAnimation'
import useSmoothScroll from '../../hooks/useSmoothScroll'

import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import slide1 from '../../assets/images/slide1.png'
import slide2 from '../../assets/images/slide2.png'
import slide3 from '../../assets/images/slide3.png'

import './Hero.css'

export default function Hero() {
  const sectionRef = useRef(null)

  useMountAnimation(sectionRef)

  const { scrollToSection } = useSmoothScroll()
  const { language } = useLanguage()

  const t = translations[language]

  const slides = [
    slide1,
    slide2,
    slide3,
  ]

  const delay = (time) => ({
    '--delay': time,
  })

  return (
    <section
      ref={sectionRef}
      className="hero"
      id="hero"
    >
      <div className="hero-inner">

        {/* LEFT */}
        <div className="hero-content">

          <p
            className="hero-intro fade-in-up"
            style={delay('0.2s')}
          >
            {t.heroTitle}
          </p>

          <h1
            className="hero-heading fade-in-up"
            style={delay('0.4s')}
          >
            Konul Samadova
          </h1>

          <p
            className="hero-copy fade-in-up"
            style={delay('0.6s')}
          >
            {t.heroSubtitle}
          </p>

          <div
            className="hero-actions fade-in-up"
            style={delay('0.8s')}
          >

            <button
              className="btn-primary"
              onClick={() => scrollToSection('contact')}
            >
              {t.startProject}
            </button>

            <button
              className="btn-ghost"
              onClick={() => scrollToSection('projects')}
            >
              {t.viewWorks}
            </button>

          </div>
        </div>

        {/* RIGHT */}
        <div
          className="hero-right fade-in-up"
          style={delay('1s')}
        >

          <div className="hero-visual-frame">

            <Swiper
              modules={[Pagination, Autoplay]}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              className="hero-swiper"
            >

              {slides.map((slide, index) => (
                <SwiperSlide key={index}>

                  <img
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="hero-slide-image"
                  />

                </SwiperSlide>
              ))}

            </Swiper>

            <div className="hero-visual-lens"></div>

          </div>

        </div>

      </div>
    </section>
  )
}
