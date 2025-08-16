import { useParams, Link } from "react-router-dom";
import projectsData from "../data/projects.json";

function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <section className="section">
        <div className="project-detail">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="back-button">← Back to Projects</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="project-detail">
        <Link to="/projects" className="back-button">← Back to Projects</Link>
        
        <div className="project-detail__header">
          <img 
            src={`../${project.image}`} 
            alt={`Screenshot of ${project.title} project`}
            className="project-detail__image"
          />
          <div className="project-detail__info">
            <h1 className="project-detail__title">{project.title}</h1>
            <p className="project-detail__year">{project.year}</p>
            <p className="project-detail__description">{project.fullDescription}</p>
            
            <div className="project-detail__links">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-button"
              >
                View on GitHub
              </a>
              {project.liveUrl !== '#' && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-button secondary"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="project-detail__content">
          <div className="project-detail__section">
            <h3>Technologies Used</h3>
            <div className="tech-list">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-item">{tech}</span>
              ))}
            </div>
          </div>

          {project.features && (
            <div className="project-detail__section">
              <h3>Key Features</h3>
              <ul className="features-list">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
