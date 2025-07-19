import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, Tag, Card, Image, Carousel, Timeline, Statistic, 
  Row, Col, Typography, Space, Divider 
} from 'antd';
import { 
  ArrowLeftOutlined, GithubOutlined, LinkOutlined, 
  TrophyOutlined, CalendarOutlined, TeamOutlined,
  EyeOutlined, StarOutlined, ForkOutlined,
  LinkedinOutlined, PlayCircleOutlined
} from '@ant-design/icons';
import { FiExternalLink, FiCode, FiUsers, FiAward } from 'react-icons/fi';
import './HackathonDetail.css';

const { Title, Paragraph, Text } = Typography;

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Comprehensive hackathon data with detailed project information
  const hackathonData = {
    1: {
      id: 1,
      title: "Smart City Solutions Hackathon",
      event: "TechFest 2024",
      position: "🥇 1st Place Winner",
      date: "March 15-17, 2024",
      location: "IIT Bombay, Mumbai",
      description: "Developed an AI-powered traffic management system that reduces congestion by 30% using real-time data analysis and machine learning algorithms.",
      problemStatement: "Urban traffic congestion costs cities billions annually. Traditional traffic management systems are reactive rather than predictive, leading to inefficient traffic flow and increased pollution.",
      solution: "Our AI-powered system uses real-time traffic data, weather conditions, and event schedules to predict and prevent traffic congestion before it happens.",
      technologies: ["React", "Python", "TensorFlow", "MongoDB", "Redis", "Socket.io", "Docker"],
      team: [
        { name: "Sree Charan", role: "Full Stack Developer & Team Lead" },
        { name: "Priya Singh", role: "AI/ML Engineer" },
        { name: "Rajesh Kumar", role: "Backend Developer" },
        { name: "Anita Sharma", role: "UI/UX Designer" }
      ],
      prize: "₹50,000 + Internship Opportunity",
      participants: 200,
      teams: 50,
      duration: "48 hours",
      theme: "Smart Cities & Sustainable Development",
      
      // Project Images
      images: [
        "/hackathon1-cover.jpg",
        "/hackathon1-demo.jpg", 
        "/hackathon1-team.jpg",
        "/hackathon1-presentation.jpg",
        "/hackathon1-certificate.jpg",
        "/hackathon1-working.jpg"
      ],
      
      // Project Links
      links: {
        github: "https://github.com/sreecharan/smart-traffic",
        demo: "https://smart-traffic-demo.vercel.app",
        linkedin: "https://linkedin.com/posts/sreecharan/smart-city-hackathon",
        presentation: "https://slides.com/sreecharan/smart-traffic",
        video: "https://youtube.com/watch?v=demo123"
      },
      
      // Technical Details
      features: [
        "Real-time Traffic Monitoring",
        "Predictive Analytics Dashboard", 
        "Smart Signal Optimization",
        "Emergency Vehicle Priority",
        "Air Quality Integration",
        "Mobile App for Citizens"
      ],
      
      // Development Timeline
      timeline: [
        { time: "Day 1 - 6 PM", event: "Problem Analysis & Team Formation" },
        { time: "Day 1 - 10 PM", event: "Solution Design & Architecture Planning" },
        { time: "Day 2 - 2 AM", event: "Backend API Development Started" },
        { time: "Day 2 - 8 AM", event: "AI Model Training Completed" },
        { time: "Day 2 - 2 PM", event: "Frontend Development & Integration" },
        { time: "Day 2 - 8 PM", event: "Testing & Bug Fixes" },
        { time: "Day 3 - 10 AM", event: "Final Presentation Preparation" },
        { time: "Day 3 - 2 PM", event: "Project Presentation & Demo" }
      ],
      
      // Impact & Results
      impact: {
        congestionReduction: "30%",
        responseTime: "45%",
        fuelSaving: "25%",
        userSatisfaction: "92%"
      },
      
      // Recognition
      recognition: [
        "Best Technical Innovation Award",
        "Judges' Choice Award", 
        "Audience Favorite",
        "Featured in TechCrunch Article"
      ]
    },
    
    2: {
      id: 2,
      title: "FinTech Innovation Challenge",
      event: "Banking Summit 2024",
      position: "🥇 1st Place Winner",
      date: "February 10-12, 2024",
      location: "NASSCOM, Bangalore",
      description: "Created a blockchain-based micro-lending platform for rural communities with 99.9% security rating and automated risk assessment.",
      problemStatement: "Rural communities lack access to formal banking and credit systems, forcing them to rely on high-interest informal lenders.",
      solution: "A decentralized lending platform using blockchain technology for transparency, smart contracts for automation, and AI for risk assessment.",
      technologies: ["Blockchain", "Solidity", "React", "Node.js", "Web3.js", "MongoDB", "Python"],
      team: [
        { name: "Sree Charan", role: "Blockchain Developer & Lead" },
        { name: "Arvind Mehta", role: "Smart Contract Developer" },
        { name: "Sneha Patel", role: "Frontend Developer" }
      ],
      prize: "₹75,000 + Incubation Support",
      participants: 150,
      teams: 30,
      duration: "48 hours",
      theme: "Financial Inclusion & Digital Banking",
      
      images: [
        "/hackathon2-cover.jpg",
        "/hackathon2-blockchain.jpg",
        "/hackathon2-team.jpg", 
        "/hackathon2-demo.jpg",
        "/hackathon2-award.jpg",
        "/hackathon2-presentation.jpg"
      ],
      
      links: {
        github: "https://github.com/sreecharan/rural-lending",
        demo: "https://rural-lending-demo.netlify.app",
        linkedin: "https://linkedin.com/posts/sreecharan/fintech-hackathon",
        whitepaper: "https://docs.google.com/rural-lending-whitepaper",
        video: "https://youtube.com/watch?v=fintech456"
      },
      
      features: [
        "Blockchain-based Transparency",
        "Smart Contract Automation",
        "AI Risk Assessment",
        "Multi-language Support",
        "Offline Capability",
        "Mobile-first Design"
      ],
      
      timeline: [
        { time: "Day 1 - 5 PM", event: "Market Research & Problem Validation" },
        { time: "Day 1 - 9 PM", event: "Blockchain Architecture Design" },
        { time: "Day 2 - 1 AM", event: "Smart Contract Development" },
        { time: "Day 2 - 9 AM", event: "Frontend Interface Development" },
        { time: "Day 2 - 3 PM", event: "AI Model Integration" },
        { time: "Day 2 - 9 PM", event: "Testing & Security Audit" },
        { time: "Day 3 - 11 AM", event: "Demo Preparation" },
        { time: "Day 3 - 3 PM", event: "Final Pitch & Demo" }
      ],
      
      impact: {
        securityRating: "99.9%",
        processingTime: "80%",
        costReduction: "60%",
        accessibilityIncrease: "300%"
      },
      
      recognition: [
        "Best FinTech Innovation",
        "Social Impact Award",
        "Technical Excellence",
        "Potential for Scale Award"
      ]
    }
    
    // Add more hackathons with similar detailed structure...
  };

  const hackathon = hackathonData[id];

  if (!hackathon) {
    return (
      <div className="hackathon-detail-container">
        <div className="container">
          <div className="not-found">
            <Title level={2}>Hackathon Not Found</Title>
            <Button type="primary" onClick={() => navigate('/hackathons')}>
              Back to Hackathons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hackathon-detail-container">
      <div className="container">
        {/* Header with Back Button */}
        <motion.div 
          className="detail-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/')}
            className="back-button"
          >
            Back to Portfolio
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="hackathon-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <Tag color="gold" className="position-tag">
              <TrophyOutlined /> {hackathon.position}
            </Tag>
            <Title level={1} className="hackathon-title">
              {hackathon.title}
            </Title>
            <Title level={3} className="event-name">
              {hackathon.event}
            </Title>
            <Paragraph className="hackathon-description">
              {hackathon.description}
            </Paragraph>
            
            {/* Quick Info */}
            <div className="quick-info">
              <Space size="large">
                <Statistic 
                  title="Prize" 
                  value={hackathon.prize} 
                  prefix={<TrophyOutlined />}
                />
                <Statistic 
                  title="Duration" 
                  value={hackathon.duration}
                  prefix={<CalendarOutlined />}
                />
                <Statistic 
                  title="Team Size" 
                  value={hackathon.team.length}
                  prefix={<TeamOutlined />}
                />
              </Space>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <Space size="middle">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<EyeOutlined />}
                  href={hackathon.links.demo}
                  target="_blank"
                >
                  Live Demo
                </Button>
                <Button 
                  size="large" 
                  icon={<GithubOutlined />}
                  href={hackathon.links.github}
                  target="_blank"
                >
                  View Code
                </Button>
                <Button 
                  size="large" 
                  icon={<PlayCircleOutlined />}
                  href={hackathon.links.video}
                  target="_blank"
                >
                  Watch Demo
                </Button>
                <Button 
                  size="large" 
                  icon={<LinkedinOutlined />}
                  href={hackathon.links.linkedin}
                  target="_blank"
                >
                  LinkedIn Post
                </Button>
              </Space>
            </div>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div 
          className="image-gallery-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Title level={2}>Project Gallery</Title>
          <Carousel 
            autoplay 
            dots={true}
            className="project-carousel"
            afterChange={setCurrentImageIndex}
          >
            {hackathon.images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <Image
                  src={image}
                  alt={`${hackathon.title} - Image ${index + 1}`}
                  className="gallery-image"
                  fallback="/placeholder-project.jpg"
                />
              </div>
            ))}
          </Carousel>
          
          {/* Thumbnail Navigation */}
          <div className="thumbnail-nav">
            {hackathon.images.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  preview={false}
                  fallback="/placeholder-project.jpg"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Project Details Grid */}
        <motion.div 
          className="project-details"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Row gutter={[32, 32]}>
            {/* Problem & Solution */}
            <Col xs={24} lg={12}>
              <Card className="detail-card">
                <Title level={3}>Problem Statement</Title>
                <Paragraph>{hackathon.problemStatement}</Paragraph>
                
                <Divider />
                
                <Title level={3}>Our Solution</Title>
                <Paragraph>{hackathon.solution}</Paragraph>
              </Card>
            </Col>

            {/* Technical Stack */}
            <Col xs={24} lg={12}>
              <Card className="detail-card">
                <Title level={3}>
                  <FiCode style={{ marginRight: 8 }} />
                  Technology Stack
                </Title>
                <div className="tech-tags">
                  {hackathon.technologies.map((tech, index) => (
                    <Tag key={index} color="blue" className="tech-tag">
                      {tech}
                    </Tag>
                  ))}
                </div>
                
                <Divider />
                
                <Title level={3}>
                  <FiUsers style={{ marginRight: 8 }} />
                  Team Members
                </Title>
                {hackathon.team.map((member, index) => (
                  <div key={index} className="team-member">
                    <Text strong>{member.name}</Text>
                    <br />
                    <Text type="secondary">{member.role}</Text>
                  </div>
                ))}
              </Card>
            </Col>

            {/* Features */}
            <Col xs={24} lg={12}>
              <Card className="detail-card">
                <Title level={3}>Key Features</Title>
                <ul className="features-list">
                  {hackathon.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </Card>
            </Col>

            {/* Impact & Results */}
            <Col xs={24} lg={12}>
              <Card className="detail-card">
                <Title level={3}>
                  <FiAward style={{ marginRight: 8 }} />
                  Impact & Results
                </Title>
                <Row gutter={[16, 16]}>
                  {Object.entries(hackathon.impact).map(([key, value]) => (
                    <Col xs={12} key={key}>
                      <Statistic
                        title={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        value={value}
                        valueStyle={{ color: '#52c41a' }}
                      />
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* Development Timeline */}
        <motion.div 
          className="timeline-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Title level={2}>Development Timeline</Title>
          <Timeline mode="left" className="project-timeline">
            {hackathon.timeline.map((item, index) => (
              <Timeline.Item key={index} label={item.time}>
                {item.event}
              </Timeline.Item>
            ))}
          </Timeline>
        </motion.div>

        {/* Recognition & Awards */}
        <motion.div 
          className="recognition-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Title level={2}>Recognition & Awards</Title>
          <div className="recognition-grid">
            {hackathon.recognition.map((award, index) => (
              <Card key={index} className="recognition-card">
                <TrophyOutlined className="recognition-icon" />
                <Text strong>{award}</Text>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* More Projects CTA */}
        <motion.div 
          className="more-projects-cta"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card className="cta-card">
            <Title level={3}>Explore More Hackathon Projects</Title>
            <Paragraph>
              Check out my other hackathon wins and innovative projects.
            </Paragraph>
            <Button 
              type="primary" 
              size="large"
              onClick={() => navigate('/')}
            >
              View All Hackathons
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HackathonDetail;
