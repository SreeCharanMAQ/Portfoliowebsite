import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Typography, Tag, Card, Row, Col, Timeline, Statistic, Alert, Spin, Divider, Badge } from 'antd';
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
  RightOutlined,
  StarFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import { hackathonAPI } from '../services/api';
import './HackathonDetail.css';

const { Title, Paragraph, Text } = Typography;

const HackathonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHackathonDetail = async () => {
      try {
        setLoading(true);
        const response = await hackathonAPI.getHackathonById(id);
        
        if (response.success) {
          setHackathon(response.hackathon);
        } else {
          setError('Hackathon not found');
        }
      } catch (err) {
        console.error('Failed to fetch hackathon details:', err);
        setError('Failed to load hackathon details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHackathonDetail();
    }
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
  const parseJSON = (jsonString, fallback = []) => {
    if (!jsonString) return fallback;
    if (Array.isArray(jsonString)) return jsonString;
    try {
      return JSON.parse(jsonString);
    } catch {
      if (typeof jsonString === 'string') {
        return jsonString.split(',').map(item => item.trim());
      }
      return fallback;
    }
  };

  const team = parseJSON(hackathon.team_members, []);
  const features = parseJSON(hackathon.features, []);
  const timeline = parseJSON(hackathon.timeline, []);
  const recognition = parseJSON(hackathon.recognition, []);
  const technologies = parseJSON(hackathon.technologies, []);
  // Gallery comes from the API as an array of objects with image_url
  const gallery = hackathon.gallery ? hackathon.gallery.map(g => g.image_url || g) : [];

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
                  src={gallery[currentImageIndex] || '/placeholder-hackathon.jpg'}
                  alt={`${hackathon.title} - Image ${currentImageIndex + 1}`}
                  className="gallery-image"
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
  );
};

export default HackathonDetail;
