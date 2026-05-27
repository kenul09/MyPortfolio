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

import styles from './Hero.module.css'

const SLIDES = [slide1, slide2, slide3]

const SWIPER_CONFIG = {
  modules: [Pagination, Autoplay],
  slidesPerView: 1,
  loop: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: { clickable: true },
}

export default function Hero() {
  const sectionRef = useRef(null)
  useMountAnimation(sectionRef)

  const { scrollToSection } = useSmoothScroll()
  const { language } = useLanguage()
  const t = translations[language]

  const delay = (time) => ({ '--delay': time })

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      <div className={styles.heroInner}>

        {/* LEFT — Content */}
        <div className={styles.heroContent}>

          <p className={`${styles.heroIntro} ${styles.fadeInUp}`} style={delay('0.2s')}>
            {t.heroTitle}
          </p>

          <h1 className={`${styles.heroHeading} ${styles.fadeInUp}`} style={delay('0.4s')}>
            Konul Samadova
          </h1>

          <p className={`${styles.heroCopy} ${styles.fadeInUp}`} style={delay('0.6s')}>
            {t.heroSubtitle}
          </p>

          <div className={`${styles.heroActions} ${styles.fadeInUp}`} style={delay('0.8s')}>
            <button className={styles.btnPrimary} onClick={() => scrollToSection('contact')}>
              {t.startProject}
            </button>
            <button className={styles.btnGhost} onClick={() => scrollToSection('projects')}>
              {t.viewWorks}
            </button>
          </div>

        </div>

        {/* RIGHT — Visual */}
        <div className={`${styles.heroRight} ${styles.fadeInUp}`} style={delay('1s')}>
          <div className={styles.heroVisualFrame}>

            <Swiper {...SWIPER_CONFIG} className={styles.heroSwiper}>
              {SLIDES.map((slide, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className={styles.heroSlideImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </div>

      </div>
    </section>
  )
}