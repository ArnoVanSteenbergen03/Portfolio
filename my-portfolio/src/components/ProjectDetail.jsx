import { useParams, Link } from "react-router-dom";

const projectsData = [
  {
    id: 'best-of-2024',
    title: 'Best Of 2024',
    description: 'A class project focused on work environment and new CSS/JS skills.',
    longDescription: 'This project was developed as part of my coursework, focusing on creating a modern web application using the latest CSS techniques and JavaScript features. The project demonstrates responsive design principles, modern CSS Grid and Flexbox layouts, and interactive JavaScript functionality.',
    image: './images/bestof.png',
    githubUrl: 'https://github.com/Suka-Baguette/BestOf2024',
    liveUrl: '#',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'CSS Grid'],
    year: '2024',
    features: [
      'Modern responsive design',
      'Interactive user interface',
      'Optimized performance',
      'Cross-browser compatibility'
    ]
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    description: 'My exam project, learning back-end development with Node.js and SQLite.',
    longDescription: 'A full-stack task management application built as my exam project. This project demonstrates my understanding of server-side development, database design, and API creation using Node.js and SQLite.',
    image: './images/taskManager.png',
    githubUrl: 'https://github.com/Suka-Baguette/taskManager',
    liveUrl: '#',
    technologies: ['Node.js', 'Express.js', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    year: '2024',
    features: [
      'User authentication system',
      'CRUD operations for tasks',
      'RESTful API design',
      'Database integration'
    ]
  },
  {
    id: 'stam-museum',
    title: 'STAM Museum',
    description: 'A responsive website for the STAM museum in Ghent, focused on styling.',
    longDescription: 'A responsive website created for the STAM museum in Ghent, Belgium. This project emphasizes modern web design principles, accessibility, and mobile-first responsive design approach.',
    image: './images/stam.png',
    githubUrl: 'https://github.com/Suka-Baguette/STAM-Museum',
    liveUrl: '#',
    technologies: ['HTML5', 'CSS3', 'Responsive Design', 'Mobile-First', 'Accessibility'],
    year: '2023',
    features: [
      'Mobile-first responsive design',
      'Accessibility compliance',
      'Modern CSS techniques',
      'Optimized images and assets'
    ]
  },
  {
    id: 'start-to-code',
    title: 'Start to Code',
    description: 'A beginner tutorial site made with a classmate, focused on teamwork.',
    longDescription: 'A collaborative project developed with a classmate to create a beginner-friendly coding tutorial website. This project emphasized teamwork, version control, and creating educational content.',
    image: './images/startToCode.png',
    githubUrl: 'https://github.com/Suka-Baguette/Start-To-Code',
    liveUrl: '#',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Collaborative Development'],
    year: '2023',
    features: [
      'Educational content structure',
      'Interactive tutorials',
      'Team collaboration',
      'Version control workflow'
    ]
  }
];

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
            src={project.image} 
            alt={`Screenshot of ${project.title} project`}
            className="project-detail__image"
          />
          <div className="project-detail__info">
            <h1 className="project-detail__title">{project.title}</h1>
            <p className="project-detail__year">{project.year}</p>
            <p className="project-detail__description">{project.longDescription}</p>
            
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

          <div className="project-detail__section">
            <h3>Key Features</h3>
            <ul className="features-list">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
