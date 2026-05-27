import { useEffect, useState } from 'react'

import { useLanguage } from '../../../hooks'
import useResponsive from '../../../hooks/useResponsive'
import useScrollEffect from '../../../hooks/useScrollEffect'
import useSectionVisibility from '../../../hooks/useSectionVisibility'
import useSmoothScroll from '../../../hooks/useSmoothScroll'

import { translations } from '../../../translations'
import LanguageSwitcher from '../../common/LanguageSwitcher'

import styles from './Navbar.module.css'

/* ── Constants ── */
const NAV_LINKS = ['about', 'responsiveness', 'services', 'projects', 'contact']
const SCROLL_THRESHOLD = 40
const MOBILE_BREAKPOINT = 1024

/* ── Component ── */
export default function Navbar({ toggleTheme, theme }) {
  const { language } = useLanguage()
  const t = translations[language]

  const [menuOpen, setMenuOpen] = useState(false)

  const scrolled = useScrollEffect(SCROLL_THRESHOLD)
  const { isMobile } = useResponsive(MOBILE_BREAKPOINT)
  const activeSection = useSectionVisibility([
    'about',
    'services',
    'responsiveness',
    'projects',
    'testimonials',
    'contact',
  ])
  const { scrollToSection } = useSmoothScroll()

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  const handleScrollTo = (section) => {
    scrollToSection(section)
    setMenuOpen(false)
  }

  const themeLabel = theme === 'dark' ? t.theme.lightMode : t.theme.darkMode
  const themeEmoji = theme === 'dark' ? '🌙' : '☀️'

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="navigation"
      aria-label={t.navbar.ariaLabel}
    >
      {/* ── Top Bar ── */}
      <div className={styles.navInner}>

        {/* Logo */}
        <a href="/" className={styles.navLogo} aria-label="SK WEB Home">
          SK<span className={styles.logoAccent}>WEB</span>
        </a>

        {/* Desktop Nav */}
        <div className={styles.navLinks} role="list">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              role="listitem"
              className={`${styles.navLink} ${activeSection === link ? styles.active : ''}`}
              onClick={() => handleScrollTo(link)}
              aria-current={activeSection === link ? 'page' : undefined}
            >
              {t.navbar[link]}
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className={styles.navRight}>
          <div className={styles.desktopOnly}>
            <LanguageSwitcher />
          </div>

          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span className={styles.themeIcon} role="img" aria-hidden="true">
              {themeEmoji}
            </span>
          </button>

          <button
            className={styles.burgerMenu}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={t.navbar.toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
            <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
            <span className={styles.burgerLine} />
          </button>
        </div>

      </div>

      {/* ── Mobile Menu ── */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
        role="menu"
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            role="menuitem"
            className={styles.mobileLink}
            onClick={() => handleScrollTo(link)}
          >
            {t.navbar[link]}
          </button>
        ))}

        <LanguageSwitcher />

        <button
          className={styles.mobileThemeToggle}
          onClick={toggleTheme}
          aria-label={themeLabel}
        >
          <span role="img" aria-hidden="true">{themeEmoji}</span>
          {' '}
          {themeLabel}
        </button>
      </div>
    </nav>
  )
}