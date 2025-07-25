import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import { Button, Typography, Tag, Card, Row, Col, Timeline, Statistic, Alert, Spin } from 'antd';
import { 
  ArrowLeftOutlined, 
  CalendarOutlined, 
  EnvironmentOutlined, 
  TeamOutlined, 
  TrophyOutlined,
  GithubOutlined,
  LinkOutlined,
  PlayCircleOutlined,
  LoadingOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import './HackathonDetail.css';

const { Title, Paragraph, Text } = Typography;

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hackathon, setHackathon] = useState(null);
  
  // Use static data
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Static hackathon data
      const staticHackathons = [
        {
          id: "1",
          title: "Code-a-Haunt Halloween Hackathon",
          organization: "Code-a-Haunt 2024",
          position: "Participant",
          date: "October 2024",
          location: "Virtual",
          description: "Spooky themed hackathon where we created Halloween-inspired tech solutions with a creative twist. Developed interactive Halloween games and AR experiences for a memorable spooky season.",
          technologies: ["Python", "Flask", "JavaScript", "CSS"],
          team_size: 3,
          duration: "48 hours",
          prize_amount: 8000,
          image_url: "/photo/code-a-haunt/main.jpg",
          gallery: ["/photo/code-a-haunt/main.jpg"],
          github_url: "https://github.com/SreeCharanMAQ/code-a-haunt",
          demo_url: "https://code-a-haunt-demo.netlify.app",
          team_members: [
            { name: "K Sree Charan", role: "Full Stack Developer" },
            { name: "Taylor Rodriguez", role: "UX Designer" },
            { name: "Jordan Lee", role: "Backend Developer" }
          ],
          participants: 80,
          teams: 25,
          problem_statement: "Create engaging Halloween-themed interactive experiences using modern web technologies",
          solution: "We developed a haunted house virtual experience with interactive elements and jump scares"
        },
        {
          id: "2",
          title: "Code of Duty Gaming Hackathon",
          organization: "Gaming Community 2024",
          position: "Winner",
          date: "September 2024",
          location: "Bangalore",
          description: "Gaming-focused hackathon where we developed innovative gaming solutions and interactive experiences. Our team created a real-time multiplayer gaming platform that impressed judges with its performance and engagement features.",
          technologies: ["Unity", "C#", "JavaScript", "WebGL"],
          team_size: 4,
          duration: "72 hours",
          prize_amount: 20000,
          image_url: "/photo/code-of-duty/2.jpg", // Using a different image
          gallery: [
            "/photo/code-of-duty/2.jpg", 
            "/photo/code-of-duty/main.jpg", 
            "/photo/code-of-duty/1.jpg", 
            "/photo/code-of-duty/3.jpg",
            "/photo/code-of-duty/4.jpg",
            "/photo/code-of-duty/5.jpg"
          ],
          github_url: "https://github.com/SreeCharanMAQ/code-of-duty",
          demo_url: "https://code-of-duty-demo.netlify.app",
          team_members: [
            { name: "K Sree Charan", role: "Game Developer" },
            { name: "Samantha Wright", role: "3D Artist" },
            { name: "David Kim", role: "Unity Developer" },
            { name: "Emily Chen", role: "Game Designer" }
          ],
          participants: 150,
          teams: 35,
          problem_statement: "Develop an innovative gaming solution that pushes the boundaries of multiplayer experiences",
          solution: "Created a cross-platform multiplayer game with real-time interaction and low-latency networking"
        },
        {
          id: "3",
          title: "Code Cubicle by Microsoft",
          organization: "Microsoft & Geek Room",
          position: "3rd Runners-up",
          date: "August 2024",
          location: "Hyderabad",
          description: "Incredible journey to becoming 3rd runners-up at the Code Cubicle by Geek Room at Microsoft! Team 'The Losers' built our entire project in just 7 days! We developed a comprehensive data analysis platform with advanced visualization capabilities.",
          technologies: ["Python", "Streamlit", "Web Scraping", "Data Science"],
          team_size: 5,
          duration: "7 days",
          prize_amount: 5000,
          image_url: "/photo/microsoft/3.jpg", // Using a different image
          gallery: [
            "/photo/microsoft/3.jpg", 
            "/photo/microsoft/main.jpg", 
            "/photo/microsoft/1.jpg", 
            "/photo/microsoft/2.jpg",
            "/photo/microsoft/4.jpg",
            "/photo/microsoft/5.jpg",
            "/photo/microsoft/6.jpg",
            "/photo/microsoft/7.jpg"
          ],
          github_url: "https://github.com/SreeCharanMAQ/code-cubicle",
          demo_url: "https://code-cubicle-demo.netlify.app",
          team_members: [
            { name: "K Sree Charan", role: "Team Lead" },
            { name: "Raj Patel", role: "Data Scientist" },
            { name: "Priya Sharma", role: "Frontend Developer" },
            { name: "Michael Brown", role: "Backend Developer" },
            { name: "Lisa Johnson", role: "UI/UX Designer" }
          ],
          participants: 200,
          teams: 40,
          problem_statement: "Create a data analytics solution that makes complex data accessible to non-technical users",
          solution: "Built an intuitive data visualization platform with automated insights and recommendations"
        },
        {
          id: "4",
          title: "Code Fusion Hackathon",
          organization: "Chandigarh University",
          position: "Winner",
          date: "June 2024",
          location: "Chandigarh",
          description: "Developed an innovative job portal with AI features including resume builder, personalized roadmap builder, and chatbot assistance. Our solution helps job seekers optimize their applications and career paths.",
          technologies: ["React", "AI/ML", "Full Stack", "UI/UX"],
          team_size: 4,
          duration: "36 hours",
          prize_amount: 15000,
          image_url: "/photo/other/3.jpg", // Using a different image
          gallery: ["/photo/other/3.jpg", "/photo/other/main.jpg"],
          github_url: "https://github.com/SreeCharanMAQ/code-fusion",
          demo_url: "https://code-fusion-demo.netlify.app",
          team_members: [
            { name: "K Sree Charan", role: "Full Stack Developer" },
            { name: "Aditya Singh", role: "AI Engineer" },
            { name: "Nisha Verma", role: "Frontend Developer" },
            { name: "Vikram Shah", role: "UX Researcher" }
          ],
          participants: 120,
          teams: 30,
          problem_statement: "Create a solution that addresses challenges in the job search and recruitment process",
          solution: "Developed an AI-powered job portal that personalizes the job search experience and provides actionable insights"
        },
        {
          id: "5",
          title: "EdTech Innovation Sprint",
          organization: "TechCrunch Disrupt 2024",
          position: "Winner",
          date: "March 2024",
          location: "Mumbai",
          description: "Created an innovative educational technology platform that personalizes learning experiences based on individual student needs and learning styles. Our solution uses AI to adapt content difficulty and presentation.",
          technologies: ["React", "Node.js", "AI/ML", "Educational Psychology"],
          team_size: 4,
          duration: "48 hours",
          prize_amount: 25000,
          image_url: "/photo/other/1.png", // Using a different image
          gallery: ["/photo/other/1.png", "/photo/other/2.png", "/photo/other/main.jpg"],
          github_url: "https://github.com/SreeCharanMAQ/edtech-sprint",
          demo_url: "https://edtech-sprint-demo.netlify.app",
          team_members: [
            { name: "K Sree Charan", role: "Full Stack Developer" },
            { name: "Meera Patel", role: "Education Specialist" },
            { name: "Jason Wong", role: "AI Engineer" },
            { name: "Sophie Anderson", role: "UI/UX Designer" }
          ],
          participants: 90,
          teams: 22,
          problem_statement: "Design a solution that makes education more personalized, engaging, and effective",
          solution: "Built an adaptive learning platform that customizes content delivery based on individual learning patterns"
        },
        {
          id: "6",
          title: "DevFest Jalandhar 2024",
          organization: "Google Developer Groups",
          position: "Winner",
          date: "December 2024",
          location: "Jalandhar",
          description: "Won DevFest Jalandhar, a tech conference hosted by Google Developer Groups Jalandhar, bringing developers together to learn and innovate. Judges were so impressed that they awarded us monetary rewards and goodies, including exclusive event T-shirts.",
          technologies: ["React", "Node.js", "AI/ML", "Google Cloud"],
          team_size: 4,
          duration: "48 hours",
          prize_amount: 15000,
          image_url: "/photo/devfest/4.jpg", // Using a different image
          gallery: [
            "/photo/devfest/4.jpg", 
            "/photo/devfest/main.jpg",
            "/photo/devfest/1.jpg",
            "/photo/devfest/2.jpg",
            "/photo/devfest/3.jpg",
            "/photo/devfest/5.jpg"
          ],
          github_url: "https://github.com/SreeCharanMAQ/devfest-project",
          demo_url: "https://devfest-project.netlify.app",
          team_members: [
            { name: "K Sree Charan", role: "Full Stack Developer" },
            { name: "Alex Johnson", role: "UI/UX Designer" },
            { name: "Sarah Kim", role: "Backend Developer" },
            { name: "Mike Chen", role: "DevOps Engineer" }
          ],
          participants: 120,
          teams: 30,
          problem_statement: "Build solutions using Google technologies to solve real-world problems",
          solution: "Created a comprehensive platform leveraging Google Cloud services for community problem-solving"
        },
        {
          id: "5",
          title: "Arena Hackathon 2024",
          organization: "Arena Tech Challenge",
          position: "Runner-up",
          date: "October 2024",
          location: "Mumbai",
          description: "Arena Tech Challenge hackathon where we built innovative solutions and competed with talented developers from across the region.",
          technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
          team_size: 4,
          duration: "24 hours",
          prize_amount: 12000,
          image_url: "/photo/arena/main.jpg",
          gallery: ["/photo/arena/main.jpg", "/photo/arena/1.jpg", "/photo/arena/2.jpg", "/photo/arena/3.jpg"],
          github_url: "https://github.com/SreeCharanMAQ/arena-project",
          demo_url: "https://arena-project.netlify.app",
          team_members: [
            { name: "K Sree Charan", role: "Team Lead" },
            { name: "John Doe", role: "Frontend Developer" },
            { name: "Jane Smith", role: "Backend Developer" },
            { name: "Bob Johnson", role: "UI/UX Designer" }
          ],
          participants: 80,
          teams: 20
        }
      ];
      
      // Find the hackathon with matching ID
      const foundHackathon = staticHackathons.find(h => h.id === id);
      
      if (foundHackathon) {
        setHackathon(foundHackathon);
        setError(null);
      } else {
        setError('Hackathon not found');
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="hackathon-detail-container">
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '50vh' 
          }}>
            <Spin 
              size="large" 
              indicator={<LoadingOutlined style={{ fontSize: 48, color: 'var(--accent-color)' }} spin />}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error || !hackathon) {
    return (
      <div className="hackathon-detail-container">
        <div className="container">
          <Alert
            message="Error Loading Hackathon"
            description={error || 'Hackathon not found'}
            type="error"
            showIcon
            style={{ margin: '2rem 0' }}
            action={
              <Button onClick={() => navigate('/')}>
                Back to Portfolio
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  // Parse data from database JSON strings or arrays
  const parseJSON = (data, fallback = []) => {
    if (!data) return fallback;
    if (Array.isArray(data)) return data;
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch {
        return data.split(',').map(item => item.trim());
      }
    }
    return fallback;
  };

  const team = parseJSON(hackathon.team_members, []);
  const features = parseJSON(hackathon.features, []);
  const timeline = parseJSON(hackathon.timeline, []);
  const recognition = parseJSON(hackathon.recognition, []);
  const technologies = parseJSON(hackathon.technologies, []);
  
  // Create gallery array with main image first, then additional gallery images
  const galleryImages = [];
  if (hackathon.image_url) {
    galleryImages.push(hackathon.image_url);
  }
  if (hackathon.gallery && hackathon.gallery.length > 0) {
    const additionalImages = hackathon.gallery.map(g => g.image_url || g);
    galleryImages.push(...additionalImages);
  }
  const gallery = galleryImages;

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const nextImage = () => {
    if (gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevImage = () => {
    if (gallery.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? gallery.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Navbar />
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

        {/* Main Content */}
        <Row gutter={[32, 32]}>
          {/* Left Column - Images and Basic Info */}
          <Col xs={24} lg={12}>
            {/* Image Gallery */}
            <motion.div
              className="image-gallery"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="main-image">
                <img 
                  src={gallery[currentImageIndex] || hackathon.image_url || '/placeholder-hackathon.jpg'}
                  alt={`${hackathon.title} ${currentImageIndex + 1}`}
                  className="gallery-image"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkhhaGF0aG9uIFByb2plY3Q8L3RleHQ+PC9zdmc+';
                  }}
                />
                
                {/* Navigation Arrows */}
                {gallery.length > 1 && (
                  <>
                    <Button 
                      className="nav-arrow prev-arrow"
                      icon={<LeftOutlined />}
                      onClick={prevImage}
                      type="primary"
                      shape="circle"
                    />
                    <Button 
                      className="nav-arrow next-arrow"
                      icon={<RightOutlined />}
                      onClick={nextImage}
                      type="primary"
                      shape="circle"
                    />
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {gallery.length > 1 && (
                <div className="thumbnail-gallery">
                  {gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                      onClick={() => goToImage(index)}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Basic Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="info-card">
                <div className="hackathon-header">
                  <Title level={2} className="hackathon-title">
                    {hackathon.title}
                  </Title>
                  <Tag color="gold" className="position-tag">
                    <TrophyOutlined /> {hackathon.position}
                  </Tag>
                </div>

                <div className="hackathon-meta">
                  <div className="meta-item">
                    <CalendarOutlined />
                    <span>
                      {hackathon.start_date && hackathon.end_date 
                        ? `${formatDate(hackathon.start_date)} - ${formatDate(hackathon.end_date)}`
                        : formatDate(hackathon.start_date || hackathon.date)
                      }
                    </span>
                  </div>
                  <div className="meta-item">
                    <EnvironmentOutlined />
                    <span>{hackathon.location}</span>
                  </div>
                  <div className="meta-item">
                    <TeamOutlined />
                    <span>{hackathon.participants || 'N/A'} Participants</span>
                  </div>
                </div>

                <Paragraph className="description">
                  {hackathon.description}
                </Paragraph>

                {/* Technologies */}
                {technologies.length > 0 && (
                  <div className="technologies">
                    <Title level={4}>Technologies Used</Title>
                    <div className="tech-tags">
                      {technologies.map((tech, index) => (
                        <Tag key={index} color="blue">
                          {typeof tech === 'object' ? tech.name : tech}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </Col>

          {/* Right Column - Detailed Information */}
          <Col xs={24} lg={12}>
            {/* Problem & Solution */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="detail-card">
                <Title level={3}>Problem Statement</Title>
                <Paragraph>{hackathon.problem_statement}</Paragraph>
                
                <Title level={3}>Our Solution</Title>
                <Paragraph>{hackathon.solution}</Paragraph>
              </Card>
            </motion.div>

            {/* Team Members */}
            {team.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="detail-card">
                  <Title level={3}>Team Members</Title>
                  <Row gutter={[16, 16]}>
                    {team.map((member, index) => (
                      <Col xs={24} sm={12} key={index}>
                        <div className="team-member">
                          <Text strong>
                            {member.name || (typeof member === 'string' ? member : member.name)}
                          </Text>
                          {member.role && (
                            <div className="member-role">{member.role}</div>
                          )}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </motion.div>
            )}

            {/* Key Features */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="detail-card">
                  <Title level={3}>Key Features</Title>
                  <ul className="features-list">
                    {features.map((feature, index) => (
                      <li key={index}>
                        {typeof feature === 'object' ? feature.feature_text || feature.feature_name : feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}

            {/* Timeline */}
            {timeline.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="detail-card">
                  <Title level={3}>Development Timeline</Title>
                  <Timeline>
                    {timeline.map((item, index) => (
                      <Timeline.Item key={index}>
                        <div className="timeline-content">
                          <Text strong>
                            {typeof item === 'object' 
                              ? (item.time_description || item.time || `Event ${index + 1}`)
                              : item.time || `Event ${index + 1}`
                            }
                          </Text>
                          <div>
                            {typeof item === 'object' 
                              ? (item.event_description || item.event || 'Event description')
                              : item.event || 'Event description'
                            }
                          </div>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Card>
              </motion.div>
            )}

            {/* Recognition & Awards */}
            {recognition.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Card className="detail-card">
                  <Title level={3}>Recognition & Awards</Title>
                  <ul className="recognition-list">
                    {recognition.map((award, index) => (
                      <li key={index}>
                        <TrophyOutlined className="award-icon" />
                        {typeof award === 'object' 
                          ? (award.award_title || award.title || 'Award')
                          : award
                        }
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}

            {/* Project Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="detail-card">
                <Title level={3}>Project Links</Title>
                <div className="project-links">
                  {hackathon.github_url && (
                    <Button 
                      icon={<GithubOutlined />} 
                      href={hackathon.github_url}
                      target="_blank"
                      className="link-button"
                    >
                      GitHub Repository
                    </Button>
                  )}
                  {hackathon.demo_url && (
                    <Button 
                      icon={<LinkOutlined />} 
                      href={hackathon.demo_url}
                      target="_blank"
                      className="link-button"
                    >
                      Live Demo
                    </Button>
                  )}
                  {hackathon.video_url && (
                    <Button 
                      icon={<PlayCircleOutlined />} 
                      href={hackathon.video_url}
                      target="_blank"
                      className="link-button"
                    >
                      Demo Video
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Statistics Section */}
        <motion.div
          className="statistics-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Card className="statistics-card">
            <Title level={3} className="section-title">Event Statistics</Title>
            <Row gutter={[32, 32]}>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Participants"
                  value={hackathon.participants || 0}
                  valueStyle={{ color: 'var(--accent-color)' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Teams"
                  value={hackathon.teams || 0}
                  valueStyle={{ color: 'var(--accent-color)' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Duration"
                  value={hackathon.duration || '48 hours'}
                  valueStyle={{ color: 'var(--accent-color)' }}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Prize"
                  value={`₹${(hackathon.prize_amount || hackathon.prize || 0).toLocaleString()}`}
                  valueStyle={{ color: 'var(--accent-color)' }}
                />
              </Col>
            </Row>
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default HackathonDetail;
