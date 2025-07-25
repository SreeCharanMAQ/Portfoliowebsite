import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Projects.css';

const Projects = ({ triggerConfetti }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const projects = [
    {
      id: 1,
      title: "Study Buddy - AI Learning Assistant",
      description: "An advanced AI-powered learning assistant that helps students master complex topics through personalized guidance, interactive exercises, and intelligent feedback.",
      image: "/projectfolder/study-buddy/dashboard.png",
      technologies: ["React.js", "Python", "TensorFlow", "OpenAI API", "MongoDB"],
      category: "AI/ML",
      status: "Featured",
      github: "https://github.com/SreeCharan1234/study-buddy",
      demo: "https://study-buddy-demo.vercel.app",
      members: 4,
      duration: "3 months"
    },
    {
      id: 2,
      title: "Health Buddy - AI Healthcare Assistant",
      description: "AI-powered healthcare assistant for personalized wellness monitoring and medical advice. Uses machine learning for health insights and symptoms analysis.",
      image: "/projectfolder/health-buddy/dashbord.png",
      technologies: ["React Native", "TensorFlow", "AWS", "Firebase", "Python"],
      category: "Healthcare",
      status: "Featured", 
      github: "https://github.com/SreeCharan1234/health-buddy",
      demo: "https://health-buddy-app.vercel.app",
      members: 3,
      duration: "4 months"
    },
    {
      id: 3,
      title: "AgriVision - Smart Farming Solution",
      description: "Smart farming solution with crop monitoring, prediction analytics, and resource management. Helps farmers optimize yields through IoT and ML.",
      image: "/projectfolder/agrivision/landingpage.png",
      technologies: ["IoT", "Machine Learning", "React", "Node.js", "Python"],
      category: "AgriTech",
      status: "Featured",
      github: "https://github.com/SreeCharan1234/agrivision",
      demo: "https://agri-vision-demo.vercel.app",
      members: 4,
      duration: "5 months"
    },
    {
      id: 4,
      title: "Sarthi - Digital Assistant Platform",
      description: "Comprehensive digital assistant platform providing various services and utilities to enhance daily productivity and workflow management.",
      image: "/projectfolder/sarthi/home.png",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Payment Gateway"],
      category: "Productivity",
      status: "Completed",
      github: "https://github.com/SreeCharan1234/sarthi",
      demo: "https://sarthi-platform.vercel.app",
      members: 3,
      duration: "2 months"
    },
    {
      id: 5,
      title: "Surasksha Suchak - Security Solution",
      description: "Advanced security monitoring and management system designed to provide comprehensive protection and real-time threat detection.",
      image: "/projectfolder/surasksha-suchak/1.jpg",
      technologies: ["Python", "Computer Vision", "Flask", "AI/ML", "Security"],
      category: "Security",
      status: "Completed",
      github: "https://github.com/SreeCharan1234/surasksha-suchak",
      demo: "https://surasksha-demo.vercel.app",
      members: 2,
      duration: "3 months"
    },
    {
      id: 6,
      title: "Code Off Duty - Gaming Platform",
      description: "Interactive gaming platform with multiple games, challenges, and competitive features for developers and gaming enthusiasts.",
      image: "/projectfolder/code-off-duty/1.png",
      technologies: ["Unity", "C#", "JavaScript", "WebGL", "Game Development"],
      category: "Gaming",
      status: "Completed",
      github: "https://github.com/SreeCharan1234/code-off-duty",
      demo: "https://code-off-duty.vercel.app",
      members: 4,
      duration: "4 months"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleCardClick = () => {
    if (triggerConfetti) {
      triggerConfetti();
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="title-accent">My</span> Projects
          </h2>
          <p className="section-subtitle">
            Showcasing innovative solutions and creative implementations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="projects-grid"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="project-card"
              onClick={handleCardClick}
            >
              <div className="project-image-container">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                      title="View GitHub"
                    >
                      <span>📦</span>
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                      title="View Demo"
                    >
                      <span>🔗</span>
                    </a>
                  </div>
                </div>
                <div className="project-status">
                  <span className={`status-badge ${project.status.toLowerCase()}`}>
                    {project.status === 'Featured' && <span>⭐</span>}
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="project-content">
                <div className="project-category">
                  {project.category}
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                
                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-meta">
                  <div className="meta-item">
                    <span>👥</span>
                    <span>{project.members} members</span>
                  </div>
                  <div className="meta-item">
                    <span>📅</span>
                    <span>{project.duration}</span>
                  </div>
                </div>

                <div className="project-technologies">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag more">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="project-actions">
                  <button 
                    className="view-project-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/project/${project.id}`);
                    }}
                  >
                    View Project
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
