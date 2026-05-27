import './About.module.css'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'

export default function About() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="about section" id="about">
      <div className="container">
        <span className="section-label">{t.navbar.about}</span>
        <h2 className="about-title">{t.about.title}</h2>
        <p className="about-text">
          {t.about.text}
        </p>
      </div>
    </section>
  )
}
