
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import './SKWEBShowcase.css'

import showcaseVideo from '../../assets/videos/hero.mov'

export default function SKWEBShowcase() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      className="section skweb-showcase"
      id="responsiveness"
    >
      <div className="container showcase-grid">

        <div className="showcase-header">

          <div className="showcase-labels">

            <span className="section-pill">
              {t.showcase.brand}
            </span>

            <span className="section-pill secondary">
              {t.showcase.feature}
            </span>

          </div>

          <p className="showcase-lead">
            {t.showcase.description}
          </p>

        </div>

        {/* VIDEO */}
        <div className="showcase-video-wrapper">

          <video
            className="showcase-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src={showcaseVideo}
              type="video/mp4"
            />

            Your browser does not support the video tag.

          </video>

        </div>

      </div>
    </section>
  )
}

