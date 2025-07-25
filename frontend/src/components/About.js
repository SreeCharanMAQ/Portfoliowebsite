import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profile2Image from '../profile2.png';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

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
                <img 
                  src={profile2Image}
                  alt="K Sree Charan - About"
                  className="profile-about-photo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '15px',
                    display: 'block'
                  }}
                  onError={(e) => {
                    console.error('About image failed to load:', e);
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.style.cssText = `
                      width: 100%;
                      height: 100%;
                      background: linear-gradient(135deg, #1890ff, #722ed1);
                      border-radius: 15px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 2rem;
                      font-weight: bold;
                      color: white;
                    `;
                    fallback.textContent = 'About Me';
                    e.target.parentElement.appendChild(fallback);
                  }}
                  onLoad={(e) => {
                    console.log('About image loaded successfully!');
                  }}
                />
              </div>
              <div className="frame-decoration"></div>
            </div>
          </motion.div>
        </div>

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
