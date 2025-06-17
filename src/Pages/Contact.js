import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Contact.css';
import Particles from '../Components/Particles';
import emailjs from '@emailjs/browser';
import { TbUfo } from "react-icons/tb";



function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("bMO2mbB2XNuNdaChG");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    // EmailJS configuration
    const serviceID = 'service_cta5wrj';
    const templateID = 'template_tpseysr';
    
    // Create template parameters
    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: new Date().toLocaleString(),
      to_email: 'hsgill2@asu.edu'
    };

    emailjs.send(serviceID, templateID, templateParams)
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setSubmitStatus({
          type: 'error',
          message: 'There was an error sending your message. Please try again later.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
  <div className="contact-page">
    <Particles />
    <div className="contact-container">
      <div className="contact-header">
        <div className="title-tab">
          <div className="header-text">
            <h1 className="gradient-title">Beam Me a Signal</h1>
            <p className="header-subtitle">
              Wherever you are, reach out—I'm here to connect. 
            </p>
          </div>
        </div>
      </div>

        <div className="contact-content">
          <form className="contact-form" onSubmit={handleSubmit} ref={form}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="email">Your Email (for replies)</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="subject">Subject</label>
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder=" "
              ></textarea>
              <label htmlFor="message">Message</label>
            </div>
            {submitStatus.message && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending...' : 'Beam me up'}</span>
              <TbUfo className="send-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
