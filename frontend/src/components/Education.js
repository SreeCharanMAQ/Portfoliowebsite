import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBook, FiAward, FiCalendar, FiMapPin } from 'react-icons/fi';
import './Education.css';

const Education = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const education = [
    {
      id: 1,
      degree: 'Bachelor of Technology',
      field: 'Computer Science Engineering',
      institution: 'Your University Name',
      location: 'Hyderabad, India',
      duration: '2019 - 2023',
      gpa: '8.5/10',
      description: 'Focused on software engineering, data structures, algorithms, and web development. Completed projects in machine learning and full-stack development.',
      achievements: [
        'Dean\'s List for Academic Excellence',
        'President of Computer Science Club',
        'Winner of Inter-College Coding Competition',
        'Published research paper on Web Technologies'
      ]
    },
    {
      id: 2,
      degree: 'Senior Secondary (12th)',
      field: 'Science (PCM)',
      institution: 'Your School Name',
      location: 'Your City, India',
      duration: '2017 - 2019',
      gpa: '92%',
      description: 'Specialized in Mathematics, Physics, and Chemistry with computer science as an additional subject.',
      achievements: [
        'School Topper in Computer Science',
        'State Level Mathematics Olympiad Participant',
        'Science Club Secretary'
      ]
    }
  ];

  const certifications = [
    {
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-123456'
    },
    {
      title: 'React Developer Certification',
      issuer: 'Meta (Facebook)',
      date: '2023',
      credentialId: 'META-789012'
    },
    {
      title: 'Python for Data Science',
      issuer: 'IBM',
      date: '2022',
      credentialId: 'IBM-345678'
    },
    {
      title: 'Full Stack Web Development',
      issuer: 'Coursera',
      date: '2022',
      credentialId: 'COURSERA-901234'
    }
  ];

  return (
    <section id="education" className="section education" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Education & Certifications
        </motion.h2>

        <div className="education-content">
          <div className="education-section">
            <motion.h3
              className="subsection-title"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FiBook className="subsection-icon" />
              Education
            </motion.h3>

            <div className="education-list">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  className="education-item"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="education-header">
                    <div className="education-main">
                      <h4 className="degree">{edu.degree}</h4>
                      <p className="field">{edu.field}</p>
                      <div className="institution-info">
                        <span className="institution">{edu.institution}</span>
                        <span className="location">
                          <FiMapPin /> {edu.location}
                        </span>
                      </div>
                    </div>
                    <div className="education-meta">
                      <span className="duration">
                        <FiCalendar /> {edu.duration}
                      </span>
                      <span className="gpa">GPA: {edu.gpa}</span>
                    </div>
                  </div>

                  <p className="education-description">{edu.description}</p>

                  <div className="achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="certifications-section">
            <motion.h3
              className="subsection-title"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FiAward className="subsection-icon" />
              Certifications
            </motion.h3>

            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  className="certification-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="cert-icon">
                    <FiAward />
                  </div>
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <div className="cert-meta">
                    <span className="cert-date">{cert.date}</span>
                    <span className="cert-id">ID: {cert.credentialId}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="education-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="stat-item">
            <span className="stat-number">4+</span>
            <span className="stat-label">Years of Study</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">8.5</span>
            <span className="stat-label">CGPA</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4+</span>
            <span className="stat-label">Certifications</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15+</span>
            <span className="stat-label">Courses Completed</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
