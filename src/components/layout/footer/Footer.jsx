import styles from './Footer.module.css'
import { useLanguage } from '../../../hooks'
import { translations } from '../../../translations'
import useSmoothScroll from '../../../hooks/useSmoothScroll'

import {
  FiPhone,
  FiMail,
  FiInstagram,
  FiGithub,
  FiLinkedin,
  FiDribbble,
  FiTwitter,
} from 'react-icons/fi'

import { SiBehance } from 'react-icons/si'

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]
  const { scrollTo } = useSmoothScroll()

  return (
    <footer className={`section ${styles.footer}`}>

      <div className={styles.footerBigText} aria-hidden="true">
        SKWEB
      </div>

      <div className={`container ${styles.footerInner}`}>

        {/* LEFT */}
        <div className={styles.footerLeft}>
          <h3 className={styles.footerCtaTitle}>
            {t.footer.ctaTitle}
          </h3>

          <button
            className="btn-primary"
            onClick={() => scrollTo('contact')}
          >
            {t.footer.button}
          </button>
        </div>

        {/* RIGHT */}
        <div className={styles.footerLinks}>

          {/* QUICK LINKS */}
          <div className={styles.footerCol}>
            <p className={styles.footerColTitle}>
              {t.footer.quickLinksTitle}
            </p>

            {['about', 'services', 'projects', 'contact'].map((key) => (
              <button
                key={key}
                className={styles.footerLink}
                onClick={() => scrollTo(key)}
              >
                {t.navbar[key]}
              </button>
            ))}
          </div>

          {/* CONTACT */}
          <div className={styles.footerCol}>
            <p className={styles.footerColTitle}>
              {t.footer.contactTitle}
            </p>

            <a href="tel:+994503417069" className={styles.footerContactItem}>
              <FiPhone className={styles.contactIcon} />
              +994 50 341 70 69
            </a>

            <a href="mailto:kenul94@mail.ru" className={styles.footerContactItem}>
              <FiMail className={styles.contactIcon} />
              kenul94@mail.ru
            </a>

            <a
              href="https://instagram.com/s.k_web"
              target="_blank"
              rel="noreferrer"
              className={styles.footerContactItem}
            >
              <FiInstagram className={styles.contactIcon} />
              @s.k_web
            </a>

            <a
              href="https://github.com/YOUR_GITHUB"
              target="_blank"
              rel="noreferrer"
              className={styles.footerContactItem}
            >
              <FiGithub className={styles.contactIcon} />
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN"
              target="_blank"
              rel="noreferrer"
              className={styles.footerContactItem}
            >
              <FiLinkedin className={styles.contactIcon} />
              LinkedIn
            </a>

            <a
              href="https://behance.net/YOUR_BEHANCE"
              target="_blank"
              rel="noreferrer"
              className={styles.footerContactItem}
            >
              <SiBehance className={styles.contactIcon} />
              Behance
            </a>

          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={`container ${styles.footerBottom}`}>
        <p>{t.footer.bottomText}</p>

        <div className={styles.footerSocials}>

          <a
            href="https://linkedin.com/in/YOUR_LINKEDIN"
            target="_blank"
            rel="noreferrer"
            className={styles.socialBtn}
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>

          <a
            href="https://behance.net/YOUR_BEHANCE"
            target="_blank"
            rel="noreferrer"
            className={styles.socialBtn}
            aria-label="Behance"
          >
            <SiBehance />
          </a>

          <a
            href="https://github.com/YOUR_GITHUB"
            target="_blank"
            rel="noreferrer"
            className={styles.socialBtn}
            aria-label="GitHub"
          >
            <FiGithub />
          </a>

          <a
            href="https://dribbble.com/YOUR_DRIBBBLE"
            target="_blank"
            rel="noreferrer"
            className={styles.socialBtn}
            aria-label="Dribbble"
          >
            <FiDribbble />
          </a>

          <a
            href="https://x.com/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            className={styles.socialBtn}
            aria-label="Twitter"
          >
            <FiTwitter />
          </a>

        </div>
      </div>

    </footer>
  )
}