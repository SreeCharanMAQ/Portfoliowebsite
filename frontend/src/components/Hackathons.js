import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, Tag, Button } from 'antd';
import { TrophyOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import { FiExternalLink, FiEye } from 'react-icons/fi';
import './Hackathons.css';

const Hackathons = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Static hackathon data
  const hackathons = [
    {
      id: 1,
      title: "Code-a-Haunt Halloween Hackathon",
      organization: "Code-a-Haunt 2024",
      position: "Participant",
      date: "October 2024",
      description: "Spooky themed hackathon where we created Halloween-inspired tech solutions with a creative twist.",
      team_size: 3,
      prize_money: "₹8,000",
      image_url: "/photo/code-a-haunt/main.jpg"
    },
    {
      id: 2,
      title: "Code of Duty Gaming Hackathon",
      organization: "Gaming Community 2024",
      position: "Winner",
      date: "September 2024",
      team_size: 4,
      prize_money: "₹20,000",
      image_url: "/photo/code-of-duty/main.jpg"
    },
    {
      id: 3,
      title: "Code Cubicle by Microsoft",
      organization: "Microsoft & Geek Room",
      position: "3rd Runners-up",
      date: "August 2024",
      team_size: 5,
      prize_money: "₹5,000",
      image_url: "/photo/microsoft/main.jpg"
    },
    {
      id: 4,
      title: "Arena Hackathon",
      organization: "Lovely Professional University",
      position: "Winner",
      date: "June 2024",
      team_size: 4,
      prize_money: "Internship + Prize",
      image_url: "/photo/arena/main.jpg"
    },
    {
      id: 6,
      title: "coding Blocks LPU",
      organization: "Love Babbar",
      position: "Third Position",
      date: "October 2024",
      team_size: 3,
      prize_money: "₹8,000",
      image_url: "/photo/codingblockslpu/main.jpg"
    },
    {
      id: 9,
      title: "Unstop Hackathon",
      organization: "Chandigarh University",
      position: "Winner",
      date: "June 2024",
      team_size: 4,
      prize_money: "Internship + Prize",
      image_url: "/photo/other/main.jpg"
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

  const getPositionIcon = (position) => {
    if (position.includes('1st')) return '🥇';
    if (position.includes('2nd')) return '🥈';
    if (position.includes('3rd')) return '🥉';
    return '🏆';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const formatPrize = (amount) => {
    if (!amount) return 'Prize TBD';
    return `₹${amount.toLocaleString()}`;
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
                      src={hackathon.image_url || '/photo/other/main.jpg'} 
                      alt={hackathon.title}
                      onError={(e) => {
                        console.log('Image failed to load:', e.target.src);
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
                    href={hackathon.project_url || hackathon.github_url}
                    target="_blank"
                    className="github-btn"
                  >
                    {hackathon.project_url ? 'Project' : 'GitHub'}
                  </Button>
                ]}
              >
                <div className="hackathon-header">
                  <h3 className="hackathon-title">{hackathon.title}</h3>
                  <Tag color="blue" className="event-tag">
                    {hackathon.organization || hackathon.event_name}
                  </Tag>
                </div>

                <div className="hackathon-meta">
                  <div className="meta-item">
                    <CalendarOutlined />
                    <span>{formatDate(hackathon.date || hackathon.start_date)}</span>
                  </div>
                  <div className="meta-item">
                    <TeamOutlined />
                    <span>{hackathon.team_size_actual || hackathon.team_size || 'TBD'} members</span>
                  </div>
                  <div className="meta-item prize">
                    <TrophyOutlined />
                    <span>{hackathon.prize_money || formatPrize(hackathon.prize_amount)}</span>
                  </div>
                </div>

                <p className="hackathon-description">
                  {hackathon.description}
                </p>

                <div className="hackathon-technologies">
                  {(hackathon.technologies || []).map((tech, techIndex) => (
                    <Tag 
                      key={techIndex} 
                      className="tech-tag"
                      color={`hsl(${techIndex * 60}, 70%, 50%)`}
                    >
                      {typeof tech === 'string' ? tech : tech.name}
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
            <div className="stat-number">{hackathons.length}</div>
            <div className="stat-label">Hackathons Won</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {hackathons.filter(h => h.position?.includes('Winner')).length}
            </div>
            <div className="stat-label">First Places</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">₹85K+
            </div>
            <div className="stat-label">Total Prize Money</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {hackathons.reduce((sum, h) => sum + (h.team_size_actual || h.team_size || 0), 0)}+
            </div>
            <div className="stat-label">Team Members</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathons;
