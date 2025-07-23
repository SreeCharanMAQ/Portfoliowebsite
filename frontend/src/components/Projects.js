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
      title: 'Study Buddy - AI Learning Assistant',
      description: 'An advanced AI-powered learning assistant that helps students master complex topics through personalized guidance, interactive exercises, and intelligent feedback.',
      image: "/project/study-buddy/main.jpg",
      technologies: ['React.js', 'Python', 'TensorFlow', 'Natural Language Processing', 'OpenAI API'],
      liveLink: 'https://study-buddy-demo.netlify.app',
      githubLink: 'https://github.com/SreeCharanMAQ/study-buddy',
      category: 'AI/ML',
      stats: { stars: 45, views: 1200, likes: 89 },
      featured: true
    },
    {
      id: 2,
      title: 'Health Buddy',
      description: 'AI-powered healthcare assistant for personalized wellness monitoring and medical advice. Uses machine learning to provide health insights based on user data.',
      image: "/project/health-buddy/main.jpg",
      technologies: ['React Native', 'TensorFlow', 'AWS', 'Firebase'],
      liveLink: 'https://health-buddy-demo.netlify.app',
      githubLink: 'https://github.com/SreeCharanMAQ/health-buddy',
      category: 'Healthcare',
      stats: { stars: 62, views: 1450, likes: 93 },
      featured: true
    },
    {
      id: 3,
      title: 'Agriculture Buddy',
      description: 'Smart farming solution with crop monitoring, prediction analytics, and resource management. Helps farmers optimize crop yields and resource usage.',
      image: "/project/agriculture-buddy/main.jpg",
      technologies: ['IoT', 'Machine Learning', 'React', 'Node.js'],
      liveLink: 'https://agri-buddy-demo.netlify.app',
      githubLink: 'https://github.com/SreeCharanMAQ/agri-buddy',
      category: 'AgriTech',
      stats: { stars: 48, views: 1050, likes: 77 },
      featured: true
    },
    {
      id: 4,
      title: 'Vision AI',
      description: 'Advanced computer vision platform for object detection, facial recognition, and scene understanding. Uses state-of-the-art AI models for real-time image analysis.',
      image: "/project/vision-ai/main.jpg",
      technologies: ['PyTorch', 'OpenCV', 'React', 'Flask'],
      liveLink: 'https://vision-ai-demo.netlify.app',
      githubLink: 'https://github.com/SreeCharanMAQ/vision-ai',
      category: 'AI/ML',
      stats: { stars: 85, views: 2200, likes: 137 },
      featured: true
    },
    {
      id: 5,
      title: 'Smart Predict',
      description: 'Predictive analytics tool for business intelligence and market forecasting. Leverages machine learning algorithms to provide actionable insights from complex data sets.',
      image: "/project/smart-predict/main.jpg",
      technologies: ['Python', 'R', 'D3.js', 'MongoDB'],
      liveLink: 'https://smart-predict-demo.netlify.app',
      githubLink: 'https://github.com/SreeCharanMAQ/smart-predict',
      category: 'Data Science',
      stats: { stars: 72, views: 1850, likes: 105 },
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
