import { Link } from "react-router-dom";
import SplitText from "./SplitText";

function Home() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

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
        <SplitText
          text="Hello, I'm Arno"
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
          highlight="Arno"
          fontSize="2.4rem"
        />
        <h2 className="home__subtitle">Full-Stack Developer</h2>
        <p className="home__desc">
          I like to build complex web applications with lots of functionality.
          <br />
          Currently specializing in JavaScript technologies and cloud
          development.
        </p>
        <div className="home__cta">
          <Link to="/projects" className="cta-btn">
            View My Work
          </Link>
          <Link to="/contact" className="cta-btn secondary">
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
