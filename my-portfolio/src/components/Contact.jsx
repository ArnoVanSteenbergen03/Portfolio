import { useState, useEffect } from 'react';

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ 
        "form-name": "contact",
        ...formData 
      })
    })
    .then(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch(() => {
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section className="section" id="contact">
      <div className="contact">
        <h2 className="contact__title">Contact</h2>
        <p className="contact__description">
          Get in touch! I'd love to hear about your project ideas and opportunities.
        </p>
        
        <form name="contact" netlify netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
        </form>
        
        <form 
          className="contact__form" 
          onSubmit={handleSubmit}
        >
          <div className="form__group">
            <label className="form__label" htmlFor="name">Name</label>
            <input 
              className="form__input" 
              type="text"
              id="name"
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form__group">
            <label className="form__label" htmlFor="email">Email</label>
            <input 
              className="form__input" 
              type="email"
              id="email"
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form__group">
            <label className="form__label" htmlFor="message">Message</label>
            <textarea 
              className="form__text" 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="form__button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <div className="form__message form__message--success">
              ✅ Message sent successfully! I'll get back to you soon.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="form__message form__message--error">
              ❌ Something went wrong. Please try again or email me directly.
            </div>
          )}
        </form>

        <div className="contact__info">
          <h3>Other Ways to Reach Me</h3>
          <div className="contact__links">
            <a href="mailto:arno.van.steenbergen1@gmail.com" className="contact__link">
              📧 arno.van.steenbergen1@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/arno-van-steenbergen-a6092a290?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BpJl0cMCrRqG90F53%2B7KzPw%3D%3D" className="contact__link">
              💼 LinkedIn
            </a>
            <a href="https://github.com/ArnoVanSteenbergen03" className="contact__link">
              🐙 GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
