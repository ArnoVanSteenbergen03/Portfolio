import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="section" id="home">
      <div className="home">
        <div className="home__profile">
          <img 
            src="/images/profile.jpg" 
            alt="Arno Van Steenbergen" 
            className="home__profile-img"
          />
        </div>
        <h1 className="home__title">
          Hi, I'm <span className="highlight">Arno</span>
        </h1>
        <h2 className="home__subtitle">Full-Stack Developer</h2>
        <p className="home__desc">
          I build robust back-end systems and great front-end experiences.<br />
          Currently specializing in JavaScript technologies and cloud development.
        </p>
        <div className="home__cta">
          <Link to="/projects" className="cta-btn">View My Work</Link>
          <Link to="/contact" className="cta-btn secondary">Contact Me</Link>
        </div>
      </div>
    </section>
  );
}

export default Home;