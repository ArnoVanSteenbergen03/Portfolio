import { Link } from "react-router-dom";

const projectsData = [
  {
    id: 'best-of-2024',
    title: 'Best Of 2024',
    description: 'A class project focused on work environment and new CSS/JS skills.',
    image: './images/bestof.png',
    githubUrl: 'https://github.com/Suka-Baguette/BestOf2024',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    year: '2024'
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    description: 'My exam project, learning back-end development with Node.js and SQLite.',
    image: './images/taskManager.png',
    githubUrl: 'https://github.com/Suka-Baguette/taskManager',
    technologies: ['Node.js', 'SQLite', 'Express'],
    year: '2024'
  },
  {
    id: 'stam-museum',
    title: 'STAM Museum',
    description: 'A responsive website for the STAM museum in Ghent, focused on styling.',
    image: './images/stam.png',
    githubUrl: 'https://github.com/Suka-Baguette/STAM-Museum',
    technologies: ['HTML', 'CSS', 'Responsive Design'],
    year: '2023'
  },
  {
    id: 'start-to-code',
    title: 'Start to Code',
    description: 'A beginner tutorial site made with a classmate, focused on teamwork.',
    image: './images/startToCode.png',
    githubUrl: 'https://github.com/Suka-Baguette/Start-To-Code',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    year: '2023'
  }
];

function Projects() {
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
              <img src={project.image} alt={`Screenshot of ${project.title} project`} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <span className="project-year">{project.year}</span>
                <div className="project-tech">
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
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