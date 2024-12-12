import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const response = await axios.post('http://localhost:5000/api/contact', formData); 
      setStatus('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus('Failed to send the message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-header">
        <h1 className="contact-title">We'd Love to Hear from You!</h1>
        <p className="contact-subtitle">Reach out with any questions, comments, or feedback.</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="input-animate"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="input-animate"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="input-animate"
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="input-animate"
          ></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {status && <div className="status-message">{status}</div>}
      <div className="floating-icons">
        <div className="icon email-icon">📧</div>
        <div className="icon phone-icon">📞</div>
        <div className="icon location-icon">📍</div>
      </div>
      <div className="background-circles">
        <div className="circle large-circle"></div>
        <div className="circle medium-circle"></div>
        <div className="circle small-circle"></div>
      </div>
    </div>
  );
};

export default ContactPage;
