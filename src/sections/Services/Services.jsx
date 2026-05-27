import { useState } from 'react'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'
import styles from './Services.module.css'

export default function Services() {
  const { language } = useLanguage()
  const t = translations[language]
  const [hovered, setHovered] = useState(null)

  return (
    <section className={`section ${styles.services}`} id="services">
      <div className="container">
        <div className={styles.servicesHeader}>
          <div>
            <span className="section-label">{t.services.sectionLabel}</span>
            <h2 className={styles.servicesTitle}>{t.services.title}</h2>
          </div>
        </div>

        <div className={styles.servicesGrid}>
          {t.services.cards.map((s, i) => (
            <div
              key={s.num}
              className={`${styles.serviceCard} ${hovered === i ? styles.hovered : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={styles.serviceNum}>{s.num}</span>

              <h3 className={styles.serviceTitle}>{s.title}</h3>

              <p className={styles.serviceDesc}>{s.desc}</p>

              <div className={styles.serviceTags}>
                {s.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}