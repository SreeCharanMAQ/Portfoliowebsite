import React from 'react';

// NOTE: All data is static/hardcoded - no backend connection is used
// All the static data that would normally come from a backend database
const staticProject = {
  title: 'Study Buddy - AI Learning Assistant',
  description: 'An advanced AI-powered learning assistant that helps students master complex topics through personalized guidance, interactive exercises, and intelligent feedback.',
  long_description: 'Study Buddy leverages state-of-the-art AI to revolutionize the learning experience. It adapts to individual learning styles, identifies knowledge gaps, and provides customized learning paths to maximize educational outcomes.',
  features: [
    'AI Roadmap Generator: Creates personalized learning paths based on your goals',
    'Smart Code Editor: Interactive coding environment with real-time AI assistance',
    'AI Proctored Testing: Fair assessment with advanced monitoring',
    'Profile Dashboard: Track your progress and achievements',
    '1vs1 Comparison: Compare your performance with peers',
    'LinkedIn Analyzer: Get career insights and recommendations',
  ],
  technologies: [
    'React.js', 'Python', 'TensorFlow', 'Natural Language Processing', 
    'Computer Vision', 'OpenAI API', 'LangChain', 'MongoDB'
  ],
  team: [
    { name: 'Sree Charan', role: 'Full Stack Developer', avatar: '👨‍💻' },
    { name: 'Alex Johnson', role: 'UI/UX Designer', avatar: '🎨' },
    { name: 'Sarah Kim', role: 'Backend Developer', avatar: '⚡' },
    { name: 'Mike Chen', role: 'DevOps Engineer', avatar: '🚀' }
  ],
  status: 'Completed',
  category: 'AI/ML',
  github_url: 'https://github.com/example/study-buddy',
  demo_url: 'https://example.com/study-buddy-demo',
  image_url: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Study+Buddy',
  screenshots: [
    'https://via.placeholder.com/800x600/667eea/ffffff?text=AI+Roadmap+Generator',
    'https://via.placeholder.com/800x600/764ba2/ffffff?text=Smart+Code+Editor',
    'https://via.placeholder.com/800x600/f093fb/ffffff?text=AI+Proctored+Testing',
    'https://via.placeholder.com/800x600/4facfe/ffffff?text=Profile+Dashboard',
    'https://via.placeholder.com/800x600/52c41a/ffffff?text=1vs1+Comparison',
    'https://via.placeholder.com/800x600/faad14/ffffff?text=LinkedIn+Analyzer'
  ],
  timeline: [
    { date: '2024-01', phase: 'Planning & Research', status: 'completed' },
    { date: '2024-02', phase: 'UI/UX Design', status: 'completed' },
    { date: '2024-03', phase: 'Frontend Development', status: 'completed' },
    { date: '2024-04', phase: 'Backend Implementation', status: 'completed' },
    { date: '2024-05', phase: 'Testing & QA', status: 'completed' },
    { date: '2024-06', phase: 'Deployment & Launch', status: 'completed' },
    { date: '2024-07', phase: 'Maintenance & Updates', status: 'current' }
  ],
  stats: {
    downloads: 23456,
    stars: 532,
    forks: 123,
    issues: 21,
    contributors: 7,
    commits: 342,
    codeLines: 8532,
    uptime: 99.8,
    performance: 94,
    security: 91,
    maintainability: 88
  },
  challenges: [
    {
      title: 'AI Model Integration & Performance',
      description: 'Integrating multiple AI models while maintaining low latency and high accuracy for real-time learning assistance.',
      solution: 'Implemented model optimization techniques, caching strategies, and asynchronous processing to ensure seamless AI-powered experiences.'
    },
    {
      title: 'Real-time AI Proctoring System',
      description: 'Building a robust computer vision system for AI proctoring while ensuring privacy and accuracy.',
      solution: 'Developed edge-based processing with face detection, gaze tracking, and anomaly detection with privacy-first design.'
    },
    {
      title: 'Multi-Platform Data Aggregation',
      description: 'Aggregating and synchronizing data from multiple platforms with different API rate limits and structures.',
      solution: 'Created a unified data pipeline with smart caching, rate limiting, and data normalization.'
    }
  ],
  
  // Featured Projects data
  featuredProjects: [
    {
      id: 1,
      title: "Health Buddy",
      description: "AI-powered healthcare assistant for personalized wellness monitoring and medical advice.",
      image_url: "https://via.placeholder.com/300x200/3498db/ffffff?text=Health+Buddy",
      category: "Healthcare",
      technologies: ["React Native", "TensorFlow", "AWS", "Firebase"],
      github_url: "https://github.com/example/health-buddy",
      demo_url: "https://example.com/health-buddy",
      featured: true
    },
    {
      id: 2,
      title: "Agriculture Buddy",
      description: "Smart farming solution with crop monitoring, prediction analytics, and resource management.",
      image_url: "https://via.placeholder.com/300x200/27ae60/ffffff?text=Agriculture+Buddy",
      category: "AgriTech",
      technologies: ["IoT", "Machine Learning", "React", "Node.js"],
      github_url: "https://github.com/example/agri-buddy",
      demo_url: "https://example.com/agri-buddy",
      featured: true
    },
    {
      id: 3,
      title: "Vision AI",
      description: "Advanced computer vision platform for object detection, facial recognition, and scene understanding.",
      image_url: "https://via.placeholder.com/300x200/8e44ad/ffffff?text=Vision+AI",
      category: "AI/ML",
      technologies: ["PyTorch", "OpenCV", "React", "Flask"],
      github_url: "https://github.com/example/vision-ai",
      demo_url: "https://example.com/vision-ai",
      featured: true
    },
    {
      id: 4,
      title: "Smart Predict",
      description: "Predictive analytics tool for business intelligence and market forecasting.",
      image_url: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=Smart+Predict",
      category: "Data Science",
      technologies: ["Python", "R", "D3.js", "MongoDB"],
      github_url: "https://github.com/example/smart-predict",
      demo_url: "https://example.com/smart-predict",
      featured: true
    }
  ],
  
  // Hackathons data
  hackathons: [
    {
      id: 3,
      name: "DevFest Jalandhar 2024",
      description: "Won DevFest Jalandhar, a tech conference hosted by Google Developer Groups Jalandhar, bringing developers together to learn and innovate. Judges were so impressed that they awarded us monetary rewards and goodies, including exclusive event T-shirts. Connected with fellow developers and explored new ideas while using Google's tools in an event filled with learning, collaboration, and unforgettable memories!",
      date: "December 2024",
      location: "Jalandhar",
      result: "1st Place",
      image_url: "/photo/devfest/main.jpg",
      technologies: ["React", "Node.js", "AI/ML", "Google Cloud"],
      team_size: 4,
      challenge: "48 hours hackathon to build innovative solutions using Google technologies",
      solution: "Created an integrated platform that leveraged Google's tools for solving real-world problems",
      prize: "₹15,000",
      organizer: "Google Developer Groups",
      link: "https://example.com/devfest-jalandhar",
      highlights: [
        { title: "Google Tools Integration", description: "Built using Google's cutting-edge tools and technologies" },
        { title: "Innovation Focus", description: "Explored new ideas while using Google's development ecosystem" },
        { title: "Collaborative Development", description: "Connected with fellow developers in an inspiring environment" },
        { title: "Event T-shirts & Goodies", description: "Received exclusive event merchandise and rewards" }
      ]
    },
    {
      id: 5,
      name: "Arena Hackathon 2024",
      description: "Arena Tech Challenge hackathon where we built innovative solutions and competed with talented developers from across the region. Focused on creating impactful technology solutions with modern development practices.",
      date: "October 2024",
      location: "Arena Tech Challenge",
      result: "2nd Place",
      image_url: "/photo/arena/main.jpg",
      technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
      team_size: 4,
      challenge: "Build solutions using modern development practices for real-world problems",
      solution: "Developed a comprehensive platform with modern architecture and user-centric design",
      prize: "₹12,000",
      organizer: "Arena Tech Challenge",
      link: "https://example.com/arena-hackathon",
      images: [
        "/photo/arena/1.jpg",
        "/photo/arena/2.jpg",
        "/photo/arena/3.jpg"
      ]
    },
    {
      id: 6,
      name: "Code-a-Haunt Halloween Hackathon",
      description: "Spooky themed hackathon where we created Halloween-inspired tech solutions with a creative twist. An incredible journey with amazing teammates showcasing innovation in a fun, themed environment.",
      date: "October 2024",
      location: "Code-a-Haunt 2024",
      result: "3rd Place",
      image_url: "/photo/code-a-haunt/main.jpg",
      technologies: ["Python", "Flask", "JavaScript", "CSS"],
      team_size: 3,
      challenge: "Create Halloween-themed technical solutions with innovative approaches",
      solution: "Built an interactive Halloween-inspired platform with unique user experiences",
      prize: "₹8,000",
      organizer: "Code-a-Haunt 2024",
      link: "https://example.com/code-a-haunt"
    },
    {
      id: 7,
      name: "Code of Duty Gaming Hackathon",
      description: "Gaming-focused hackathon where we developed innovative gaming solutions and interactive experiences. Built cutting-edge gaming applications with modern technologies and creative gameplay mechanics.",
      date: "September 2024",
      location: "Gaming Community 2024",
      result: "1st Place",
      image_url: "/photo/code-of-duty/main.jpg",
      technologies: ["Unity", "C#", "JavaScript", "WebGL"],
      team_size: 4,
      challenge: "Develop innovative gaming solutions with modern technology",
      solution: "Created cutting-edge gaming application with unique gameplay mechanics",
      prize: "₹20,000",
      organizer: "Gaming Community 2024",
      link: "https://example.com/code-of-duty",
      images: [
        "/photo/code-of-duty/1.jpg",
        "/photo/code-of-duty/2.jpg",
        "/photo/code-of-duty/3.jpg",
        "/photo/code-of-duty/4.jpg"
      ]
    },
    {
      id: 8,
      name: "Code Cubicle by Microsoft",
      description: "Incredible journey to becoming 3rd runners-up at the Code Cubicle by Geek Room at Microsoft! Team 'The Losers' built our entire project in just 7 days! We dove deep into web scraping and mastered Streamlit, winning ₹5000 cash prize. The venue was incredible, and the experience was unforgettable!",
      date: "August 2024",
      location: "Microsoft Campus",
      result: "3rd Place",
      image_url: "/photo/microsoft/main.jpg",
      technologies: ["Python", "Streamlit", "Web Scraping", "Data Science"],
      team_size: 5,
      challenge: "Build innovative solutions in just 7 days",
      solution: "Developed a comprehensive Streamlit application with advanced web scraping capabilities",
      prize: "₹5,000",
      organizer: "Microsoft & Geek Room",
      link: "https://example.com/code-cubicle",
      highlights: [
        { title: "Web Scraping Mastery", description: "Advanced web scraping techniques for data collection" },
        { title: "Streamlit Application", description: "Built comprehensive project using Streamlit framework" },
        { title: "7-Day Development", description: "Complete project development in just one week" },
        { title: "Microsoft Venue Experience", description: "Incredible venue and networking opportunities" }
      ],
      images: [
        "/photo/microsoft/2.jpg",
        "/photo/microsoft/3.jpg",
        "/photo/microsoft/4.jpg",
        "/photo/microsoft/5.jpg"
      ]
    },
    {
      id: 9,
      name: "Adobe GenSolve Hackathon",
      description: "Thrilled to announce that our team placed in the top 5 percentile of the Adobe GenSolve Hackathon! This achievement showcases our technical excellence and innovative problem-solving skills in competitive environment with thousands of participants.",
      date: "July 2024",
      location: "Adobe HQ",
      result: "Top 5%",
      image_url: "/photo/microsoft/main.jpg",
      technologies: ["Adobe Creative Suite", "AI/ML", "Design Tech", "JavaScript"],
      team_size: 4,
      challenge: "Develop innovative solutions using Adobe technologies",
      solution: "Created cutting-edge applications that showcase technical excellence and design thinking",
      prize: "Recognition",
      organizer: "Adobe & GeeksforGeeks",
      link: "https://example.com/adobe-gensolve",
      images: [
        "/photo/microsoft/6.jpg",
        "/photo/microsoft/7.jpg"
      ]
    },
    {
      id: 10,
      name: "Code Fusion Hackathon",
      description: "🎉 Thrilled to announce: We Won First Place at Code Fusion Hackathon! We developed an innovative job portal with AI features including resume builder, personalized roadmap builder, and chatbot assistance. Our next-level UI offers seamless experience. Earned exclusive internship opportunity at LWT Academy, Singapore!",
      date: "June 2024",
      location: "Chandigarh University",
      result: "1st Place",
      image_url: "/photo/other/main.jpg",
      technologies: ["React", "AI/ML", "Full Stack", "UI/UX"],
      team_size: 4,
      challenge: "Create innovative solutions with practical applications",
      solution: "Developed an AI-powered job portal with unique features and exceptional user experience",
      prize: "Internship + Prize",
      organizer: "Chandigarh University",
      link: "https://example.com/code-fusion",
      highlights: [
        { title: "First Place Victory", description: "Won top position in Chandigarh University hackathon" },
        { title: "Singapore Internship", description: "Earned exclusive internship opportunity at LWT Academy" },
        { title: "UI/UX Excellence", description: "Recognized for next-level user interface design" }
      ],
      images: [
        "/photo/other/1.png",
        "/photo/other/2.png"
      ],
      features: [
        { title: "Dual Interface Portal", description: "Separate interfaces for recruiters and job seekers" },
        { title: "AI Resume Builder", description: "Intelligent resume generation and optimization" },
        { title: "Personalized Roadmaps", description: "Custom learning and career path recommendations" },
        { title: "Next-Level UI/UX", description: "Seamless and engaging user experience design" }
      ]
    },
    {
      id: 11,
      name: "EdTech Innovation Sprint",
      description: "An innovative educational platform that revolutionizes online learning through AI-powered personalized content delivery and real-time collaboration tools. Built during TechCrunch Disrupt 2024, this project showcases the future of education technology with advanced AI integration and seamless user experience.",
      date: "March 2024",
      location: "TechCrunch Disrupt 2024",
      result: "1st Place",
      image_url: "/photo/other/main.jpg",
      technologies: ["React", "Python", "AI/ML", "MongoDB", "Node.js", "TensorFlow"],
      team_size: 4,
      challenge: "Revolutionize online education through innovative technology",
      solution: "Built an AI-powered educational platform with personalized learning experiences",
      prize: "₹25,000",
      organizer: "TechCrunch Disrupt 2024",
      link: "https://example.com/edtech-innovation",
      highlights: [
        { title: "TechCrunch Disrupt Winner", description: "Won first place at prestigious TechCrunch Disrupt 2024" },
        { title: "₹25,000 Prize Money", description: "Substantial cash prize for educational innovation" },
        { title: "EdTech Innovation Award", description: "Recognized for revolutionary approach to online learning" },
        { title: "Industry Recognition", description: "Featured by TechCrunch for innovative educational solutions" }
      ],
      timeline: [
        { title: "Platform Architecture Design", description: "Designed comprehensive educational platform architecture" },
        { title: "AI Integration Development", description: "Implemented AI-powered personalization algorithms" },
        { title: "Collaboration Tools", description: "Built real-time collaboration and communication features" },
        { title: "Final Presentation", description: "Presented to TechCrunch Disrupt judges and won first place" }
      ],
      features: [
        { title: "AI-Powered Personalization", description: "Intelligent content delivery system that adapts to individual learning styles" },
        { title: "Real-Time Collaboration", description: "Seamless collaboration tools for students and educators" },
        { title: "Advanced Analytics", description: "Comprehensive learning analytics and progress tracking" },
        { title: "Adaptive Learning Paths", description: "Dynamic curriculum adjustment based on student performance" }
      ],
      images: [
        "/photo/other/1.png",
        "/photo/other/2.png",
        "/photo/other/3.jpg"
      ]
    }
  ]
};

