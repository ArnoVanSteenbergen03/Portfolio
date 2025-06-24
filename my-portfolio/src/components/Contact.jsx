function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact">
        <h2 className="contact__title">Contact</h2>
        <form className="contact__form" method="POST" name="contact" data-netlify="true">
          <div className="form__group">
            <label className="form__label">Name</label>
            <input className="form__input" type="hidden" name="form-name" value="contact" required/>
          </div>
          <div className="form__group">
            <label className="form__label">Email</label>
            <input className="form__input" type="hidden" name="form-email" value="contact" required />
          </div>
          <div className="form__group">
            <label className="form__label">Message</label>
            <textarea className="form__text" id="message" name="message" rows="5" required />
          </div>
          <button type="submit" className="form__button">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
