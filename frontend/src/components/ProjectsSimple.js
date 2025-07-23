import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Card, Tag, Button, Tabs } from 'antd';
import { 
  CodeOutlined, 
  RocketOutlined,
  CalendarOutlined,
  TeamOutlined,
  StarOutlined,
  GithubOutlined,
  GlobalOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;

const ProjectsSimple = ({ triggerConfetti }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Static project data
  const projects = [
    {
      id: 1,
      title: 'Study Buddy - AI Learning Assistant',
      description: 'An advanced AI-powered learning assistant that helps students master complex topics through personalized guidance, interactive exercises, and intelligent feedback.',
      short_description: 'AI assistant for personalized learning and academic growth',
      thumbnail: '/project/study-buddy/main.jpg',
      main_image: '/project/study-buddy/main.jpg',
      images: ['/project/study-buddy/1.jpg', '/project/study-buddy/2.jpg', '/project/study-buddy/3.jpg'],
      technologies: ['React.js', 'Python', 'TensorFlow', 'NLP', 'OpenAI API'],
      github_url: 'https://github.com/SreeCharanMAQ/study-buddy',
      live_url: 'https://study-buddy-demo.netlify.app',
      category: 'AI/ML',
      date_completed: '2024-06-15',
      team_size: 4,
      featured: true,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Health Buddy',
      description: 'AI-powered healthcare assistant for personalized wellness monitoring and medical advice. Uses machine learning to provide health insights based on user data.',
      short_description: 'Healthcare AI assistant for personal wellness',
      thumbnail: '/project/health-buddy/main.jpg',
      main_image: '/project/health-buddy/main.jpg',
      images: ['/project/health-buddy/1.jpg', '/project/health-buddy/2.jpg'],
      technologies: ['React Native', 'TensorFlow', 'AWS', 'Firebase'],
      github_url: 'https://github.com/SreeCharanMAQ/health-buddy',
      live_url: 'https://health-buddy-demo.netlify.app',
      category: 'Healthcare',
      date_completed: '2024-05-10',
      team_size: 3,
      featured: true,
      status: 'completed'
    },
    {
      id: 3,
      title: 'Agriculture Buddy',
      description: 'Smart farming solution with crop monitoring, prediction analytics, and resource management. Helps farmers optimize crop yields and resource usage.',
      short_description: 'Smart farming solution for agricultural optimization',
      thumbnail: '/project/agriculture-buddy/main.jpg',
      main_image: '/project/agriculture-buddy/main.jpg',
      images: ['/project/agriculture-buddy/1.jpg', '/project/agriculture-buddy/2.jpg'],
      technologies: ['IoT', 'Machine Learning', 'React', 'Node.js'],
      github_url: 'https://github.com/SreeCharanMAQ/agri-buddy',
      live_url: 'https://agri-buddy-demo.netlify.app',
      category: 'AgriTech',
      date_completed: '2024-04-20',
      team_size: 4,
      featured: true,
      status: 'completed'
    },
    {
      id: 4,
      title: 'Vision AI',
      description: 'Advanced computer vision platform for object detection, facial recognition, and scene understanding. Uses state-of-the-art AI models for real-time image analysis.',
      short_description: 'Advanced computer vision platform for image analysis',
      thumbnail: '/project/vision-ai/main.jpg',
      main_image: '/project/vision-ai/main.jpg',
      images: ['/project/vision-ai/1.jpg', '/project/vision-ai/2.jpg'],
      technologies: ['PyTorch', 'OpenCV', 'React', 'Flask'],
      github_url: 'https://github.com/SreeCharanMAQ/vision-ai',
      live_url: 'https://vision-ai-demo.netlify.app',
      category: 'AI/ML',
      date_completed: '2024-03-15',
      team_size: 3,
      featured: true,
      status: 'completed'
    },
    {
      id: 5,
      title: 'Smart Predict',
      description: 'Predictive analytics tool for business intelligence and market forecasting. Leverages machine learning algorithms to provide actionable insights from complex data sets.',
      short_description: 'Business intelligence with predictive analytics',
      thumbnail: '/project/smart-predict/main.jpg',
      main_image: '/project/smart-predict/main.jpg',
      images: ['/project/smart-predict/1.jpg', '/project/smart-predict/2.jpg'],
      technologies: ['Python', 'R', 'D3.js', 'MongoDB'],
      github_url: 'https://github.com/SreeCharanMAQ/smart-predict',
      live_url: 'https://smart-predict-demo.netlify.app',
      category: 'Data Science',
      date_completed: '2024-02-28',
      team_size: 5,
      featured: true,
      status: 'completed'
    }
  ];
  
  // State management - we're using static data, so no loading state needed

  const categories = ['all', ...new Set(projects.map(project => project.category))];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const getCategoryIcon = (category) => {
    const iconMap = {
      'AI/ML': '🤖',
      'Healthcare': '🏥',
      'AgriTech': '🌱',
      'all': '📁'
    };
    return iconMap[category] || '💼';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'AI/ML': '#1890ff',
      'Healthcare': '#52c41a',
      'AgriTech': '#faad14',
    };
    return colorMap[category] || '#722ed1';
  };

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
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <CodeOutlined className="title-icon" />
            Featured Projects
          </h2>
          <p className="section-subtitle">
            Innovative solutions built with cutting-edge technologies
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="projects-tabs"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs 
            activeKey={activeCategory} 
            onChange={setActiveCategory}
            centered
            size="large"
          >
            {categories.map(category => (
              <TabPane 
                tab={
                  <span>
                    {getCategoryIcon(category)}
                    {category === 'all' ? 'All Projects' : category}
                  </span>
                } 
                key={category} 
              />
            ))}
          </Tabs>
        </motion.div>

        {/* Projects Grid - Simple Cards Only */}
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <Card
                hoverable
                cover={
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img 
                      src={project.image_url || '/project/default.jpg'} 
                      alt={project.title}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2NjdlZWE7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNzY0YmEyO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz48dGV4dCB4PSI1MCUiIHk9IjQ1JSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjxmb250LXNpemU9IjM2Ij7wn5qAPC9mb250LXNpemU+PC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RmVhdHVyZWQgUHJvamVjdDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '60px',
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      pointerEvents: 'none'
                    }} />
                    
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: getCategoryColor(project.category),
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <span style={{ fontSize: '14px' }}>{getCategoryIcon(project.category)}</span>
                      {project.category}
                    </div>
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        boxShadow: '0 2px 8px rgba(255,107,107,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <RocketOutlined style={{ fontSize: '12px' }} />
                        Featured
                      </div>
                    )}

                    {/* Status Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '15px',
                      left: '15px',
                      background: project.status === 'completed' ? '#52c41a' : '#faad14',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '15px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {project.status || 'Active'}
                    </div>
                  </div>
                }
                actions={[
                  <Button 
                    type="primary" 
                    icon={<EyeOutlined />}
                    onClick={() => {
                      if (triggerConfetti) triggerConfetti();
                      navigate(`/project/${project.id}`);
                    }}
                    size="small"
                  >
                    View
                  </Button>,
                  <Button 
                    icon={<GithubOutlined />}
                    href={project.github_url}
                    target="_blank"
                    size="small"
                  >
                    Code
                  </Button>,
                  <Button 
                    icon={<GlobalOutlined />}
                    href={project.demo_url || project.project_url}
                    target="_blank"
                    size="small"
                  >
                    Demo
                  </Button>
                ]}
              >
                <div>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 'bold' }}>
                    {project.title}
                  </h3>
                  <p style={{ margin: '0 0 15px 0', color: '#666', lineHeight: '1.5' }}>
                    {project.description}
                  </p>
                  
                  <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center', fontSize: '12px', color: '#999' }}>
                    <CalendarOutlined style={{ marginRight: '5px' }} />
                    {new Date(project.created_at).toLocaleDateString()}
                    {project.team_size && (
                      <>
                        <TeamOutlined style={{ marginLeft: '15px', marginRight: '5px' }} />
                        {project.team_size} members
                      </>
                    )}
                  </div>

                  <div style={{ marginTop: '15px' }}>
                    {project.technologies && project.technologies.map((tech, index) => (
                      <Tag 
                        key={index}
                        color={getCategoryColor(project.category)}
                        style={{ marginBottom: '5px' }}
                      >
                        {typeof tech === 'string' ? tech : tech.name || tech}
                      </Tag>
                    ))}
                  </div>

                  {project.features && project.features.length > 0 && (
                    <div style={{ marginTop: '15px' }}>
                      <h4 style={{ fontSize: '14px', margin: '0 0 8px 0' }}>Key Features:</h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
                        {project.features.slice(0, 3).map((feature, index) => (
                          <li key={index} style={{ marginBottom: '3px' }}>
                            {typeof feature === 'string' ? feature : feature.feature_text || feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '3rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '15px',
            color: 'white'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div style={{ textAlign: 'center' }}>
            <StarOutlined style={{ fontSize: '24px', marginBottom: '10px' }} />
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{projects.length}</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Projects</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <RocketOutlined style={{ fontSize: '24px', marginBottom: '10px' }} />
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{categories.length - 1}</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Categories</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <CodeOutlined style={{ fontSize: '24px', marginBottom: '10px' }} />
            <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
              {new Set(projects.flatMap(p => p.technologies || [])).size}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>Technologies</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSimple;
