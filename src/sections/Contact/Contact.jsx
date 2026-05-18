import { useState } from 'react'
import { useLanguage } from '../../hooks'
import { translations } from '../../translations'
import './Contact.css'

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]
  const [form, setForm] = useState({ name: '', email: '', interest: 'both', message: '', agreed: false })
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
    <section className="contact section" id="contact">
      <div className="contact-bg">
        <div className="contact-glow" />
      </div>
      <div className="container">
        <div className="contact-inner">
          <div className="contact-left">
            <span className="section-label">{t.contact.sectionLabel}</span>
            <h2 className="contact-title">{t.contact.title}</h2>
            <p className="contact-desc">{t.contact.desc}</p>
          </div>

          <div className="contact-right">
            {sent ? (
              <div className="success-msg">
                <div className="success-icon">✓</div>
                <h3>{t.contact.successTitle}</h3>
                <p>{t.contact.successMessage}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder={t.contact.placeholders.name}
                      value={form.name}
                      onChange={handle}
                      required
                    />
                  </div>
                  <div className="form-group">
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

                <div className="form-group">
                  <select name="interest" value={form.interest} onChange={handle}>
                    {interestOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder={t.contact.placeholders.message}
                    rows={5}
                    value={form.message}
                    onChange={handle}
                    required
                  />
                </div>

                <label className="checkbox-label">
                  <input type="checkbox" name="agreed" checked={form.agreed} onChange={handle} />
                  <span>
                    {t.contact.privacyPrefix}{' '}
                    <a href="#">{t.contact.privacyLink}</a>{' '}
                    {t.contact.privacySuffix}
                  </span>
                </label>

                <button type="submit" className="btn-primary submit-btn">
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
