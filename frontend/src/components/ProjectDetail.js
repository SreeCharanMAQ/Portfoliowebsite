import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import projectsDetailData from '../data/projectsDetailData';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [project, setProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  useEffect(() => {
    const projectData = projectsDetailData[parseInt(id)];
    if (projectData) {
      setProject(projectData);
      setSelectedImage(projectData.gallery[0]);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="project-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  const handleImageSelect = (image, index) => {
    setSelectedImage(image);
    setCurrentGalleryIndex(index);
  };

  const nextImage = () => {
    const nextIndex = (currentGalleryIndex + 1) % project.gallery.length;
    setSelectedImage(project.gallery[nextIndex]);
    setCurrentGalleryIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = currentGalleryIndex === 0 ? project.gallery.length - 1 : currentGalleryIndex - 1;
    setSelectedImage(project.gallery[prevIndex]);
    setCurrentGalleryIndex(prevIndex);
  };

  return (
    <>
      <Navbar />
      <div className="project-detail-container">
      {/* Header Section */}
      <motion.div 
        className="project-detail-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Portfolio
        </button>
        
        <div className="project-header-content">
          <div className="project-title-section">
            <h1 className="project-title">{project.title}</h1>
            <p className="project-category">{project.category}</p>
            <div className="project-status">
              <span className={`status-badge ${project.status.toLowerCase()}`}>
                ⭐ {project.status}
              </span>
            </div>
          </div>
          
          <div className="project-links">
            <a href={project.github} className="project-link github-link" target="_blank" rel="noopener noreferrer">
              📦 GitHub
            </a>
            <a href={project.demo} className="project-link demo-link" target="_blank" rel="noopener noreferrer">
              🔗 Live Demo
            </a>
          </div>
        </div>
      </motion.div>

      {/* Project Overview */}
      <motion.div 
        className="project-overview"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="overview-grid">
          <div className="overview-main">
            <h2>Project Overview</h2>
            <p className="project-description">{project.longDescription}</p>
            
            <div className="project-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <div>
                  <span className="stat-label">Team Members</span>
                  <span className="stat-value">{project.members}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📅</span>
                <div>
                  <span className="stat-label">Duration</span>
                  <span className="stat-value">{project.duration}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🚀</span>
                <div>
                  <span className="stat-label">Start Date</span>
                  <span className="stat-value">{project.startDate}</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🏁</span>
                <div>
                  <span className="stat-label">End Date</span>
                  <span className="stat-value">{project.endDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overview-sidebar">
            <div className="tech-stack">
              <h3>Tech Stack</h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Image Gallery Section */}
      <motion.div 
        className="gallery-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2>Project Gallery</h2>
        
        {/* Main Image Display */}
        <div className="main-image-container">
          <button className="gallery-nav prev" onClick={prevImage}>
            ◀
          </button>
          
          <div className="main-image-wrapper">
            <img 
              src={selectedImage?.url} 
              alt={selectedImage?.title}
              className="main-gallery-image"
            />
            <div className="image-info">
              <h3>{selectedImage?.title}</h3>
              <p>{selectedImage?.description}</p>
              <span className="image-counter">
                {currentGalleryIndex + 1} / {project.gallery.length}
              </span>
            </div>
          </div>
          
          <button className="gallery-nav next" onClick={nextImage}>
            ▶
          </button>
        </div>

        {/* Thumbnail Gallery */}
        <div className="thumbnail-gallery">
          {project.gallery.map((image, index) => (
            <div 
              key={index}
              className={`thumbnail ${index === currentGalleryIndex ? 'active' : ''}`}
              onClick={() => handleImageSelect(image, index)}
            >
              <img src={image.url} alt={image.title} />
              <div className="thumbnail-overlay">
                <span>{image.title}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="features-section"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2>Key Features</h2>
        <div className="features-grid">
          {project.features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="feature-icon">✨</div>
              <div className="feature-content">
                <h4>{feature.split(':')[0]}</h4>
                <p>{feature.split(':')[1]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Members Section */}
      <motion.div 
        className="team-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2>Team Members</h2>
        <div className="team-grid">
          {project.teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="team-member-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="member-avatar">
                <img src="/profile.jpg" alt={member.name} />
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Challenges & Solutions */}
      <motion.div 
        className="challenges-solutions-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <div className="challenges-solutions-grid">
          <div className="challenges">
            <h2>Challenges</h2>
            <div className="challenge-list">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="challenge-item">
                  <span className="challenge-icon">⚡</span>
                  <p>{challenge}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="solutions">
            <h2>Solutions</h2>
            <div className="solution-list">
              {project.solutions.map((solution, index) => (
                <div key={index} className="solution-item">
                  <span className="solution-icon">💡</span>
                  <p>{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Footer */}
      <motion.div 
        className="project-navigation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <button 
          className="nav-project-btn"
          onClick={() => navigate(`/project/${parseInt(id) > 1 ? parseInt(id) - 1 : 6}`)}
        >
          ← Previous Project
        </button>
        
        <button 
          className="back-to-projects-btn"
          onClick={() => navigate('/')}
        >
          Back to All Projects
        </button>
        
        <button 
          className="nav-project-btn"
          onClick={() => navigate(`/project/${parseInt(id) < 6 ? parseInt(id) + 1 : 1}`)}
        >
          Next Project →
        </button>
      </motion.div>
    </div>
    </>
  );
};

export default ProjectDetail;
