import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, Button, Tag, Space, Typography, Tooltip, Badge } from 'antd';
import { 
  ExternalLinkOutlined, GithubOutlined, PlayCircleOutlined,
  StarOutlined, EyeOutlined, HeartOutlined, RocketOutlined,
  CodeOutlined, TeamOutlined, ClockCircleOutlined
} from '@ant-design/icons';
import { FiExternalLink, FiGithub, FiPlay, FiStar, FiEye, FiHeart, FiCode } from 'react-icons/fi';
import { Tilt } from 'react-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import projectImage from '../1730525784027.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Projects.css';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const Projects = ({ triggerConfetti }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  // Transform scroll progress to move projects from right to left
  const x1 = useTransform(scrollXProgress, [0, 1], [100, -100]);
  const x2 = useTransform(scrollXProgress, [0, 1], [200, -200]);
  const x3 = useTransform(scrollXProgress, [0, 1], [300, -300]);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application with React frontend and Python Flask backend. Features include user authentication, product catalog, shopping cart, and payment integration.',
      image: projectImage,
      technologies: ['React', 'Flask', 'MongoDB', 'Stripe API', 'JWT'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Full Stack',
      stats: { stars: 45, views: 1200, likes: 89 },
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates. Built with React and Node.js, featuring drag-and-drop functionality and team collaboration tools.',
      image: projectImage,
      technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redux'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Web App',
      stats: { stars: 32, views: 890, likes: 67 },
      featured: false
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather and forecasts for multiple cities. Integrated with weather APIs and features interactive charts.',
      image: projectImage,
      technologies: ['React', 'Chart.js', 'Weather API', 'CSS3', 'LocalStorage'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Frontend',
      stats: { stars: 28, views: 650, likes: 45 },
      featured: false
    },
    {
      id: 4,
      title: 'Blog CMS',
      description: 'A content management system for blogs with rich text editor, image uploads, and SEO optimization. Admin panel for managing posts, users, and analytics.',
      image: projectImage,
      technologies: ['Next.js', 'Python', 'FastAPI', 'MySQL', 'AWS S3'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'CMS',
      stats: { stars: 38, views: 920, likes: 72 },
      featured: true
    },
    {
      id: 5,
      title: 'Real-time Chat App',
      description: 'A real-time messaging application with group chats, file sharing, and emoji reactions. Features include message encryption and user presence indicators.',
      image: projectImage,
      technologies: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Real-time',
      stats: { stars: 52, views: 1450, likes: 95 },
      featured: true
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'This very portfolio website showcasing modern web development practices with beautiful animations, responsive design, and performance optimization.',
      image: projectImage,
      technologies: ['React', 'Framer Motion', 'CSS3', 'Python Flask'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Portfolio',
      stats: { stars: 61, views: 2100, likes: 128 },
      featured: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      x: 100,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        {/* Enhanced Header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="section-title"
            style={{
              background: 'linear-gradient(45deg, #1890ff, #722ed1, #52c41a)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              backgroundSize: '200% 200%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Featured Projects
          </motion.h2>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.span
              animate={{ color: ['#1890ff', '#722ed1', '#52c41a', '#1890ff'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Innovative solutions
            </motion.span>
            {' '}built with modern technologies and creative passion
          </motion.p>
        </motion.div>

        {/* Horizontal Scrolling Projects Showcase */}
        <motion.div
          className="projects-horizontal-scroll"
          ref={scrollRef}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="projects-swiper"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.id} className="project-slide">
                <Tilt
                  options={{
                    max: 15,
                    scale: 1.02,
                    speed: 1000,
                    glare: true,
                    'max-glare': 0.2
                  }}
                >
                  <motion.div
                    className="enhanced-project-card"
                    variants={projectVariants}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -10,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      rotateX: 5
                    }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setSelectedProject(project.id)}
                    onHoverEnd={() => setSelectedProject(null)}
                  >
                    {/* Project Image with Advanced Overlay */}
                    <div className="project-image-container">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="project-image"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Floating Stats */}
                      <motion.div
                        className="floating-stats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={selectedProject === project.id ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge count={project.stats.stars} className="stat-badge">
                          <FiStar style={{ color: '#faad14' }} />
                        </Badge>
                        <Badge count={project.stats.views} className="stat-badge">
                          <FiEye style={{ color: '#1890ff' }} />
                        </Badge>
                        <Badge count={project.stats.likes} className="stat-badge">
                          <FiHeart style={{ color: '#eb2f96' }} />
                        </Badge>
                      </motion.div>

                      {/* Category Badge */}
                      <motion.div
                        className="category-badge"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {project.featured && <RocketOutlined />}
                        {project.category}
                      </motion.div>

                      {/* Interactive Overlay */}
                      <motion.div
                        className="project-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="overlay-content">
                          <motion.a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="overlay-button live-button"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => triggerConfetti && triggerConfetti()}
                          >
                            <FiExternalLink />
                            <span>Live Demo</span>
                          </motion.a>
                          
                          <motion.a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="overlay-button github-button"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiGithub />
                            <span>Source</span>
                          </motion.a>
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="enhanced-project-content">
                      <motion.h3
                        className="project-title"
                        animate={{
                          color: selectedProject === project.id ? 
                            ['#1890ff', '#722ed1', '#52c41a', '#1890ff'] : '#ffffff'
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {project.title}
                      </motion.h3>

                      <p className="project-description">{project.description}</p>

                      {/* Animated Tech Stack */}
                      <div className="tech-stack">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="tech-tag"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ 
                              duration: 0.5, 
                              delay: 0.8 + techIndex * 0.1,
                              type: "spring",
                              stiffness: 100
                            }}
                            whileHover={{ 
                              scale: 1.2, 
                              y: -5,
                              color: tech.includes('React') ? '#61DAFB' :
                                    tech.includes('Python') ? '#3776AB' :
                                    tech.includes('Node') ? '#339933' :
                                    tech.includes('MongoDB') ? '#47A248' :
                                    '#1890ff'
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="project-actions">
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-button primary"
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 10px 25px rgba(24, 144, 255, 0.3)'
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PlayCircleOutlined />
                          Demo
                        </motion.a>
                        
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-button secondary"
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 10px 25px rgba(114, 46, 209, 0.3)'
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiCode />
                          Code
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </Tilt>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="cta-content"
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3
              animate={{
                color: ['#1890ff', '#722ed1', '#52c41a', '#fa541c', '#1890ff']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to explore more?
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Discover additional projects and innovations on my GitHub
            </motion.p>
            
            <motion.a
              href="https://github.com/SreeCharanMAQ"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: '0 15px 30px rgba(24, 144, 255, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 5px 15px rgba(24, 144, 255, 0.2)',
                  '0 10px 25px rgba(114, 46, 209, 0.3)',
                  '0 5px 15px rgba(82, 196, 26, 0.2)',
                  '0 5px 15px rgba(24, 144, 255, 0.2)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiGithub className="cta-icon" />
              <span>View All Projects</span>
              <motion.div
                className="button-glow"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
