import { useEffect, useState } from 'react'

import { useLanguage } from '../../../hooks'

import useResponsive from '../../../hooks/useResponsive'
import useScrollEffect from '../../../hooks/useScrollEffect'
import useSectionVisibility from '../../../hooks/useSectionVisibility'
import useSmoothScroll from '../../../hooks/useSmoothScroll'

import { translations } from '../../../translations'

import LanguageSwitcher from '../../common/LanguageSwitcher'

import styles from './Navbar.module.css'

const NAV_LINKS = [
  'about',
  'responsiveness',
  'services',
  'projects',
  'contact',
]

const SCROLL_THRESHOLD = 40
const MOBILE_BREAKPOINT = 1024

export default function Navbar({
  toggleTheme,
  theme,
}) {
  const { language } = useLanguage()

  const t = translations[language]

  const [menuOpen, setMenuOpen] =
    useState(false)

  const scrolled =
    useScrollEffect(SCROLL_THRESHOLD)

  const { isMobile } =
    useResponsive(MOBILE_BREAKPOINT)

  const activeSection =
    useSectionVisibility([
      'about',
      'services',
      'responsiveness',
      'projects',
      'testimonials',
      'contact',
    ])

  const { scrollToSection } =
    useSmoothScroll()

  // Close mobile menu on desktop
  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false)
    }
  }, [isMobile])

  // Scroll handler
  const handleScrollTo = (section) => {
    scrollToSection(section)
    setMenuOpen(false)
  }

  // Dynamic classes
  const navbarClasses = `
    ${styles.navbar}
    ${scrolled ? styles.scrolled : ''}
  `

  const mobileMenuClasses = `
    ${styles.mobileMenu}
    ${menuOpen ? styles.open : ''}
  `

  return (
    <nav
      className={navbarClasses}
      role="navigation"
      aria-label={t.navbar.ariaLabel}
    >
      <div className={styles.navInner}>

        {/* LOGO */}
        <a
          href="/"
          className={styles.navLogo}
          aria-label="SK WEB Home"
        >
          SK
          <span className={styles.logoAccent}>
            WEB
          </span>
        </a>

        {/* DESKTOP NAVIGATION */}
        <div
          className={styles.navLinks}
          role="list"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              role="listitem"
              className={`
                ${styles.navLink}
                ${
                  activeSection === link
                    ? styles.active
                    : ''
                }
              `}
              onClick={() =>
                handleScrollTo(link)
              }
              aria-current={
                activeSection === link
                  ? 'page'
                  : undefined
              }
            >
              {t.navbar[link]}
            </button>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className={styles.navRight}>

          <LanguageSwitcher />

          {/* THEME TOGGLE */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? t.theme.lightMode
                : t.theme.darkMode
            }
            title={
              theme === 'dark'
                ? t.theme.lightMode
                : t.theme.darkMode
            }
          >
            <span
              className={styles.themeIcon}
              role="img"
              aria-hidden="true"
            >
              {theme === 'dark'
                ? '🌙'
                : '☀️'}
            </span>
          </button>

          {/* BURGER MENU */}
          <button
            className={styles.burgerMenu}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label={t.navbar.toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`
                ${styles.burgerLine}
                ${
                  menuOpen
                    ? styles.open
                    : ''
                }
              `}
            />

            <span
              className={`
                ${styles.burgerLine}
                ${
                  menuOpen
                    ? styles.open
                    : ''
                }
              `}
            />

            <span
              className={styles.burgerLine}
            />
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={mobileMenuClasses}
        role="menu"
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            role="menuitem"
            className={styles.mobileLink}
            onClick={() =>
              handleScrollTo(link)
            }
          >
            {t.navbar[link]}
          </button>
        ))}

        <LanguageSwitcher />

        {/* MOBILE THEME TOGGLE */}
        <button
          className={
            styles.mobileThemeToggle
          }
          onClick={toggleTheme}
          aria-label={
            theme === 'dark'
              ? t.theme.lightMode
              : t.theme.darkMode
          }
        >
          <span
            role="img"
            aria-hidden="true"
          >
            {theme === 'dark'
              ? '🌙'
              : '☀️'}
          </span>

          {' '}

          {theme === 'dark'
            ? t.theme.lightMode
            : t.theme.darkMode}
        </button>

      </div>
    </nav>
  )
}