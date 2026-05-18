import { useState } from 'react'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'
import './Services.css'

export default function Services() {
  const { language } = useLanguage()
  const t = translations[language]
  const [hovered, setHovered] = useState(null)

  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="services-header">
          <div>
            <span className="section-label">{t.services.sectionLabel}</span>
            <h2 className="services-title">{t.services.title}</h2>
          </div>
        </div>

        <div className="services-grid">
          {t.services.cards.map((s, i) => (
            <div
              key={s.num}
              className={`service-card ${hovered === i ? 'hovered' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="service-num">{s.num}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
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