const ProjectDetail = () => {
  // A statically rendered project page with no backend connection
  return (
    <div style={{ 
      maxWidth: 1000, 
      margin: '2rem auto', 
      padding: 32, 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
      borderRadius: 15,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: 10 }}>{staticProject.title}</h1>
          <p style={{ fontSize: '1.2rem', color: '#34495e', marginBottom: 20 }}>{staticProject.long_description || staticProject.description}</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <span style={{ background: '#3498db', color: 'white', padding: '5px 15px', borderRadius: 20 }}>{staticProject.category}</span>
            <span style={{ background: '#2ecc71', color: 'white', padding: '5px 15px', borderRadius: 20 }}>Status: {staticProject.status}</span>
          </div>
        </div>
        
        <div style={{ 
          padding: 20, 
          background: 'rgba(255,255,255,0.8)', 
          borderRadius: 15,
          textAlign: 'center'
        }}>
          <img 
            src={staticProject.image_url} 
            alt={staticProject.title} 
            style={{ width: '100%', maxWidth: 250, borderRadius: 10, marginBottom: 15 }}
          />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <a href={staticProject.github_url} target="_blank" rel="noopener noreferrer" style={{
              background: '#333', color: 'white', padding: '8px 15px', borderRadius: 8, textDecoration: 'none'
            }}>
              GitHub
            </a>
            <a href={staticProject.demo_url} target="_blank" rel="noopener noreferrer" style={{
              background: '#1abc9c', color: 'white', padding: '8px 15px', borderRadius: 8, textDecoration: 'none'
            }}>
              Live Demo
            </a>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: 15,
        marginBottom: 30 
      }}>
        <div style={{ background: 'white', padding: 15, borderRadius: 10, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3498db' }}>{staticProject.stats.downloads}</div>
          <div>Downloads</div>
        </div>
        <div style={{ background: 'white', padding: 15, borderRadius: 10, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f1c40f' }}>{staticProject.stats.stars}</div>
          <div>Stars</div>
        </div>
        <div style={{ background: 'white', padding: 15, borderRadius: 10, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ecc71' }}>{staticProject.stats.contributors}</div>
          <div>Contributors</div>
        </div>
        <div style={{ background: 'white', padding: 15, borderRadius: 10, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9b59b6' }}>{staticProject.stats.uptime}%</div>
          <div>Uptime</div>
        </div>
      </div>
      
      {/* Features Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: '#2c3e50', marginBottom: 20, borderBottom: '2px solid #3498db', paddingBottom: 10 }}>Features</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 20 
        }}>
          {staticProject.features.map((feature, index) => (
            <div key={index} style={{ 
              background: 'white', 
              padding: 20, 
              borderRadius: 10,
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: 10 
              }}>
                <span style={{ 
                  background: '#3498db', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: 30, 
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 10
                }}>
                  ✓
                </span>
                <div style={{ fontWeight: 'bold' }}>{feature.split(':')[0]}</div>
              </div>
              <p style={{ margin: 0, color: '#7f8c8d' }}>{feature.split(':')[1] || ''}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Technologies Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: '#2c3e50', marginBottom: 20, borderBottom: '2px solid #3498db', paddingBottom: 10 }}>Technologies</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {staticProject.technologies.map((tech, index) => (
            <span key={index} style={{ 
              background: '#ecf0f1', 
              padding: '8px 15px', 
              borderRadius: 20,
              color: '#2c3e50',
              fontWeight: 500
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Featured Projects Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: '#2c3e50', marginBottom: 20, borderBottom: '2px solid #3498db', paddingBottom: 10 }}>Featured Projects</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: 20 
        }}>
          {staticProject.featuredProjects.map((project, index) => (
            <div key={index} style={{ 
              background: 'white', 
              borderRadius: 10,
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
            }}>
              <img 
                src={project.image_url} 
                alt={project.title} 
                style={{ width: '100%', height: 150, objectFit: 'cover' }} 
              />
              <div style={{ padding: 15 }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{project.title}</h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#7f8c8d', height: 60, overflow: 'hidden' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    background: '#3498db', 
                    color: 'white', 
                    padding: '3px 10px', 
                    borderRadius: 15,
                    fontSize: '0.8rem'
                  }}>
                    {project.category}
                  </span>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#333' }}>
                      <span role="img" aria-label="GitHub">📂</span>
                    </a>
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1abc9c' }}>
                      <span role="img" aria-label="Demo">🔗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Hackathons Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: '#2c3e50', marginBottom: 20, borderBottom: '2px solid #3498db', paddingBottom: 10 }}>Hackathons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
          {staticProject.hackathons.map((hackathon, index) => (
            <div key={index} style={{ 
              background: 'white', 
              borderRadius: 15,
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
            }}>
              {/* Header Section */}
              <div style={{
                display: 'flex',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              }}>
                <div style={{ 
                  flex: '0 0 35%',
                  background: `url(${hackathon.image_url})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center',
                  position: 'relative',
                  minHeight: 250
                }}>
                  <div style={{ 
                    position: 'absolute', 
                    top: 20, 
                    right: index % 2 === 0 ? 'auto' : 20, 
                    left: index % 2 === 0 ? 20 : 'auto',
                    background: '#e74c3c',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: 20,
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    {hackathon.result}
                  </div>
                  {hackathon.prize && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 20, 
                      right: index % 2 === 0 ? 'auto' : 20, 
                      left: index % 2 === 0 ? 20 : 'auto',
                      background: '#f39c12',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: 20,
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                      Prize: {hackathon.prize}
                    </div>
                  )}
                </div>
                <div style={{ flex: '1', padding: 25 }}>
                  <div style={{ marginBottom: 5, color: '#7f8c8d', fontSize: '0.9rem' }}>
                    {hackathon.date} • {hackathon.location}
                  </div>
                  <h3 style={{ color: '#2c3e50', margin: '0 0 10px 0', fontSize: '1.8rem' }}>
                    {hackathon.name}
                  </h3>
                  <p style={{ color: '#34495e', margin: '0 0 15px 0', lineHeight: 1.6 }}>
                    {hackathon.description}
                  </p>
                  
                  {/* Challenge & Solution */}
                  <div style={{ marginBottom: 15 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 5, color: '#e74c3c' }}>Challenge:</div>
                    <p style={{ margin: 0, color: '#7f8c8d' }}>{hackathon.challenge}</p>
                  </div>
                  <div style={{ marginBottom: 15 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 5, color: '#2ecc71' }}>Solution:</div>
                    <p style={{ margin: 0, color: '#7f8c8d' }}>{hackathon.solution}</p>
                  </div>
                  
                  {/* Technologies Used */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 15 }}>
                    {hackathon.technologies.map((tech, techIndex) => (
                      <span key={techIndex} style={{ 
                        background: '#ecf0f1', 
                        padding: '3px 10px', 
                        borderRadius: 15,
                        color: '#2c3e50',
                        fontSize: '0.8rem'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Team and View Details */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                      Team Size: {hackathon.team_size} • Organizer: {hackathon.organizer}
                    </span>
                    <a href={hackathon.link} target="_blank" rel="noopener noreferrer" style={{
                      background: '#3498db', color: 'white', padding: '5px 15px', borderRadius: 8, 
                      textDecoration: 'none', fontSize: '0.9rem'
                    }}>
                      View Details
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Additional Content Section - Highlights, Features or Timeline */}
              {(hackathon.highlights || hackathon.features || hackathon.timeline) && (
                <div style={{ padding: '0 25px 25px 25px' }}>
                  {/* Highlights */}
                  {hackathon.highlights && (
                    <div style={{ marginTop: 20 }}>
                      <h4 style={{ color: '#2c3e50', borderBottom: '1px solid #ecf0f1', paddingBottom: 5 }}>Highlights</h4>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: 15,
                        marginTop: 10
                      }}>
                        {hackathon.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} style={{ 
                            background: '#f8f9fa', 
                            padding: 15, 
                            borderRadius: 10,
                            border: '1px solid #e9ecef'
                          }}>
                            <div style={{ fontWeight: 'bold', marginBottom: 5, color: '#3498db' }}>{highlight.title}</div>
                            <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>{highlight.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Features */}
                  {hackathon.features && (
                    <div style={{ marginTop: 20 }}>
                      <h4 style={{ color: '#2c3e50', borderBottom: '1px solid #ecf0f1', paddingBottom: 5 }}>Key Features</h4>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: 15,
                        marginTop: 10
                      }}>
                        {hackathon.features.map((feature, fIndex) => (
                          <div key={fIndex} style={{ 
                            background: '#f8f9fa', 
                            padding: 15, 
                            borderRadius: 10,
                            border: '1px solid #e9ecef'
                          }}>
                            <div style={{ fontWeight: 'bold', marginBottom: 5, color: '#2ecc71' }}>{feature.title}</div>
                            <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>{feature.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Timeline */}
                  {hackathon.timeline && (
                    <div style={{ marginTop: 20 }}>
                      <h4 style={{ color: '#2c3e50', borderBottom: '1px solid #ecf0f1', paddingBottom: 5 }}>Project Timeline</h4>
                      <div style={{ 
                        marginTop: 10,
                        paddingLeft: 20
                      }}>
                        {hackathon.timeline.map((item, tIndex) => (
                          <div key={tIndex} style={{ 
                            position: 'relative',
                            paddingLeft: 25,
                            paddingBottom: 15,
                            borderLeft: '2px solid #e0e0e0'
                          }}>
                            <div style={{ 
                              position: 'absolute',
                              left: -10,
                              top: 0,
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              background: '#3498db',
                              border: '3px solid white'
                            }}></div>
                            <div style={{ fontWeight: 'bold', color: '#34495e' }}>{item.title}</div>
                            <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>{item.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Images Gallery */}
                  {hackathon.images && hackathon.images.length > 0 && (
                    <div style={{ marginTop: 20 }}>
                      <h4 style={{ color: '#2c3e50', borderBottom: '1px solid #ecf0f1', paddingBottom: 5 }}>Gallery</h4>
                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: 10,
                        marginTop: 10
                      }}>
                        {hackathon.images.map((image, imgIndex) => (
                          <img 
                            key={imgIndex} 
                            src={image} 
                            alt={`${hackathon.name} ${imgIndex + 1}`} 
                            style={{
                              width: '100%',
                              height: 150,
                              objectFit: 'cover',
                              borderRadius: 8
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Screenshots Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: '#2c3e50', marginBottom: 20, borderBottom: '2px solid #3498db', paddingBottom: 10 }}>Screenshots</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: 15 
        }}>
          {staticProject.screenshots.slice(0, 3).map((screenshot, index) => (
            <img 
              key={index}
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
              style={{ width: '100%', borderRadius: 10, height: 200, objectFit: 'cover' }}
            />
          ))}
        </div>
      </div>
      
      {/* Team Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: '#2c3e50', marginBottom: 20, borderBottom: '2px solid #3498db', paddingBottom: 10 }}>Team</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: 20 
        }}>
          {staticProject.team.map((member, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              padding: 15, 
              background: 'white',
              borderRadius: 10,
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: 10 
              }}>
                {member.avatar}
              </div>
              <div style={{ fontWeight: 'bold' }}>{member.name}</div>
              <div style={{ color: '#7f8c8d' }}>{member.role}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Timeline Section */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ color: '#2c3e50', marginBottom: 20, borderBottom: '2px solid #3498db', paddingBottom: 10 }}>Development Timeline</h2>
        <div style={{ padding: '0 20px' }}>
          {staticProject.timeline.map((phase, index) => (
            <div key={index} style={{ 
              display: 'flex',
              marginBottom: 15,
              position: 'relative'
            }}>
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: phase.status === 'completed' ? '#2ecc71' : '#3498db',
                marginRight: 15,
                marginTop: 5,
                position: 'relative',
                zIndex: 2
              }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{phase.phase}</div>
                <div style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>{phase.date}</div>
              </div>
              <div style={{ 
                width: 3, 
                background: '#e0e0e0', 
                position: 'absolute',
                top: 0,
                bottom: -15,
                left: 10,
                zIndex: 1
              }}></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Challenges Section */}
      <div>
        <h2 style={{ color: '#2c3e50', marginBottom: 20, borderBottom: '2px solid #3498db', paddingBottom: 10 }}>Challenges & Solutions</h2>
        {staticProject.challenges.map((challenge, index) => (
          <div key={index} style={{ 
            background: 'white', 
            padding: 20, 
            borderRadius: 10,
            marginBottom: 15
          }}>
            <h3 style={{ color: '#e74c3c', marginTop: 0 }}>{challenge.title}</h3>
            <p style={{ fontWeight: 'bold' }}>Challenge:</p>
            <p>{challenge.description}</p>
            <p style={{ fontWeight: 'bold', color: '#2ecc71' }}>Solution:</p>
            <p>{challenge.solution}</p>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 50, textAlign: 'center', color: '#7f8c8d', fontStyle: 'italic' }}>
        Note: All data on this page is static/hardcoded - no backend connection is being used
      </div>
    </div>
  );
};

export default ProjectDetail;
