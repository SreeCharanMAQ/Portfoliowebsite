import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { 
  FaReact, FaNodeJs, FaPython, FaJsSquare, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaDocker, FaAws, FaDatabase 
} from 'react-icons/fa';
import { 
  SiTypescript, SiMongodb, SiPostgresql, SiExpress, SiFlask, 
  SiTailwindcss, SiRedux, SiFirebase, SiGraphql, SiJest 
} from 'react-icons/si';
import './Skills.css';



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
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'JavaScript', icon: <FaJsSquare />, color: '#F7DF1E' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
        { name: 'Redux', icon: <SiRedux />, color: '#764ABC' }
      ]
    },
    backend: {
      title: 'Backend Development',
      skills: [
        { name: 'Python', icon: <FaPython />, color: '#3776AB' },
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'Express.js', icon: <SiExpress />, color: '#000000' },
        { name: 'Flask', icon: <SiFlask />, color: '#000000' },
        { name: 'GraphQL', icon: <SiGraphql />, color: '#E10098' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
        { name: 'Jest', icon: <SiJest />, color: '#C21325' },
        { name: 'Database Design', icon: <FaDatabase />, color: '#336791' }
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
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Skills;
