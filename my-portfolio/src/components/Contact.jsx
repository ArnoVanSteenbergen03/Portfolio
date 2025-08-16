import { useState } from 'react';

function Contact() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Netlify form submission
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="contact">
        <h2 className="contact__title">Contact</h2>
        <p className="contact__description">
          Get in touch! I'd love to hear about your project ideas and opportunities.
        </p>
        
        <form 
          className="contact__form" 
          method="POST" 
          name="contact" 
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          
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
            <a href="mailto:arno.vansteenbergen@example.com" className="contact__link">
              📧 arno.vansteenbergen@example.com
            </a>
            <a href="https://linkedin.com/in/yourprofile" className="contact__link">
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
