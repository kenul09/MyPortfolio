import { useMemo, useState } from 'react'

import { useLanguage } from '../../hooks'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import { translations } from '../../translations'

import styles from './Projects.module.css'

export default function Projects() {
  const { language } = useLanguage()
  const t = translations[language]
  const [filter, setFilter] = useState('all')
  const { scrollToSection } = useSmoothScroll()

  /* =========================
     FILTER BUTTONS
  ========================= */

  const filters = [
    { key: 'all',     label: t.projects.filters.all },
    { key: 'uiux',   label: t.projects.filters.uiux },
    { key: 'webdev', label: t.projects.filters.webdev },
  ]

  /* =========================
     FILTERED PROJECTS
  ========================= */

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return t.projects.cards
    return t.projects.cards.filter((project) => project.tag === filter)
  }, [filter, t.projects.cards])

  return (
    <section className={`section ${styles.projects}`} id="projects">
      <div className="container">

        {/* HEADER */}
        <div className={styles.projectsHeader}>
          <div>
            <span className="section-label">
              {t.projects.sectionLabel}
            </span>

            <h2 className={styles.projectsTitle}>
              {t.projects.titleTop}
              <br />
              {t.projects.titleBottom}{' '}
              <span className={styles.titleBlue}>
                {t.projects.titleAccent}
              </span>
            </h2>

            <p className={styles.projectsSub}>
              {t.projects.sub.map((line, index) => (
                <span key={index}>
                  {line}
                  {index !== t.projects.sub.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className={styles.projectsHeaderActions}>
            <button
              className="btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              {t.projects.buttons.viewAll}
              <span className="arrow" aria-hidden="true">→</span>
            </button>

            <button
              className="btn-ghost"
              onClick={() => scrollToSection('contact')}
            >
              {t.projects.buttons.collaborate}
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className={styles.projectFilters} role="tablist">
          {filters.map((item) => (
            <button
              key={item.key}
              className={`${styles.filterBtn} ${filter === item.key ? styles.active : ''}`}
              onClick={() => setFilter(item.key)}
              role="tab"
              aria-selected={filter === item.key}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project, index) => (
            <a
              key={project.title + index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
            >
              <img
                src={project.img}
                alt={project.title}
                className={styles.projectImage}
              />

              <div className={styles.projectContent}>
                <span
                  className={styles.projectTag}
                  style={{ background: project.color }}
                >
                  {t.projects.tags[project.tag]}
                </span>

                <h3>{project.title}</h3>

                <p>{project.desc}</p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}