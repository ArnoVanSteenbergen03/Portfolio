import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import ImageSlider from "./ImageSlider";

function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const openSlider = () => setIsSliderOpen(true);
  const closeSlider = () => setIsSliderOpen(false);

  if (!project) {
    return (
      <section className="section">
        <div className="project-detail">
          <h1>Project Not Found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="back-button cursor-target">
            ← Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const projectImages =
    project.images && project.images.length
      ? project.images
      : project.image
      ? [project.image]
      : [];

  return (
    <section className="section">
      <div className="project-detail">
        <Link to="/projects" className="back-button cursor-target">
          ← Back to Projects
        </Link>

        <div className="project-detail__header">
          <div className="project-detail__image-container">
            <img
              src={projectImages[0]}
              alt={`Screenshot of ${project.title} project`}
              className="project-detail__image clickable cursor-target"
              onClick={openSlider}
              title="Click to view image gallery"
            />
            {projectImages.length > 1 && (
              <div className="image-gallery-indicator">
                📷 {projectImages.length} images - Click to view gallery
              </div>
            )}
          </div>

          <div className="project-detail__info">
            <h1 className="project-detail__title">{project.title}</h1>
            <p className="project-detail__year">{project.year}</p>
            <p className="project-detail__description">
              {project.fullDescription}
            </p>

            <div className="project-detail__links">
              <a
                className="project-button cursor-target"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  className="project-button secondary cursor-target"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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
                <span key={index} className="tech-item">
                  {tech}
                </span>
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

        <ImageSlider
          images={projectImages}
          projectTitle={project.title}
          isOpen={isSliderOpen}
          onClose={closeSlider}
        />
      </div>
    </section>
  );
}

export default ProjectDetail;
