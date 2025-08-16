import { Link } from "react-router-dom";

const skillsData = [
  { name: 'JavaScript', level: 90, icon: '🚀', category: 'Frontend' },
  { name: 'Node.js', level: 85, icon: '⚡', category: 'Backend' },
  { name: 'React', level: 80, icon: '⚛️', category: 'Frontend' },
  { name: 'CSS/SCSS', level: 85, icon: '🎨', category: 'Frontend' },
  { name: 'SQL', level: 75, icon: '🗄️', category: 'Database' },
  { name: 'HTML5', level: 95, icon: '📄', category: 'Frontend' }
];

const timelineData = [
  {
    year: '2024',
    title: 'Full-Stack Projects',
    description: 'Built comprehensive applications using Node.js, React, and databases'
  },
  {
    year: '2023',
    title: 'Started at Artevelde Hogeschool',
    description: 'Began my journey in Programming with focus on modern web technologies'
  },
  {
    year: '2019',
    title: 'First Line of Code',
    description: 'Started learning programming with curiosity and passion'
  }
];

const interests = [
  { icon: '💻', title: 'Web Development', description: 'Creating modern, responsive web applications' },
  { icon: '🎮', title: 'Gaming', description: 'Enjoying strategic and creative games' },
  { icon: '🌱', title: 'Learning', description: 'Always exploring new technologies and frameworks' },
  { icon: '🏗️', title: 'Building', description: 'Love creating things from scratch' }
];

function About() {
  return (
    <section className="section" id="about">
      <div className="about">
        <div className="about__intro">
          <h2 className="about__title">About Me</h2>
          <p className="about__desc">
            Hi! I'm Arno, a passionate junior full-stack developer from Ghent, Belgium. 
            With a Graduaat Programming degree from Artevelde Hogeschool and 5 years of coding experience, 
            I specialize in creating robust back-end systems while crafting engaging front-end experiences.
          </p>
          <p className="about__highlight">
            I believe in writing clean, efficient code and continuously learning new technologies 
            to solve real-world problems.
          </p>
        </div>

        <div className="about__skills">
          <h3 className="section__title">Technical Skills</h3>
          <div className="skills-grid">
            {skillsData.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <div className="skill-info">
                    <h4 className="skill-name">{skill.name}</h4>
                    <span className="skill-category">{skill.category}</span>
                  </div>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about__journey">
          <h3 className="section__title">My Journey</h3>
          <div className="timeline">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about__interests">
          <h3 className="section__title">What I Love</h3>
          <div className="interests-grid">
            {interests.map((interest, index) => (
              <div key={index} className="interest-card">
                <span className="interest-icon">{interest.icon}</span>
                <h4 className="interest-title">{interest.title}</h4>
                <p className="interest-desc">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about__cta">
          <p className="cta-text">Want to work together?</p>
          <Link to="/contact" className="cta-button">Let's Connect</Link>
        </div>
      </div>
    </section>
  );
}

export default About;