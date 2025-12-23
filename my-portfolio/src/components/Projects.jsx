import { useEffect } from "react";
import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";

const normalizeImagePath = (path) => {
  if (!path || typeof path !== "string") return path;
  if (path.startsWith("./")) return path.replace(/^\.\//, "/");
  return path;
};

const normalizedPathCache = new Map();
const getNormalizedPath = (path) => {
  if (normalizedPathCache.has(path)) return normalizedPathCache.get(path);
  const v = normalizeImagePath(path);
  normalizedPathCache.set(path, v);
  return v;
};

function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="section" id="projects">
      <div className="projects">
        <h2 className="projects__title">Projects</h2>
        <div className="projects__grid">
          {projectsData.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="project-card"
            >
              <img
                src={getNormalizedPath(project.image)}
                alt={`Screenshot of ${project.title} project`}
                loading="lazy"
                decoding="async"
                width={400}
                height={240}
              />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <span className="project-year">{project.year}</span>
                <div className="project-tech">
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
                      className={`tech-tag${
                        tech === "WORK IN PROGRESS" ? " tech-wip" : ""
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
