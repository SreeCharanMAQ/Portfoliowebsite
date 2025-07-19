import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, Button, Space, Typography, Tag, Progress, 
  Rate, Avatar, Tooltip, Badge, Divider 
} from 'antd';
import { 
  StarOutlined, HeartOutlined, ThunderboltOutlined,
  TrophyOutlined, FireOutlined, RocketOutlined
} from '@ant-design/icons';
import LottieAnimation from './LottieAnimation';
import './EnhancementShowcase.css';

const { Title, Paragraph, Text } = Typography;

const EnhancementShowcase = ({ triggerConfetti }) => {
  const skills = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'Ant Design', level: 90, color: '#1890FF' },
    { name: 'Lottie', level: 85, color: '#00DDB3' },
    { name: 'Lenis', level: 88, color: '#FF6B6B' }
  ];

  const achievements = [
    { icon: <TrophyOutlined />, title: 'Portfolio Enhanced', desc: 'Modern UI/UX' },
    { icon: <StarOutlined />, title: 'Animations Added', desc: 'Lottie & Framer' },
    { icon: <ThunderboltOutlined />, title: 'Smooth Scrolling', desc: 'Lenis Integration' },
    { icon: <RocketOutlined />, title: 'Interactive Elements', desc: 'Ant Design Components' }
  ];

  return (
    <section className="enhancement-showcase">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
            🚀 Enhanced Portfolio Features
          </Title>
          
          <div className="features-grid">
            {/* Lottie Animation Demo */}
            <Card 
              hoverable 
              className="feature-card glass-effect"
              cover={
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <LottieAnimation width={200} height={200} />
                </div>
              }
            >
              <Card.Meta
                title={<><FireOutlined /> Lottie Animations</>}
                description="Beautiful animated graphics that bring life to your portfolio"
              />
              <Divider />
              <Space>
                <Tag color="success">Interactive</Tag>
                <Tag color="processing">Smooth</Tag>
                <Tag color="warning">Engaging</Tag>
              </Space>
            </Card>

            {/* Ant Design Components Demo */}
            <Card hoverable className="feature-card glass-effect">
              <Card.Meta
                avatar={<Avatar style={{ backgroundColor: '#1890FF' }} icon={<StarOutlined />} />}
                title="Ant Design Integration"
                description="Professional UI components for enhanced user experience"
              />
              <Divider />
              <Space direction="vertical" style={{ width: '100%' }}>
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <Text>{skill.name}</Text>
                    <Progress 
                      percent={skill.level} 
                      strokeColor={skill.color}
                      size="small"
                    />
                  </div>
                ))}
              </Space>
              <Divider />
              <Button 
                type="primary" 
                block 
                onClick={() => triggerConfetti && triggerConfetti()}
                icon={<RocketOutlined />}
              >
                Trigger Celebration! 🎉
              </Button>
            </Card>

            {/* Smooth Scrolling Demo */}
            <Card hoverable className="feature-card glass-effect">
              <Card.Meta
                title={<><ThunderboltOutlined /> Lenis Smooth Scrolling</>}
                description="Buttery smooth scrolling experience throughout the portfolio"
              />
              <Divider />
              <Space size="small" wrap>
                <Badge count="NEW" color="red">
                  <Tag color="cyan">Smooth</Tag>
                </Badge>
                <Badge count="HOT" color="orange">
                  <Tag color="magenta">Responsive</Tag>
                </Badge>
                <Tag color="purple">Performance</Tag>
              </Space>
              <Divider />
              <Rate defaultValue={5} disabled />
              <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                Perfect scrolling experience
              </Text>
            </Card>

            {/* Interactive Features */}
            <Card hoverable className="feature-card glass-effect">
              <Card.Meta
                title={<><HeartOutlined /> Interactive Elements</>}
                description="Engaging hover effects, confetti celebrations, and smooth animations"
              />
              <Divider />
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <Tooltip key={index} title={achievement.desc}>
                    <motion.div
                      className="achievement-item"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Avatar 
                        style={{ backgroundColor: '#52c41a' }} 
                        icon={achievement.icon} 
                      />
                      <Text strong>{achievement.title}</Text>
                    </motion.div>
                  </Tooltip>
                ))}
              </div>
            </Card>
          </div>

          <motion.div
            className="tech-stack"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Title level={4} style={{ textAlign: 'center', margin: '3rem 0 1rem' }}>
              Enhanced with Modern Technologies
            </Title>
            <Space size="large" wrap style={{ justifyContent: 'center', width: '100%' }}>
              <Tag color="blue" style={{ padding: '8px 16px', fontSize: '14px' }}>
                🎨 Lottie Animations
              </Tag>
              <Tag color="green" style={{ padding: '8px 16px', fontSize: '14px' }}>
                🎯 Ant Design
              </Tag>
              <Tag color="purple" style={{ padding: '8px 16px', fontSize: '14px' }}>
                ⚡ Lenis Scrolling
              </Tag>
              <Tag color="orange" style={{ padding: '8px 16px', fontSize: '14px' }}>
                🎉 Canvas Confetti
              </Tag>
              <Tag color="red" style={{ padding: '8px 16px', fontSize: '14px' }}>
                🌟 Framer Motion
              </Tag>
            </Space>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancementShowcase;
