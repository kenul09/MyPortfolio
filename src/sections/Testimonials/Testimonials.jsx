import styles from './Testimonials.module.css'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

export default function Testimonials() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className={`section ${styles.testimonials}`} id="testimonials">
      <div className="container">

        <div className={styles.testHeader}>
          <span className="section-label">{t.testimonials.sectionLabel}</span>
          <h2 className={styles.testTitle}>{t.testimonials.title}</h2>
          <p className={styles.testSub}>{t.testimonials.sub}</p>
        </div>

        <div className={styles.testGrid}>
          {t.testimonials.cards.map((item, i) => (
            <div key={i} className={styles.testCard}>

              <div className={styles.testStars}>
                {'★'.repeat(item.stars)}
              </div>

              <p className={styles.testText}>"{item.text}"</p>

              <div className={styles.testAuthor}>
                <div
                  className={styles.testAvatar}
                  style={{ background: item.color }}
                >
                  {item.initials}
                </div>

                <div>
                  <p className={styles.testName}>{item.name}</p>
                  <p className={styles.testRole}>{item.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}