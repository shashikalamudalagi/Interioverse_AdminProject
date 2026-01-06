import "./ProjectsPanel.css";

function ProjectsPanel({ projects }) {
  return (
    <div className="widget projects-panel">
      <div className="projects-header">
        <h4>Projects</h4>
      </div>

      <div className="projects-panel-inner">
        {projects.map((p, i) => (
          <div key={i} className="project">
            <img src={p.image} alt="" />

            <div className="project-strip">
              <p className="project-title">{p.name}</p>
            </div>

            <div className="project-info">
              <span className="project-location">{p.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPanel;
