import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Progress, Card, Tabs, Badge, Rate, Tooltip } from 'antd';
import { 
  FaReact, FaNodeJs, FaPython, FaJsSquare, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaDocker, FaAws, FaDatabase 
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, SiExpress, SiFlask, 
  SiTailwindcss, SiRedux, SiFirebase, SiGraphql, SiJest 
} from 'react-icons/si';
import LottieAnimation from './LottieAnimation';
import './Skills.css';

const { TabPane } = Tabs;

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      skills: [
        { name: 'React', icon: <FaReact />, level: 90, color: '#61DAFB' },
        { name: 'JavaScript', icon: <FaJsSquare />, level: 88, color: '#F7DF1E' },
        { name: 'TypeScript', icon: <SiTypescript />, level: 85, color: '#3178C6' },
        { name: 'HTML5', icon: <FaHtml5 />, level: 95, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, level: 90, color: '#1572B6' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 88, color: '#06B6D4' },
        { name: 'Redux', icon: <SiRedux />, level: 82, color: '#764ABC' }
      ]
    },
    backend: {
      title: 'Backend Development',
      skills: [
        { name: 'Python', icon: <FaPython />, level: 90, color: '#3776AB' },
        { name: 'Node.js', icon: <FaNodeJs />, level: 85, color: '#339933' },
        { name: 'Express.js', icon: <SiExpress />, level: 88, color: '#000000' },
        { name: 'Flask', icon: <SiFlask />, level: 86, color: '#000000' },
        { name: 'GraphQL', icon: <SiGraphql />, level: 75, color: '#E10098' },
        { name: 'MongoDB', icon: <SiMongodb />, level: 85, color: '#47A248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 82, color: '#336791' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, level: 90, color: '#F05032' },
        { name: 'Docker', icon: <FaDocker />, level: 78, color: '#2496ED' },
        { name: 'AWS', icon: <FaAws />, level: 75, color: '#FF9900' },
        { name: 'Firebase', icon: <SiFirebase />, level: 80, color: '#FFCA28' },
        { name: 'Jest', icon: <SiJest />, level: 82, color: '#C21325' },
        { name: 'Database Design', icon: <FaDatabase />, level: 85, color: '#336791' }
      ]
    }
  };

  const categories = Object.keys(skillCategories);

  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Skills & Technologies
        </motion.h2>

        <motion.div
          className="skills-nav"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`nav-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {skillCategories[category].title}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="skills-content"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="skills-grid">
            {skillCategories[activeCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                
                <h3 className="skill-name">{skill.name}</h3>
                
                <div className="skill-progress">
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                  <span className="skill-level">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="skills-summary"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="summary-item">
            <h3>Frontend Focus</h3>
            <p>Specialized in React ecosystem with modern JavaScript/TypeScript</p>
          </div>
          <div className="summary-item">
            <h3>Backend Expertise</h3>
            <p>Proficient in Python and Node.js for scalable server solutions</p>
          </div>
          <div className="summary-item">
            <h3>Full Stack</h3>
            <p>End-to-end development from UI/UX to database optimization</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
