import './Testimonials.css'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

export default function Testimonials() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="test-header">
          <span className="section-label">{t.testimonials.sectionLabel}</span>
          <h2 className="test-title">{t.testimonials.title}</h2>
          <p className="test-sub">{t.testimonials.sub}</p>
        </div>

        <div className="test-grid">
          {t.testimonials.cards.map((item, i) => (
            <div key={i} className="test-card">
              <div className="test-stars">
                {'★'.repeat(item.stars)}
              </div>
              <p className="test-text">"{item.text}"</p>
              <div className="test-author">
                <div className="test-avatar" style={{ background: item.color }}>{item.initials}</div>
                <div>
                  <p className="test-name">{item.name}</p>
                  <p className="test-role">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
