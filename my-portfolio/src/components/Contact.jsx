function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact">
        <h2 className="contact__title">Contact</h2>
        <ul className="contact__list">
          <li className="contact__item">Phone Nr: 04.69/42.04.20</li>
          <li className="contact__item">
            Email: <a href="mailto:arnovans1@arteveldehs.be">arnovans1@arteveldehs.be</a>
          </li>
          <li className="contact__item">
            <a href="https://github.com/Suka-Baguette" target="_blank" rel="noopener noreferrer">
              Github Page
            </a>
          </li>
          <li className="contact__item">
            <a
              href="https://www.linkedin.com/in/arno-van-steenbergen-a6092a290/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin page
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Contact;