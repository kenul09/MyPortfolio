import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

import styles from './SKWEBShowcase.module.css'

import showcaseVideo from '../../assets/videos/hero.mp4'


export default function SKWEBShowcase() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section
      className={`section ${styles.skwebShowcase}`}
      id="responsiveness"
    >
      <div className={`container ${styles.showcaseGrid}`}>

        <div className={styles.showcaseHeader}>
          <div className={styles.showcaseLabels}>
            <span className={styles.sectionPill}>
              {t.showcase.brand}
            </span>

            <span className={`${styles.sectionPill} ${styles.sectionPillSecondary}`}>
              {t.showcase.feature}
            </span>
          </div>

          <p className={styles.showcaseLead}>
            {t.showcase.description}
          </p>
        </div>

        <div className={styles.showcaseVideoWrapper}>
          <video
            className={styles.showcaseVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
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