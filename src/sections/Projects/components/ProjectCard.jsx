export default function ProjectCard({ title, description, tag, img }) {
  return (
    <article className="project-card">
      <img src={img} alt={title} />
      <div className="project-card-body">
        <p className="project-card-tag">{tag}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}
