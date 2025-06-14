function About() {
  return (
    <section className="section" id="about">
      <div className="about">
        <h2 className="about__title">About Me</h2>
        <p className="about__desc">
          I'm Arno, a junior full-stack developer who studied at Artevelde Hogeschool.<br />
          I have a Graduaat Programming degree from Ghent, Belgium, and 5 years of programming experience.<br />
          Specialized in back-end (Node.js), but also skilled in various languages and frameworks.
        </p>
        <h3 className="about__title" style={{ fontSize: "1.3rem", marginTop: "1.5rem" }}>Skills</h3>
        <div className="skills-list">
          <div className="skill">HTML</div>
          <div className="skill">CSS</div>
          <div className="skill">JavaScript</div>
          <div className="skill">Node.js</div>
          <div className="skill">React</div>
          <div className="skill">SQL</div>
        </div>
      </div>
    </section>
  );
}

export default About;