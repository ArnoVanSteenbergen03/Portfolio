function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact">
        <h2 className="contact__title">Contact</h2>
        <ul className="contact__list">
          <li className="contact__item">
            <span role="img" aria-label="Phone">📞</span>
            <span>Phone: <a href="tel:0469420420">04.69/42.04.20</a></span>
          </li>
          <li className="contact__item">
            <span role="img" aria-label="Email">✉️</span>
            <span>
              Email: <a href="mailto:arnovans1@arteveldehs.be">arnovans1@arteveldehs.be</a>
            </span>
          </li>
          <li className="contact__item">
            <span role="img" aria-label="GitHub">💻</span>
            <a href="https://github.com/Suka-Baguette" target="_blank" rel="noopener noreferrer">
              Github Page
            </a>
          </li>
          <li className="contact__item">
            <span role="img" aria-label="LinkedIn">🔗</span>
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