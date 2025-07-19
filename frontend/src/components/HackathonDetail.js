import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, Tag, Card, Image, Carousel, Timeline, Statistic, 
  Row, Col, Typography, Space, Divider 
} from 'antd';
import { 
  ArrowLeftOutlined, GithubOutlined, 
  TrophyOutlined, CalendarOutlined, TeamOutlined,
  EyeOutlined, LinkedinOutlined, PlayCircleOutlined
} from '@ant-design/icons';
import { FiCode, FiUsers, FiAward } from 'react-icons/fi';
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
    },
    
    3: {
      id: 3,
      title: "Healthcare AI Hackathon",
      event: "MedTech 2023",
      position: "🥈 2nd Place Winner", 
      date: "December 8-10, 2023",
      location: "AIIMS, New Delhi",
      description: "Built an AI diagnostic tool for early detection of diseases using medical imaging with 95% accuracy.",
      problemStatement: "Early disease detection is crucial for treatment success, but medical imaging analysis is time-consuming and requires specialized expertise.",
      solution: "An AI-powered diagnostic assistant that analyzes medical images and provides preliminary diagnosis with confidence scores.",
      technologies: ["Python", "PyTorch", "Flask", "OpenCV", "NumPy", "DICOM", "React"],
      team: [
        { name: "Sree Charan", role: "AI/ML Engineer & Lead" },
        { name: "Dr. Kavitha Reddy", role: "Medical Advisor" },
        { name: "Rohit Sharma", role: "Backend Developer" },
        { name: "Deepika Jain", role: "Frontend Developer" },
        { name: "Arjun Patel", role: "Data Scientist" }
      ],
      prize: "₹40,000 + Research Publication",
      participants: 180,
      teams: 45,
      duration: "60 hours",
      theme: "AI in Healthcare",
      
      images: [
        "/hackathon3-cover.jpg",
        "/hackathon3-ai-model.jpg",
        "/hackathon3-team.jpg",
        "/hackathon3-demo.jpg", 
        "/hackathon3-award.jpg",
        "/hackathon3-presentation.jpg"
      ],
      
      links: {
        github: "https://github.com/sreecharan/medical-ai-diagnosis",
        demo: "https://medical-ai-demo.herokuapp.com",
        linkedin: "https://linkedin.com/posts/sreecharan/healthcare-ai-hackathon",
        paper: "https://arxiv.org/sreecharan-medical-ai-2023",
        video: "https://youtube.com/watch?v=health789"
      },
      
      features: [
        "Medical Image Analysis",
        "Disease Classification", 
        "Confidence Scoring",
        "DICOM File Support",
        "Multi-modal Analysis",
        "Doctor Dashboard"
      ],
      
      timeline: [
        { time: "Day 1 - 4 PM", event: "Medical Domain Research" },
        { time: "Day 1 - 8 PM", event: "Dataset Collection & Preprocessing" },
        { time: "Day 2 - 2 AM", event: "AI Model Architecture Design" },
        { time: "Day 2 - 10 AM", event: "Model Training & Validation" },
        { time: "Day 2 - 6 PM", event: "Web Interface Development" },
        { time: "Day 3 - 2 AM", event: "Integration & Testing" },
        { time: "Day 3 - 10 AM", event: "Medical Expert Review" },
        { time: "Day 3 - 4 PM", event: "Final Presentation" }
      ],
      
      impact: {
        accuracy: "95%",
        processingTime: "75%",
        diagnosticSpeed: "400%",
        doctorApproval: "88%"
      },
      
      recognition: [
        "Best Healthcare Innovation",
        "Technical Excellence Award",
        "Clinical Impact Recognition",
        "Research Publication Opportunity"
      ]
    },
    
    4: {
      id: 4,
      title: "EdTech Innovation Challenge",
      event: "EduTech Summit 2023",
      position: "🥇 1st Place Winner",
      date: "October 20-22, 2023",
      location: "IIT Delhi, Delhi",
      description: "Created an adaptive learning platform using AI to personalize education for students with different learning styles.",
      problemStatement: "Traditional education systems follow one-size-fits-all approach, failing to cater to individual learning styles and paces.",
      solution: "An AI-powered adaptive learning platform that customizes content delivery based on individual learning patterns and preferences.",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB", "Socket.io", "WebRTC", "AWS"],
      team: [
        { name: "Sree Charan", role: "Full Stack Developer & Lead" },
        { name: "Meera Gupta", role: "Educational Psychologist" },
        { name: "Kiran Kumar", role: "AI/ML Engineer" },
        { name: "Pooja Singh", role: "UI/UX Designer" }
      ],
      prize: "₹60,000 + Startup Incubation",
      participants: 220,
      teams: 55,
      duration: "48 hours",
      theme: "Personalized Learning & EdTech",
      
      images: [
        "/hackathon4-cover.jpg",
        "/hackathon4-platform.jpg",
        "/hackathon4-team.jpg",
        "/hackathon4-demo.jpg",
        "/hackathon4-award.jpg",
        "/hackathon4-students.jpg"
      ],
      
      links: {
        github: "https://github.com/sreecharan/adaptive-learning",
        demo: "https://adaptive-learning-demo.netlify.app",
        linkedin: "https://linkedin.com/posts/sreecharan/edtech-hackathon",
        presentation: "https://slides.com/sreecharan/adaptive-learning",
        video: "https://youtube.com/watch?v=edtech101"
      },
      
      features: [
        "Adaptive Content Delivery",
        "Learning Style Analysis",
        "Progress Tracking",
        "Interactive Assessments",
        "Peer Collaboration",
        "Teacher Analytics Dashboard"
      ],
      
      timeline: [
        { time: "Day 1 - 5 PM", event: "Educational Research & Problem Analysis" },
        { time: "Day 1 - 9 PM", event: "Learning Algorithm Design" },
        { time: "Day 2 - 1 AM", event: "Backend Development & AI Integration" },
        { time: "Day 2 - 9 AM", event: "Frontend Interface Creation" },
        { time: "Day 2 - 3 PM", event: "Content Management System" },
        { time: "Day 2 - 9 PM", event: "Testing with Sample Students" },
        { time: "Day 3 - 11 AM", event: "Final Adjustments" },
        { time: "Day 3 - 3 PM", event: "Demo & Presentation" }
      ],
      
      impact: {
        learningImprovement: "65%",
        engagementIncrease: "80%", 
        completionRate: "90%",
        teacherSatisfaction: "95%"
      },
      
      recognition: [
        "Best EdTech Innovation",
        "Social Impact Award",
        "Jury's Choice Award",
        "Startup Incubation Offer"
      ]
    },
    
    5: {
      id: 5,
      title: "Sustainable Energy Hackathon",
      event: "GreenTech 2023",
      position: "🥇 1st Place Winner",
      date: "September 15-17, 2023",
      location: "IIT Bombay, Mumbai",
      description: "Developed a smart grid optimization system for renewable energy distribution with 40% efficiency improvement.",
      problemStatement: "Traditional power grids struggle to efficiently manage renewable energy sources due to their intermittent nature.",
      solution: "An AI-powered smart grid system that predicts energy demand and optimizes renewable energy distribution in real-time.",
      technologies: ["Python", "TensorFlow", "IoT", "React", "Node.js", "InfluxDB", "Grafana"],
      team: [
        { name: "Sree Charan", role: "Systems Engineer & Lead" },
        { name: "Vikram Reddy", role: "Energy Systems Specialist" },
        { name: "Nisha Agarwal", role: "IoT Developer" },
        { name: "Rajesh Menon", role: "Data Analyst" }
      ],
      prize: "₹80,000 + Patent Support",
      participants: 160,
      teams: 40,
      duration: "48 hours",
      theme: "Sustainable Energy & Smart Grids",
      
      images: [
        "/hackathon5-cover.jpg",
        "/hackathon5-smartgrid.jpg",
        "/hackathon5-team.jpg",
        "/hackathon5-demo.jpg",
        "/hackathon5-award.jpg",
        "/hackathon5-prototype.jpg"
      ],
      
      links: {
        github: "https://github.com/sreecharan/smart-grid-optimization",
        demo: "https://smart-grid-demo.vercel.app",
        linkedin: "https://linkedin.com/posts/sreecharan/sustainable-energy",
        whitepaper: "https://docs.google.com/smart-grid-whitepaper",
        video: "https://youtube.com/watch?v=energy123"
      },
      
      features: [
        "Real-time Energy Monitoring",
        "Demand Prediction",
        "Renewable Energy Optimization", 
        "Grid Load Balancing",
        "IoT Sensor Integration",
        "Energy Analytics Dashboard"
      ],
      
      timeline: [
        { time: "Day 1 - 6 PM", event: "Energy Grid Analysis" },
        { time: "Day 1 - 10 PM", event: "IoT Architecture Design" },
        { time: "Day 2 - 2 AM", event: "Prediction Algorithm Development" },
        { time: "Day 2 - 8 AM", event: "Hardware Prototype Building" },
        { time: "Day 2 - 2 PM", event: "Software Integration" },
        { time: "Day 2 - 8 PM", event: "System Testing & Validation" },
        { time: "Day 3 - 10 AM", event: "Performance Optimization" },
        { time: "Day 3 - 2 PM", event: "Final Demo & Pitch" }
      ],
      
      impact: {
        energyEfficiency: "40%",
        carbonReduction: "35%",
        costSavings: "50%",
        gridStability: "85%"
      },
      
      recognition: [
        "Best Sustainability Solution",
        "Innovation Excellence",
        "Environmental Impact Award",
        "Patent Filing Support"
      ]
    },
    
    6: {
      id: 6,
      title: "Cybersecurity Defense Challenge", 
      event: "SecureCode 2023",
      position: "🥈 2nd Place Winner",
      date: "August 25-27, 2023",
      location: "NASSCOM, Bangalore",
      description: "Built an AI-powered threat detection system for real-time cybersecurity monitoring with 99.2% accuracy.",
      problemStatement: "Traditional cybersecurity systems rely on signature-based detection, making them vulnerable to zero-day attacks.",
      solution: "An AI-powered threat detection system using machine learning to identify anomalous behavior patterns in real-time.",
      technologies: ["Python", "Scikit-learn", "Elasticsearch", "Kibana", "Docker", "Flask", "React"],
      team: [
        { name: "Sree Charan", role: "Security Engineer & Lead" },
        { name: "Amit Sharma", role: "Cybersecurity Specialist" },
        { name: "Priya Nair", role: "ML Engineer" },
        { name: "Sachin Joshi", role: "DevOps Engineer" }
      ],
      prize: "₹45,000 + Security Certification",
      participants: 140,
      teams: 35,
      duration: "60 hours",
      theme: "AI-Powered Cybersecurity",
      
      images: [
        "/hackathon6-cover.jpg",
        "/hackathon6-security.jpg",
        "/hackathon6-team.jpg",
        "/hackathon6-demo.jpg",
        "/hackathon6-award.jpg",
        "/hackathon6-dashboard.jpg"
      ],
      
      links: {
        github: "https://github.com/sreecharan/ai-threat-detection",
        demo: "https://threat-detection-demo.herokuapp.com",
        linkedin: "https://linkedin.com/posts/sreecharan/cybersecurity-ai",
        documentation: "https://docs.sreecharan.com/threat-detection",
        video: "https://youtube.com/watch?v=cyber456"
      },
      
      features: [
        "Real-time Threat Detection",
        "Anomaly Pattern Recognition",
        "Automated Response System",
        "Network Traffic Analysis",
        "Incident Management",
        "Security Compliance Reporting"
      ],
      
      timeline: [
        { time: "Day 1 - 4 PM", event: "Threat Landscape Analysis" },
        { time: "Day 1 - 8 PM", event: "ML Model Architecture Design" },
        { time: "Day 2 - 12 AM", event: "Data Collection & Preprocessing" },
        { time: "Day 2 - 8 AM", event: "Model Training & Validation" },
        { time: "Day 2 - 4 PM", event: "Real-time Detection Engine" },
        { time: "Day 2 - 10 PM", event: "Dashboard Development" },
        { time: "Day 3 - 8 AM", event: "Security Testing" },
        { time: "Day 3 - 4 PM", event: "Final Security Demo" }
      ],
      
      impact: {
        detectionAccuracy: "99.2%",
        responseTime: "85%",
        falsePositives: "95%",
        threatCoverage: "92%"
      },
      
      recognition: [
        "Best Security Innovation",
        "Technical Excellence",
        "Industry Choice Award",
        "Security Certification Scholarship"
      ]
    },
    
    7: {
      id: 7,
      title: "Social Impact Tech Challenge",
      event: "Impact Innovators 2023",
      position: "🥇 1st Place Winner",
      date: "July 14-16, 2023",
      location: "Social Alpha, Bangalore",
      description: "Created a disaster management platform for real-time coordination of relief efforts with 200% efficiency improvement.",
      problemStatement: "During disasters, lack of coordination between relief agencies leads to inefficient resource allocation and delayed response.",
      solution: "A comprehensive disaster management platform that enables real-time coordination, resource tracking, and volunteer management.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "MapBox", "Twilio", "AWS"],
      team: [
        { name: "Sree Charan", role: "Full Stack Developer & Lead" },
        { name: "Anita Kumari", role: "Social Impact Specialist" },
        { name: "Rahul Verma", role: "GIS Developer" },
        { name: "Sneha Reddy", role: "Communication Systems Engineer" }
      ],
      prize: "₹1,00,000 + NGO Partnership",
      participants: 200,
      teams: 50,
      duration: "48 hours",
      theme: "Technology for Social Good",
      
      images: [
        "/hackathon7-cover.jpg",
        "/hackathon7-disaster.jpg",
        "/hackathon7-team.jpg",
        "/hackathon7-demo.jpg",
        "/hackathon7-award.jpg",
        "/hackathon7-impact.jpg"
      ],
      
      links: {
        github: "https://github.com/sreecharan/disaster-management",
        demo: "https://disaster-relief-demo.netlify.app",
        linkedin: "https://linkedin.com/posts/sreecharan/social-impact-tech",
        impact: "https://sreecharan.com/disaster-relief-impact",
        video: "https://youtube.com/watch?v=impact789"
      },
      
      features: [
        "Real-time Resource Tracking",
        "Volunteer Coordination",
        "Emergency Communication",
        "Relief Camp Management",
        "Donation Management",
        "Impact Analytics"
      ],
      
      timeline: [
        { time: "Day 1 - 5 PM", event: "Disaster Response Research" },
        { time: "Day 1 - 9 PM", event: "Platform Architecture Design" },
        { time: "Day 2 - 1 AM", event: "Core Features Development" },
        { time: "Day 2 - 9 AM", event: "Real-time Communication Setup" },
        { time: "Day 2 - 3 PM", event: "Mapping & Location Services" },
        { time: "Day 2 - 9 PM", event: "Testing with NGO Partners" },
        { time: "Day 3 - 11 AM", event: "Impact Measurement Setup" },
        { time: "Day 3 - 3 PM", event: "Social Impact Presentation" }
      ],
      
      impact: {
        responseEfficiency: "200%",
        coordinationImprovement: "150%",
        resourceUtilization: "180%",
        ngoAdoption: "85%"
      },
      
      recognition: [
        "Best Social Impact Solution",
        "Innovation for Good Award",
        "NGO Partnership Award",
        "Sustainable Development Recognition"
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
