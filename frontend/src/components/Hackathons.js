import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, Tag, Button } from 'antd';
import { TrophyOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { FiAward, FiUsers, FiCalendar, FiExternalLink, FiEye } from 'react-icons/fi';
import './Hackathons.css';

const Hackathons = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const hackathons = [
    {
      id: 1,
      title: "Smart City Solutions Hackathon",
      event: "TechFest 2024",
      position: "1st Place",
      date: "March 2024",
      description: "Developed an AI-powered traffic management system that reduces congestion by 30% using real-time data analysis.",
      technologies: ["React", "Python", "TensorFlow", "MongoDB"],
      team: "4 members",
      prize: "₹50,000",
      image: "/hackathon1.jpg",
      link: "https://github.com/sreecharan/smart-traffic"
    },
    {
      id: 2,
      title: "FinTech Innovation Challenge",
      event: "Banking Summit 2024",
      position: "1st Place",
      date: "February 2024",
      description: "Created a blockchain-based micro-lending platform for rural communities with 99.9% security rating.",
      technologies: ["Blockchain", "Solidity", "React", "Node.js"],
      team: "3 members",
      prize: "₹75,000",
      image: "/hackathon2.jpg",
      link: "https://github.com/sreecharan/rural-lending"
    },
    {
      id: 3,
      title: "Healthcare AI Hackathon",
      event: "MedTech 2023",
      position: "2nd Place",
      date: "December 2023",
      description: "Built an AI diagnostic tool for early detection of diseases using medical imaging with 95% accuracy.",
      technologies: ["Python", "PyTorch", "Flask", "OpenCV"],
      team: "5 members",
      prize: "₹30,000",
      image: "/hackathon3.jpg",
      link: "https://github.com/sreecharan/medical-ai"
    },
    {
      id: 4,
      title: "Sustainable Tech Challenge",
      event: "EcoHack 2023",
      position: "1st Place",
      date: "November 2023",
      description: "Designed an IoT-based waste management system that optimizes collection routes and reduces costs by 40%.",
      technologies: ["IoT", "Arduino", "React", "Firebase"],
      team: "4 members",
      prize: "₹45,000",
      image: "/hackathon4.jpg",
      link: "https://github.com/sreecharan/smart-waste"
    },
    {
      id: 5,
      title: "EdTech Innovation Sprint",
      event: "EduTech 2023",
      position: "1st Place",
      date: "October 2023",
      description: "Developed an AR-based learning platform that increases student engagement by 60% in STEM subjects.",
      technologies: ["Unity", "C#", "AR Core", "Firebase"],
      team: "3 members",
      prize: "₹35,000",
      image: "/hackathon5.jpg",
      link: "https://github.com/sreecharan/ar-learning"
    },
    {
      id: 6,
      title: "Cybersecurity Defense Challenge",
      event: "SecureTech 2023",
      position: "2nd Place",
      date: "September 2023",
      description: "Created an advanced threat detection system using machine learning to identify cyber attacks in real-time.",
      technologies: ["Python", "Scikit-learn", "Docker", "Kafka"],
      team: "4 members",
      prize: "₹25,000",
      image: "/hackathon6.jpg",
      link: "https://github.com/sreecharan/threat-detection"
    },
    {
      id: 7,
      title: "Agriculture Tech Hackathon",
      event: "AgriTech 2023",
      position: "1st Place",
      date: "August 2023",
      description: "Built a drone-based crop monitoring system with AI analysis that helps farmers increase yield by 25%.",
      technologies: ["Python", "OpenCV", "Raspberry Pi", "React"],
      team: "5 members",
      prize: "₹40,000",
      image: "/hackathon7.jpg",
      link: "https://github.com/sreecharan/agri-drone"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getPositionColor = (position) => {
    if (position.includes('1st')) return '#gold';
    if (position.includes('2nd')) return '#silver';
    if (position.includes('3rd')) return '#bronze';
    return '#1890ff';
  };

  const getPositionIcon = (position) => {
    if (position.includes('1st')) return '🥇';
    if (position.includes('2nd')) return '🥈';
    if (position.includes('3rd')) return '🥉';
    return '🏆';
  };

  return (
    <section id="hackathons" className="section hackathons" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <TrophyOutlined className="title-icon" />
            Hackathon Victories
          </h2>
          <p className="section-subtitle">
            7 hackathons won with innovative solutions that make a real impact
          </p>
        </motion.div>

        <motion.div
          className="hackathons-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              className="hackathon-card"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <Card
                className="hackathon-card-content"
                cover={
                  <div className="hackathon-image">
                    <img 
                      src={hackathon.image} 
                      alt={hackathon.title}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhhY2thdGhvbiBQcm9qZWN0PC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                    <div className="hackathon-overlay">
                      <div className="position-badge">
                        <span className="position-icon">{getPositionIcon(hackathon.position)}</span>
                        <span className="position-text">{hackathon.position}</span>
                      </div>
                    </div>
                  </div>
                }
                actions={[
                  <Button 
                    type="primary" 
                    icon={<FiEye />}
                    onClick={() => window.open(`/hackathon/${hackathon.id}`, '_blank')}
                    className="view-project-btn"
                  >
                    View Details
                  </Button>,
                  <Button 
                    icon={<FiExternalLink />}
                    href={hackathon.link}
                    target="_blank"
                    className="github-btn"
                  >
                    GitHub
                  </Button>
                ]}
              >
                <div className="hackathon-header">
                  <h3 className="hackathon-title">{hackathon.title}</h3>
                  <Tag color="blue" className="event-tag">
                    {hackathon.event}
                  </Tag>
                </div>

                <div className="hackathon-meta">
                  <div className="meta-item">
                    <CalendarOutlined />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="meta-item">
                    <TeamOutlined />
                    <span>{hackathon.team}</span>
                  </div>
                  <div className="meta-item prize">
                    <TrophyOutlined />
                    <span>{hackathon.prize}</span>
                  </div>
                </div>

                <p className="hackathon-description">
                  {hackathon.description}
                </p>

                <div className="hackathon-technologies">
                  {hackathon.technologies.map((tech, techIndex) => (
                    <Tag 
                      key={techIndex} 
                      className="tech-tag"
                      color={`hsl(${techIndex * 60}, 70%, 50%)`}
                    >
                      {tech}
                    </Tag>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="hackathons-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="stat-item">
            <div className="stat-number">7</div>
            <div className="stat-label">Hackathons Won</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5</div>
            <div className="stat-label">First Places</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">₹3L+</div>
            <div className="stat-label">Total Prize Money</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30+</div>
            <div className="stat-label">Team Members</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathons;
