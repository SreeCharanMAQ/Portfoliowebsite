import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Form, Input, Button, Card, Space, Typography, message, 
  Row, Col, Divider, Avatar, Tag
} from 'antd';
import { 
  MailOutlined, PhoneOutlined, EnvironmentOutlined, 
  SendOutlined, GithubOutlined, LinkedinOutlined,
  TwitterOutlined, InstagramOutlined, HeartOutlined
} from '@ant-design/icons';
import { 
  FiMail, FiPhone, FiMapPin, FiSend, FiGithub, 
  FiLinkedin, FiTwitter, FiInstagram 
} from 'react-icons/fi';
import axios from 'axios';
import LottieAnimation from './LottieAnimation';
import './Contact.css';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact = ({ triggerConfetti }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
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
      const response = await axios.post('/api/contact', formData);
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        // Trigger confetti on successful form submission
        if (triggerConfetti) {
          triggerConfetti();
        }
        message.success('Message sent successfully! 🎉');
      } else {
        setSubmitStatus('error');
        message.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      message.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email',
      info: 'sreecharan@example.com',
      link: 'mailto:sreecharan@example.com'
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      info: '+91 12345 67890',
      link: 'tel:+911234567890'
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      info: 'Hyderabad, India',
      link: 'https://maps.google.com'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FiGithub />,
      url: 'https://github.com/SreeCharanMAQ',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin />,
      url: 'https://linkedin.com/in/sreecharan',
      color: '#0077B5'
    },
    {
      name: 'Twitter',
      icon: <FiTwitter />,
      url: 'https://twitter.com/sreecharan',
      color: '#1DA1F2'
    },
    {
      name: 'Instagram',
      icon: <FiInstagram />,
      url: 'https://instagram.com/sreecharan',
      color: '#E4405F'
    }
  ];

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? I'd love to hear from you!
        </motion.p>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-description">
              I'm always open to discussing new opportunities, creative projects, 
              or potential collaborations. Feel free to reach out!
            </p>

            <div className="contact-methods">
              {contactInfo.map((contact, index) => (
                <motion.a
                  key={contact.title}
                  href={contact.link}
                  className="contact-method"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="contact-icon">{contact.icon}</div>
                  <div className="contact-details">
                    <span className="contact-title">{contact.title}</span>
                    <span className="contact-text">{contact.info}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="social-links">
              <h4>Follow Me</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    style={{ '--social-color': social.color }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -5 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="form-input form-textarea"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="form-submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <FiSend className="btn-icon" />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus && (
                <motion.div
                  className={`submit-status ${submitStatus}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {submitStatus === 'success' 
                    ? 'Message sent successfully! I\'ll get back to you soon.' 
                    : 'Failed to send message. Please try again.'
                  }
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
