import { useState } from 'react'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'
import styles from './Contact.module.css'

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]
  const [form, setForm] = useState({
    name: '',
    email: '',
    interest: 'both',
    message: '',
    agreed: false,
  })
  const [sent, setSent] = useState(false)

  const handle = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.agreed) return alert(t.contact.privacyAlert)
    setSent(true)
  }

  const interestOptions = [
    t.contact.options.both,
    t.contact.options.design,
    t.contact.options.development,
    t.contact.options.landing,
    t.contact.options.ecommerce,
  ]

  return (
    <section className={`section ${styles.contact}`} id="contact">

      <div className={styles.contactBg}>
        <div className={styles.contactGlow} />
      </div>

      <div className="container">
        <div className={styles.contactInner}>

          {/* LEFT */}
          <div className={styles.contactLeft}>
            <span className="section-label">{t.contact.sectionLabel}</span>
            <h2 className={styles.contactTitle}>{t.contact.title}</h2>
            <p className={styles.contactDesc}>{t.contact.desc}</p>
          </div>

          {/* RIGHT */}
          <div className={styles.contactRight}>
            {sent ? (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>✓</div>
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successMessage}</p>
              </div>
            ) : (
              <form className={styles.contactForm} onSubmit={submit}>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contact.placeholders.name}
                      value={form.name}
                      onChange={handle}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <input
                      type="email"
                      name="email"
                      placeholder={t.contact.placeholders.email}
                      value={form.email}
                      onChange={handle}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={handle}
                  >
                    {interestOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <textarea
                    name="message"
                    placeholder={t.contact.placeholders.message}
                    rows={5}
                    value={form.message}
                    onChange={handle}
                    required
                  />
                </div>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={form.agreed}
                    onChange={handle}
                  />
                  <span>
                    {t.contact.privacyPrefix}{' '}
                    <a href="#">{t.contact.privacyLink}</a>{' '}
                    {t.contact.privacySuffix}
                  </span>
                </label>

                <button
                  type="submit"
                  className={`btn-primary ${styles.submitBtn}`}
                >
                  {t.contact.submit}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}