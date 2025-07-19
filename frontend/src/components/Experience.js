import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { Card, Tag, Button, Tooltip, Rate, Badge, Space } from 'antd';
import { TrophyOutlined, StarOutlined } from '@ant-design/icons';
import LottieAnimation from './LottieAnimation';
import './Experience.css';

const Experience = ({ triggerConfetti }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const experiences = [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'MAQ Software',
      location: 'Hyderabad, India',
      duration: '2023 - Present',
      type: 'Full-time',
      rating: 5,
      achievements: ['Top Performer', 'Innovation Award', 'Team Lead'],
      skills: ['React', 'Python', 'Flask', 'JavaScript', 'MongoDB', 'AWS'],
      description: [
        'Developed and maintained multiple React-based web applications serving 10k+ users',
        'Built scalable backend APIs using Python Flask and Node.js',
        'Implemented responsive designs and improved user experience by 40%',
        'Collaborated with cross-functional teams using Agile methodologies',
        'Optimized application performance resulting in 50% faster load times'
      ],
      technologies: ['React', 'Python', 'Flask', 'JavaScript', 'MongoDB', 'AWS']
    },
    {
      id: 2,
      title: 'Software Developer Intern',
      company: 'Tech Innovations Ltd',
      location: 'Bangalore, India',
      duration: '2022 - 2023',
      type: 'Internship',
      rating: 4,
      achievements: ['Best Intern', 'Quick Learner'],
      skills: ['React', 'TypeScript', 'HTML/CSS', 'Git', 'REST APIs'],
      description: [
        'Assisted in developing frontend components using React and TypeScript',
        'Participated in code reviews and learned best practices for clean code',
        'Contributed to the company\'s internal dashboard project',
        'Gained experience with version control systems and CI/CD pipelines'
      ],
      technologies: ['React', 'TypeScript', 'HTML/CSS', 'Git', 'REST APIs']
    },
    {
      id: 3,
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      location: 'Remote',
      duration: '2021 - 2022',
      type: 'Freelance',
      rating: 4,
      achievements: ['Client Satisfaction', 'Creative Solutions'],
      skills: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP', 'MySQL'],
      description: [
        'Developed custom websites for small businesses and startups',
        'Created responsive designs that increased client engagement by 60%',
        'Implemented e-commerce solutions and payment integrations',
        'Provided ongoing maintenance and support for client websites'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP', 'MySQL']
    }
  ];

  const handleExperienceClick = (experience) => {
    if (triggerConfetti) {
      triggerConfetti();
    }
  };

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="section-title"
            whileHover={{ 
              scale: 1.05,
              background: 'linear-gradient(45deg, #1890ff, #722ed1, #52c41a)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              transition: { duration: 0.3 }
            }}
          >
            <motion.span
              animate={{ 
                color: ['#1890ff', '#722ed1', '#52c41a', '#fa541c', '#1890ff']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Work Experience
            </motion.span>
            <motion.div
              style={{ display: 'inline-block', marginLeft: '10px' }}
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <LottieAnimation
                width={60}
                height={60}
              />
            </motion.div>
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            whileHover={{ 
              color: '#722ed1',
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            My professional journey through various companies and roles
          </motion.p>
        </motion.div>

        <div className="enhanced-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`enhanced-timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-connector">
                <motion.div
                  className="timeline-dot"
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: 360,
                    boxShadow: '0 0 20px rgba(139, 69, 19, 0.8)',
                    backgroundColor: '#fa541c'
                  }}
                  onClick={() => handleExperienceClick(exp)}
                  transition={{ type: "spring", stiffness: 300 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge count={exp.achievements.length} offset={[10, -10]}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FiBriefcase />
                    </motion.div>
                  </Badge>
                </motion.div>
              </div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
                  borderColor: '#1890ff'
                }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="experience-card"
                  hoverable
                  actions={[
                    <Tooltip title="Rate this experience">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Rate disabled defaultValue={exp.rating} />
                      </motion.div>
                    </Tooltip>,
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button
                        type="primary"
                        icon={<motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <TrophyOutlined />
                        </motion.div>}
                        onClick={() => handleExperienceClick(exp)}
                        style={{
                          background: 'linear-gradient(45deg, #1890ff, #722ed1)',
                          borderColor: 'transparent'
                        }}
                      >
                        Celebrate
                      </Button>
                    </motion.div>
                  ]}
                >
                <div className="experience-header">
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <motion.div 
                      className="title-row"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.h3 
                        className="job-title"
                        whileHover={{ color: '#1890ff' }}
                        transition={{ duration: 0.3 }}
                      >
                        {exp.title}
                      </motion.h3>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <Tag color={exp.type === 'Full-time' ? 'green' : exp.type === 'Internship' ? 'blue' : 'orange'}>
                          {exp.type}
                        </Tag>
                      </motion.div>
                    </motion.div>
                    
                    <motion.h4 
                      className="company-name"
                      whileHover={{ color: '#722ed1', scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {exp.company}
                    </motion.h4>
                    
                    <Space className="job-details">
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Tag icon={<FiCalendar />} color="purple">
                          {exp.duration}
                        </Tag>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Tag icon={<FiMapPin />} color="cyan">
                          {exp.location}
                        </Tag>
                      </motion.div>
                    </Space>
                  </Space>
                </div>

                <motion.div 
                  className="achievements-section"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h5
                    whileHover={{ color: '#faad14', scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <TrophyOutlined style={{ marginRight: '8px' }} />
                    </motion.span>
                    Achievements
                  </motion.h5>
                  <Space wrap>
                    {exp.achievements.map((achievement, idx) => (
                      <motion.div
                        key={achievement}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.1 }}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, 2, -2, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        <Tag color="gold" icon={<StarOutlined />}>
                          {achievement}
                        </Tag>
                      </motion.div>
                    ))}
                  </Space>
                </motion.div>

                <ul className="job-description">{exp.description.map((desc, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.2 + idx * 0.1 }}
                      whileHover={{ 
                        x: 5, 
                        color: '#1890ff',
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        {desc}
                      </motion.span>
                    </motion.li>
                  ))}
                </ul>

                <div className="technologies">
                  <motion.h5
                    whileHover={{ color: '#52c41a', scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    Technologies Used
                  </motion.h5>
                  <Space wrap>
                    {exp.technologies.map((tech, idx) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + idx * 0.05 }}
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: idx % 2 === 0 ? 3 : -3,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                      >
                        <Tag 
                          color={
                            tech.includes('React') ? 'blue' :
                            tech.includes('Python') ? 'green' :
                            tech.includes('JavaScript') ? 'orange' :
                            tech.includes('AWS') ? 'volcano' :
                            tech.includes('MongoDB') ? 'geekblue' :
                            'processing'
                          }
                        >
                          {tech}
                        </Tag>
                      </motion.div>
                    ))}
                  </Space>
                </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Experience;
