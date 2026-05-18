import './Footer.css'
import { useLanguage } from '../../../hooks'
import { translations } from '../../../translations'
import useSmoothScroll from '../../../hooks/useSmoothScroll'

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]
  const { scrollTo } = useSmoothScroll()

  return (
    <footer className="footer section">

      <div
        className="footer-big-text"
        aria-hidden="true"
      >
        SKWEB
      </div>

      <div className="container footer-inner">

        {/* LEFT */}
        <div className="footer-left">

          <h3 className="footer-cta-title">
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
        <div className="footer-links">

          {/* QUICK LINKS */}
          <div className="footer-col">

            <p className="footer-col-title">
              {t.footer.quickLinksTitle}
            </p>

            {[
              'about',
              'services',
              'projects',
              'contact',
            ].map((key) => (
              <button
                key={key}
                className="footer-link"
                onClick={() => scrollTo(key)}
              >
                {t.navbar[key]}
              </button>
            ))}

          </div>

          {/* CONTACT */}
          <div className="footer-col">

            <p className="footer-col-title">
              {t.footer.contactTitle}
            </p>

            {/* PHONE */}
            <a
              href="tel:+994503417069"
              className="footer-contact-item"
            >
              <span className="contact-icon">
                📞
              </span>

              +994 50 341 70 69
            </a>

            {/* EMAIL */}
            <a
              href="mailto:kenul94@mail.ru"
              className="footer-contact-item"
            >
              <span className="contact-icon">
                ✉️
              </span>

              kenul94@mail.ru
            </a>

            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/s.k_web"
              target="_blank"
              rel="noreferrer"
              className="footer-contact-item"
            >
              <span className="contact-icon">
                📷
              </span>

              @s.k_web
            </a>

            {/* GITHUB */}
            <a
              href="https://github.com/YOUR_GITHUB"
              target="_blank"
              rel="noreferrer"
              className="footer-contact-item"
            >
              <span className="contact-icon">
                💻
              </span>

              GitHub
            </a>

            {/* LINKEDIN */}
            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN"
              target="_blank"
              rel="noreferrer"
              className="footer-contact-item"
            >
              <span className="contact-icon">
                🔗
              </span>

              LinkedIn
            </a>

            {/* BEHANCE */}
            <a
              href="https://behance.net/YOUR_BEHANCE"
              target="_blank"
              rel="noreferrer"
              className="footer-contact-item"
            >
              <span className="contact-icon">
                🎨
              </span>

              Behance
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom container">

        <p>
          {t.footer.bottomText}
        </p>

        <div className="footer-socials">

          {/* LINKEDIN */}
          <a
            href="https://linkedin.com/in/YOUR_LINKEDIN"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            in
          </a>

          {/* BEHANCE */}
          <a
            href="https://behance.net/YOUR_BEHANCE"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            Be
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/YOUR_GITHUB"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            Gh
          </a>

          {/* DRIBBBLE */}
          <a
            href="https://dribbble.com/YOUR_DRIBBBLE"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            Dr
          </a>

          {/* TWITTER / X */}
          <a
            href="https://x.com/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
          >
            X
          </a>

        </div>

      </div>

    </footer>
  )
}