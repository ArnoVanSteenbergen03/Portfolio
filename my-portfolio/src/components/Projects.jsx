function Projects() {
  return (
    <section className="section" id="projects">
      <div className="projects">
        <h2 className="projects__title">Projects</h2>
        <div className="projects__grid">
          <div className="project-card">
            <img src="./src/assets/images/bestof.png" alt="Best Of 2024" />
            <h3>Best Of 2024</h3>
            <p>
              A class project focused on work environment and new CSS/JS skills.
            </p>
            <a
              href="https://github.com/Suka-Baguette/BestOf2024"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View on GitHub
            </a>
          </div>
          <div className="project-card">
            <img src="./src/assets/images/taskManager.png" alt="Task Manager" />
            <h3>Task Manager</h3>
            <p>
              My exam project, learning back-end development with Node.js and SQLite.
            </p>
            <a
              href="https://github.com/Suka-Baguette/taskManager"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View on GitHub
            </a>
          </div>
          <div className="project-card">
            <img src="./src/assets/images/stam.png" alt="STAM Museum" />
            <h3>STAM Museum</h3>
            <p>
              A responsive website for the STAM museum in Ghent, focused on styling.
            </p>
            <a
              href="https://github.com/Suka-Baguette/STAM-Museum"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View on GitHub
            </a>
          </div>
          <div className="project-card">
            <img src="./src/assets/images/startToCode.png" alt="Start to Code" />
            <h3>Start to Code</h3>
            <p>
              A beginner tutorial site made with a classmate, focused on teamwork.
            </p>
            <a
              href="https://github.com/Suka-Baguette/Start-To-Code"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;