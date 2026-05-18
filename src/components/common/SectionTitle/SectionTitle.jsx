export default function SectionTitle({ label, title, subtitle, className = '' }) {
  return (
    <header className={`section-title ${className}`}>
      {label && <span className="section-title-label">{label}</span>}
      {title && <h2>{title}</h2>}
      {subtitle && <p>{subtitle}</p>}
    </header>
  )
}
