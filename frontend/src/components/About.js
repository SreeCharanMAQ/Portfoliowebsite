import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiHeart, FiZap } from 'react-icons/fi';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const stats = [
    { number: '2+', label: 'Years Experience', icon: <FiCode /> },
    { number: '15+', label: 'Projects Completed', icon: <FiZap /> },
    { number: '100%', label: 'Client Satisfaction', icon: <FiHeart /> }
  ];

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="about-subtitle">
              Passionate <span className="text-gradient">Full Stack Developer</span>
            </h3>
            
            <p className="about-description">
              I'm a dedicated software engineer with a strong foundation in both frontend 
              and backend technologies. My journey in programming started during my college 
              years, and since then, I've been passionate about creating innovative solutions 
              that make a difference.
            </p>

            <p className="about-description">
              I specialize in modern web technologies including React, Node.js, Python, 
              and various databases. I love tackling complex problems and turning ideas 
              into reality through clean, efficient code.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-number">🎯</span>
                <span className="highlight-text">Problem-solving mindset</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">🚀</span>
                <span className="highlight-text">Fast learner & adaptable</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">👥</span>
                <span className="highlight-text">Great team collaborator</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">💡</span>
                <span className="highlight-text">Creative & innovative</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-image animate-float"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="image-frame glass-effect hover-lift">
              <div className="about-photo animate-morphing">
                <span>Professional Photo</span>
              </div>
              <div className="frame-decoration"></div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item glass-effect hover-lift animate-bounce-in"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="about-philosophy"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <blockquote className="philosophy-quote">
            "Code is like humor. When you have to explain it, it's bad."
            <cite>- Cory House</cite>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
