import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button, Typography, Space, Tag, Tooltip } from 'antd';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiStar, FiCode, FiHeart } from 'react-icons/fi';
import { DownloadOutlined, HeartOutlined, StarOutlined } from '@ant-design/icons';
import Typed from 'typed.js';
import LottieAnimation from './LottieAnimation';
import './Hero.css';

const { Title, Paragraph } = Typography;

const Hero = ({ triggerConfetti }) => {
  const canvasRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    // Initialize Typed.js
    const typed = new Typed(typedRef.current, {
      strings: [
        'Full Stack Developer',
        'React Developer',
        'Python Developer',
        'Software Engineer',
        'Problem Solver'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    return () => typed.destroy();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particle, index) => {
        for (let i = index + 1; i < particles.length; i++) {
          const dx = particle.x - particles[i].x;
          const dy = particle.y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const downloadResume = () => {
    // This would download your actual resume
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'K_Sree_Charan_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="hero-title animate-gradient"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ 
                color: ['#333', '#1890ff', '#722ed1', '#52c41a', '#333']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Hi, I'm
            </motion.span>{' '}
            <motion.span 
              className="text-gradient"
              animate={{ 
                background: [
                  'linear-gradient(45deg, #1890ff, #722ed1)',
                  'linear-gradient(45deg, #722ed1, #52c41a)',
                  'linear-gradient(45deg, #52c41a, #fa541c)',
                  'linear-gradient(45deg, #fa541c, #1890ff)'
                ]
              }}
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ 
                scale: 1.1,
                textShadow: '0 0 20px rgba(24, 144, 255, 0.5)'
              }}
            >
              K Sree Charan
            </motion.span>
          </motion.h1>

          <motion.div
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <motion.span 
              ref={typedRef}
              animate={{ 
                color: ['#666', '#1890ff', '#722ed1', '#666']
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            ></motion.span>
            <Space style={{ marginLeft: 10 }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Tag color="processing" icon={<FiCode />}>React Expert</Tag>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Tag color="success" icon={<FiHeart />}>Python Lover</Tag>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Tag color="warning" icon={<FiStar />}>Problem Solver</Tag>
              </motion.div>
            </Space>
          </motion.div>

          <motion.div
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              style={{ fontSize: '1.1rem', lineHeight: 1.6 }}
              animate={{ 
                color: ['#666', '#1890ff', '#722ed1', '#52c41a', '#666']
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span whileHover={{ color: '#fa541c' }}>
                Passionate about creating elegant solutions to complex problems.
              </motion.span>{' '}
              <motion.span whileHover={{ color: '#1890ff' }}>
                I specialize in building modern web applications with cutting-edge technologies.
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Space size="large">
              <Tooltip title="Let's connect and create something amazing!">
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: '0 10px 30px rgba(24, 144, 255, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    type="primary"
                    size="large"
                    onClick={(e) => {
                      e.preventDefault();
                      if (triggerConfetti) triggerConfetti();
                      setTimeout(() => {
                        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                      }, 500);
                    }}
                    style={{
                      background: 'linear-gradient(45deg, #1890ff, #722ed1)',
                      border: 'none',
                      borderRadius: '50px',
                      height: '50px',
                      padding: '0 30px'
                    }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <HeartOutlined />
                    </motion.span> Get In Touch
                  </Button>
                </motion.div>
              </Tooltip>

              <Tooltip title="Download my latest resume">
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: '0 10px 30px rgba(114, 46, 209, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    size="large"
                    icon={<motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <DownloadOutlined />
                    </motion.div>}
                    onClick={(e) => {
                      downloadResume();
                      if (triggerConfetti) triggerConfetti();
                    }}
                    style={{
                      borderRadius: '50px',
                      height: '50px',
                      padding: '0 30px',
                      borderColor: '#722ed1',
                      color: '#722ed1'
                    }}
                  >
                    Download Resume
                  </Button>
                </motion.div>
              </Tooltip>
            </Space>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.a
              href="https://github.com/SreeCharanMAQ"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ 
                scale: 1.3, 
                y: -8, 
                color: '#333',
                boxShadow: '0 8px 25px rgba(51, 51, 51, 0.3)',
                rotate: 5
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiGithub />
              </motion.div>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/sreecharan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ 
                scale: 1.3, 
                y: -8, 
                color: '#1890ff',
                boxShadow: '0 8px 25px rgba(24, 144, 255, 0.3)',
                rotate: -5
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiLinkedin />
              </motion.div>
            </motion.a>

            <motion.a
              href="mailto:sreecharan@example.com"
              className="social-link"
              whileHover={{ 
                scale: 1.3, 
                y: -8, 
                color: '#fa541c',
                boxShadow: '0 8px 25px rgba(245, 84, 28, 0.3)',
                rotate: 5
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiMail />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image animate-float"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="image-container animate-morphing hover-lift">
            <div className="image-placeholder glass-effect">
              <LottieAnimation 
                width={200} 
                height={200}
                className="hero-lottie"
              />
              <span style={{ 
                position: 'absolute', 
                bottom: '10px', 
                fontSize: '0.9rem',
                color: 'var(--text-secondary)'
              }}>
                K Sree Charan
              </span>
            </div>
            <div className="image-glow"></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="scroll-line"></div>
        <span>Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
