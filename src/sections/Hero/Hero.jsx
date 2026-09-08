import { useRef } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import Button from '../../components/ui/Button'
import useMountAnimation from '../../hooks/useMountAnimation'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import slide1 from '../../assets/images/slide1.png'
import slide2 from '../../assets/images/slide2.png'
import slide3 from '../../assets/images/slide3.png'

import styles from './Hero.module.css'

/* ── Constants ── */
const SLIDES = [slide1, slide2, slide3]

const SWIPER_CONFIG = {
  modules: [Pagination, Autoplay, EffectFade],
  slidesPerView: 1,
  loop: true,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { clickable: true },
}

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:your@email.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

/* ── Component ── */
export default function Hero() {
  const sectionRef = useRef(null)
  useMountAnimation(sectionRef)

  const { scrollToSection } = useSmoothScroll()
  const { language } = useLanguage()
  const t = translations[language]

  const delay = (time) => ({ '--delay': time })

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* Decorative background — single subtle orb */}
      <div className={styles.bgOrb} aria-hidden="true" />

      <div className={styles.heroInner}>
        {/* ── LEFT — Content ── */}
        <div className={styles.heroContent}>
          <p
            className={`${styles.heroIntro} ${styles.fadeInUp}`}
            style={delay('0.1s')}
          >
            <span className={styles.introDot} aria-hidden="true" />
            {t.heroTitle}
          </p>

          <h1
            className={`${styles.heroHeading} ${styles.fadeInUp}`}
            style={delay('0.2s')}
          >
            Konul <span className={styles.headingAccent}>Samadova</span>
          </h1>

          <p
            className={`${styles.heroRole} ${styles.fadeInUp}`}
            style={delay('0.3s')}
          >
            Frontend Developer
          </p>

          <p
            className={`${styles.heroCopy} ${styles.fadeInUp}`}
            style={delay('0.4s')}
          >
            {t.heroSubtitle}
          </p>

          <div
            className={`${styles.heroActions} ${styles.fadeInUp}`}
            style={delay('0.5s')}
          >
            <Button
              className={styles.btnPrimary}
              onClick={() => scrollToSection('contact')}
            >
              {t.startProject}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
            <Button
              className={styles.btnGhost}
              onClick={() => scrollToSection('projects')}
            >
              {t.viewWorks}
            </Button>
          </div>

          {/* Social Links */}
          <div
            className={`${styles.heroSocials} ${styles.fadeInUp}`}
            style={delay('0.6s')}
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Visual ── */}
        <div
          className={`${styles.heroRight} ${styles.fadeInUp}`}
          style={delay('0.7s')}
        >
          <div className={styles.heroVisualFrame}>
            <Swiper {...SWIPER_CONFIG} className={styles.heroSwiper}>
              {SLIDES.map((slide, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={slide}
                    alt={`Project preview ${index + 1}`}
                    className={styles.heroSlideImage}
                    loading={index === 0 ? 'eager' : 'lazy'}
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