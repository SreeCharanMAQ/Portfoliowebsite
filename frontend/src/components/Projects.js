import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, Button, Tag, Space, Typography, Tooltip } from 'antd';
import { 
  ExternalLinkOutlined, GithubOutlined, PlayCircleOutlined,
  StarOutlined, EyeOutlined, HeartOutlined 
} from '@ant-design/icons';
import { FiExternalLink, FiGithub, FiPlay } from 'react-icons/fi';
import './Projects.css';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const Projects = ({ triggerConfetti }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application with React frontend and Python Flask backend. Features include user authentication, product catalog, shopping cart, and payment integration.',
      image: '/project1.jpg',
      technologies: ['React', 'Flask', 'MongoDB', 'Stripe API', 'JWT'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Full Stack'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates. Built with React and Node.js, featuring drag-and-drop functionality and team collaboration tools.',
      image: '/project2.jpg',
      technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redux'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Web App'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A responsive weather dashboard that displays current weather and forecasts for multiple cities. Integrated with weather APIs and features interactive charts.',
      image: '/project3.jpg',
      technologies: ['React', 'Chart.js', 'Weather API', 'CSS3', 'LocalStorage'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Frontend'
    },
    {
      id: 4,
      title: 'Blog CMS',
      description: 'A content management system for blogs with rich text editor, image uploads, and SEO optimization. Admin panel for managing posts, users, and analytics.',
      image: '/project4.jpg',
      technologies: ['Next.js', 'Python', 'FastAPI', 'MySQL', 'AWS S3'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'CMS'
    },
    {
      id: 5,
      title: 'Real-time Chat App',
      description: 'A real-time messaging application with group chats, file sharing, and emoji reactions. Features include message encryption and user presence indicators.',
      image: '/project5.jpg',
      technologies: ['React', 'Socket.io', 'Express', 'MongoDB', 'JWT'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Real-time'
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'This very portfolio website showcasing modern web development practices with beautiful animations, responsive design, and performance optimization.',
      image: '/project6.jpg',
      technologies: ['React', 'Framer Motion', 'CSS3', 'Python Flask'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/example',
      category: 'Portfolio'
    }
  ];

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here are some of my recent projects that showcase my skills and experience
        </motion.p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <div className="image-placeholder">
                  <FiPlay className="play-icon" />
                  <span>Project Demo</span>
                </div>
                <div className="project-overlay">
                  <div className="project-links">
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FiExternalLink />
                    </a>
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FiGithub />
                    </a>
                  </div>
                </div>
                <div className="project-category">{project.category}</div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <FiExternalLink className="btn-icon" />
                    Live Demo
                  </a>
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <FiGithub className="btn-icon" />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>Want to see more?</h3>
          <p>Check out my GitHub for more projects and code samples</p>
          <a 
            href="https://github.com/SreeCharanMAQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FiGithub className="btn-icon" />
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
