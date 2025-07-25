// Detailed project data with all information for project detail pages
export const projectsDetailData = {
  1: {
    id: 1,
    title: "Study Buddy - AI Learning Assistant",
    description: "An advanced AI-powered learning assistant that helps students master complex topics through personalized guidance, interactive exercises, and intelligent feedback.",
    longDescription: "Study Buddy is a comprehensive AI-powered educational platform that adapts to individual learning styles, identifies knowledge gaps, and provides customized learning paths to maximize educational outcomes. The platform uses advanced machine learning algorithms to create personalized study plans and provide real-time feedback.",
    image: "/projectfolder/study-buddy/dashboard.png",
    category: "AI/ML",
    status: "Featured",
    github: "https://github.com/SreeCharan1234/study-buddy",
    demo: "https://study-buddy-demo.vercel.app",
    members: 4,
    duration: "3 months",
    startDate: "January 2024",
    endDate: "March 2024",
    technologies: ["React.js", "Python", "TensorFlow", "OpenAI API", "MongoDB", "LangChain", "NLP"],
    teamMembers: [
      { name: "K Sree Charan", role: "Full Stack Developer & Project Lead", avatar: "/images/team/sree.jpg" },
      { name: "Rajesh Kumar", role: "AI/ML Engineer", avatar: "/images/team/rajesh.jpg" },
      { name: "Priya Sharma", role: "Frontend Developer", avatar: "/images/team/priya.jpg" },
      { name: "Amit Singh", role: "Backend Developer", avatar: "/images/team/amit.jpg" }
    ],
    features: [
      "AI Roadmap Generator: Creates personalized learning paths based on goals",
      "Smart Code Editor: Interactive coding environment with real-time AI assistance",
      "AI Proctored Testing: Fair assessment with advanced monitoring",
      "Profile Dashboard: Track progress and achievements",
      "1vs1 Comparison: Compare performance with peers",
      "LinkedIn Analyzer: Get career insights and recommendations"
    ],
    gallery: [
      { url: "/projectfolder/study-buddy/dashboard.png", title: "Main Dashboard", description: "AI-powered learning dashboard with personalized roadmap" },
      { url: "/projectfolder/study-buddy/codeeditor.png", title: "Code Editor", description: "Smart code editor with real-time AI assistance" },
      { url: "/projectfolder/study-buddy/roadmap.png", title: "AI Roadmap", description: "Personalized learning roadmap generation" },
      { url: "/projectfolder/study-buddy/signup.png", title: "User Registration", description: "Clean and intuitive signup process" },
      { url: "/projectfolder/study-buddy/testyourself1.png", title: "Testing Interface", description: "AI proctored testing environment" },
      { url: "/projectfolder/study-buddy/leetcode.png", title: "LeetCode Integration", description: "Integrated coding challenges" },
      { url: "/projectfolder/study-buddy/1vs1 1.png", title: "Peer Comparison", description: "1vs1 performance comparison feature" },
      { url: "/projectfolder/study-buddy/linkedin.htm", title: "LinkedIn Integration", description: "Career insights and recommendations" }
    ],
    challenges: [
      "Implementing real-time AI feedback system",
      "Creating personalized learning algorithms",
      "Integrating multiple APIs seamlessly"
    ],
    solutions: [
      "Used TensorFlow for ML model training",
      "Implemented OpenAI API for intelligent responses",
      "Created modular architecture for scalability"
    ]
  },
  
  2: {
    id: 2,
    title: "Health Buddy - AI Healthcare Assistant",
    description: "AI-powered healthcare assistant for personalized wellness monitoring and medical advice. Uses machine learning for health insights and symptoms analysis.",
    longDescription: "Health Buddy is a comprehensive healthcare platform that leverages AI to provide personalized wellness monitoring, symptom analysis, and medical recommendations. The platform helps users track their health metrics and provides intelligent insights for better healthcare management.",
    image: "/projectfolder/health-buddy/dashbord.png",
    category: "Healthcare",
    status: "Featured",
    github: "https://github.com/SreeCharan1234/health-buddy",
    demo: "https://health-buddy-app.vercel.app",
    members: 3,
    duration: "4 months",
    startDate: "February 2024",
    endDate: "May 2024",
    technologies: ["React Native", "TensorFlow", "AWS", "Firebase", "Python", "Computer Vision"],
    teamMembers: [
      { name: "K Sree Charan", role: "Full Stack Developer & Project Lead", avatar: "/images/team/sree.jpg" },
      { name: "Dr. Sneha Patel", role: "Healthcare Consultant", avatar: "/images/team/sneha.jpg" },
      { name: "Vikram Reddy", role: "Mobile App Developer", avatar: "/images/team/vikram.jpg" }
    ],
    features: [
      "Symptom Analysis: AI-powered symptom checker and recommendations",
      "Health Monitoring: Track vital signs and health metrics",
      "Medication Reminders: Smart alerts for medicine schedules",
      "Doctor Consultation: Connect with healthcare professionals",
      "Health Records: Digital storage of medical history",
      "Emergency Services: Quick access to nearby hospitals"
    ],
    gallery: [
      { url: "/projectfolder/health-buddy/dashbord.png", title: "Dashboard", description: "Health monitoring dashboard" },
      { url: "/projectfolder/health-buddy/login.png", title: "Login Screen", description: "Secure user authentication" },
      { url: "/projectfolder/health-buddy/heartdiseasePrediction.jpg", title: "Heart Disease Prediction", description: "AI-powered heart disease risk assessment" },
      { url: "/projectfolder/health-buddy/nearbyhospitals.png", title: "Nearby Hospitals", description: "Find nearest healthcare facilities" },
      { url: "/projectfolder/health-buddy/nearbychemit.png", title: "Nearby Pharmacies", description: "Locate nearby pharmacies" },
      { url: "/projectfolder/health-buddy/nearbymedicines.png", title: "Medicine Finder", description: "Search and locate medicines" },
      { url: "/projectfolder/health-buddy/1.jpg", title: "User Interface", description: "Clean and intuitive user interface" },
      { url: "/projectfolder/health-buddy/2.jpg", title: "Health Tracking", description: "Comprehensive health tracking features" },
      { url: "/projectfolder/health-buddy/3.jpg", title: "Symptom Checker", description: "AI-powered symptom analysis" },
      { url: "/projectfolder/health-buddy/4.jpg", title: "Medical Records", description: "Digital health records management" }
    ],
    challenges: [
      "Ensuring medical data accuracy",
      "HIPAA compliance implementation",
      "Real-time health monitoring"
    ],
    solutions: [
      "Collaborated with medical professionals",
      "Implemented secure data encryption",
      "Used IoT sensors for real-time monitoring"
    ]
  },

  3: {
    id: 3,
    title: "AgriVision - Smart Farming Solution",
    description: "Smart farming solution with crop monitoring, prediction analytics, and resource management. Helps farmers optimize yields through IoT and ML.",
    longDescription: "AgriVision is an innovative smart farming platform that combines IoT sensors, machine learning, and data analytics to help farmers optimize their crop yields, manage resources efficiently, and make data-driven decisions for sustainable agriculture.",
    image: "/projectfolder/agrivision/landingpage.png",
    category: "AgriTech",
    status: "Featured",
    github: "https://github.com/SreeCharan1234/agrivision",
    demo: "https://agri-vision-demo.vercel.app",
    members: 4,
    duration: "5 months",
    startDate: "March 2024",
    endDate: "July 2024",
    technologies: ["IoT", "Machine Learning", "React", "Node.js", "Python", "Sensor Integration"],
    teamMembers: [
      { name: "K Sree Charan", role: "Full Stack Developer & Project Lead", avatar: "/images/team/sree.jpg" },
      { name: "Ramesh Patil", role: "IoT Engineer", avatar: "/images/team/ramesh.jpg" },
      { name: "Kavya Krishnan", role: "Data Scientist", avatar: "/images/team/kavya.jpg" },
      { name: "Suresh Kumar", role: "Agricultural Expert", avatar: "/images/team/suresh.jpg" }
    ],
    features: [
      "Crop Monitoring: Real-time monitoring of crop health using IoT sensors",
      "Weather Prediction: AI-powered weather forecasting for farming decisions",
      "Resource Management: Optimize water and fertilizer usage",
      "Yield Prediction: Predict crop yields based on historical and real-time data",
      "Market Price Analysis: Get real-time market prices for crops",
      "Pest Detection: AI-powered pest and disease detection"
    ],
    gallery: [
      { url: "/projectfolder/agrivision/landingpage.png", title: "Landing Page", description: "AgriVision platform overview" },
      { url: "/projectfolder/agrivision/cropdetails.png", title: "Crop Details", description: "Detailed crop information and analytics" },
      { url: "/projectfolder/agrivision/ecosystem.png", title: "Ecosystem View", description: "Complete agricultural ecosystem monitoring" },
      { url: "/projectfolder/agrivision/plantai.png", title: "Plant AI", description: "AI-powered plant health analysis" },
      { url: "/projectfolder/agrivision/plantfind.png", title: "Plant Finder", description: "Crop identification and recommendations" },
      { url: "/projectfolder/agrivision/plantgrpth.png", title: "Growth Tracking", description: "Plant growth monitoring system" },
      { url: "/projectfolder/agrivision/seasibak cropPlanner.png", title: "Crop Planner", description: "Seasonal crop planning tool" },
      { url: "/projectfolder/agrivision/voicetotext.png", title: "Voice Commands", description: "Voice-to-text interface for farmers" },
      { url: "/projectfolder/agrivision/apiofondemand.png", title: "API Integration", description: "On-demand API services" }
    ],
    challenges: [
      "IoT sensor integration in rural areas",
      "Weather data accuracy",
      "Farmer adoption and training"
    ],
    solutions: [
      "Developed low-power IoT solutions",
      "Integrated multiple weather APIs",
      "Created multilingual interface"
    ]
  },

  4: {
    id: 4,
    title: "Sarthi - Digital Assistant Platform",
    description: "Comprehensive digital assistant platform providing various services and utilities to enhance daily productivity and workflow management.",
    longDescription: "Sarthi is a versatile digital assistant platform designed to streamline daily tasks, enhance productivity, and provide various utility services. The platform integrates multiple services including payment processing, task management, and workflow automation.",
    image: "/projectfolder/sarthi/home.png",
    category: "Productivity",
    status: "Completed",
    github: "https://github.com/SreeCharan1234/sarthi",
    demo: "https://sarthi-platform.vercel.app",
    members: 3,
    duration: "2 months",
    startDate: "April 2024",
    endDate: "May 2024",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Payment Gateway"],
    teamMembers: [
      { name: "K Sree Charan", role: "Full Stack Developer & Project Lead", avatar: "/images/team/sree.jpg" },
      { name: "Anitha Reddy", role: "UI/UX Designer", avatar: "/images/team/anitha.jpg" },
      { name: "Kiran Kumar", role: "Backend Developer", avatar: "/images/team/kiran.jpg" }
    ],
    features: [
      "Task Management: Organize and track daily tasks efficiently",
      "Payment Integration: Secure payment processing system",
      "Workflow Automation: Automate repetitive tasks",
      "User Feedback System: Collect and manage user feedback",
      "Multi-service Integration: Access multiple services from one platform",
      "Real-time Notifications: Get instant updates and reminders"
    ],
    gallery: [
      { url: "/projectfolder/sarthi/home.png", title: "Home Page", description: "Clean and intuitive home interface" },
      { url: "/projectfolder/sarthi/aboutus.png", title: "About Us", description: "Platform information and team details" },
      { url: "/projectfolder/sarthi/work.png", title: "Work Dashboard", description: "Task management and workflow interface" },
      { url: "/projectfolder/sarthi/feedback.png", title: "Feedback System", description: "User feedback collection interface" },
      { url: "/projectfolder/sarthi/paymentgateway.png", title: "Payment Gateway", description: "Secure payment processing system" },
      { url: "/projectfolder/sarthi/razor pay.png", title: "Razorpay Integration", description: "Integrated payment solutions" },
      { url: "/projectfolder/sarthi/pikle.png", title: "Service Integration", description: "Multiple service integrations" }
    ],
    challenges: [
      "Payment gateway integration",
      "User experience optimization",
      "Service synchronization"
    ],
    solutions: [
      "Implemented Razorpay for secure payments",
      "Conducted extensive UX testing",
      "Created unified API layer"
    ]
  },

  5: {
    id: 5,
    title: "Surasksha Suchak - Security Solution",
    description: "Advanced security monitoring and management system designed to provide comprehensive protection and real-time threat detection.",
    longDescription: "Surasksha Suchak is a comprehensive security solution that provides real-time monitoring, threat detection, and security management. The platform uses AI and computer vision to enhance security measures and provide intelligent security insights.",
    image: "/projectfolder/surasksha-suchak/1.jpg",
    category: "Security",
    status: "Completed",
    github: "https://github.com/SreeCharan1234/surasksha-suchak",
    demo: "https://surasksha-demo.vercel.app",
    members: 2,
    duration: "3 months",
    startDate: "May 2024",
    endDate: "July 2024",
    technologies: ["Python", "Computer Vision", "Flask", "AI/ML", "Security"],
    teamMembers: [
      { name: "K Sree Charan", role: "Full Stack Developer & Project Lead", avatar: "/images/team/sree.jpg" },
      { name: "Rohit Sharma", role: "Security Expert & AI Engineer", avatar: "/images/team/rohit.jpg" }
    ],
    features: [
      "Real-time Monitoring: 24/7 security surveillance system",
      "Threat Detection: AI-powered threat identification",
      "Face Recognition: Advanced facial recognition system",
      "Intrusion Detection: Automated intrusion alert system",
      "Security Analytics: Comprehensive security data analysis",
      "Emergency Response: Quick emergency response system"
    ],
    gallery: [
      { url: "/projectfolder/surasksha-suchak/1.jpg", title: "Security Dashboard", description: "Main security monitoring dashboard" },
      { url: "/projectfolder/surasksha-suchak/2.jpg", title: "Threat Detection", description: "AI-powered threat detection interface" },
      { url: "/projectfolder/surasksha-suchak/3.jpg", title: "Face Recognition", description: "Advanced facial recognition system" },
      { url: "/projectfolder/surasksha-suchak/4.jpg", title: "Security Analytics", description: "Comprehensive security analytics" },
      { url: "/projectfolder/surasksha-suchak/5.jpg", title: "Monitoring System", description: "Real-time monitoring interface" },
      { url: "/projectfolder/surasksha-suchak/6.jpg", title: "Alert System", description: "Security alert management" },
      { url: "/projectfolder/surasksha-suchak/7.jpg", title: "Access Control", description: "Security access control system" },
      { url: "/projectfolder/surasksha-suchak/8.jpg", title: "Emergency Response", description: "Emergency response coordination" }
    ],
    challenges: [
      "Real-time processing requirements",
      "Accuracy in threat detection",
      "Privacy and data security"
    ],
    solutions: [
      "Optimized algorithms for real-time processing",
      "Implemented machine learning models",
      "Added end-to-end encryption"
    ]
  },

  6: {
    id: 6,
    title: "Code Off Duty - Gaming Platform",
    description: "Interactive gaming platform with multiple games, challenges, and competitive features for developers and gaming enthusiasts.",
    longDescription: "Code Off Duty is an innovative gaming platform designed specifically for developers and coding enthusiasts. It combines entertainment with skill development, offering coding challenges, multiplayer games, and competitive programming environments.",
    image: "/projectfolder/code-off-duty/1.png",
    category: "Gaming",
    status: "Completed",
    github: "https://github.com/SreeCharan1234/code-off-duty",
    demo: "https://code-off-duty.vercel.app",
    members: 4,
    duration: "4 months",
    startDate: "June 2024",
    endDate: "September 2024",
    technologies: ["Unity", "C#", "JavaScript", "WebGL", "Game Development"],
    teamMembers: [
      { name: "K Sree Charan", role: "Full Stack Developer & Project Lead", avatar: "/images/team/sree.jpg" },
      { name: "Arjun Patel", role: "Game Developer", avatar: "/images/team/arjun.jpg" },
      { name: "Neha Gupta", role: "UI/UX Designer", avatar: "/images/team/neha.jpg" },
      { name: "Varun Singh", role: "Frontend Developer", avatar: "/images/team/varun.jpg" }
    ],
    features: [
      "Coding Challenges: Interactive programming puzzles and challenges",
      "Multiplayer Games: Real-time multiplayer gaming experience",
      "Leaderboards: Competitive ranking system",
      "Achievement System: Unlock badges and achievements",
      "Community Features: Connect with other developers",
      "Learning Modules: Gamified learning experiences"
    ],
    gallery: [
      { url: "/projectfolder/code-off-duty/1.png", title: "Main Interface", description: "Gaming platform main interface" },
      { url: "/projectfolder/code-off-duty/2.png", title: "Game Selection", description: "Multiple game options and challenges" },
      { url: "/projectfolder/code-off-duty/3.png", title: "Coding Challenge", description: "Interactive coding challenge interface" },
      { url: "/projectfolder/code-off-duty/4.png", title: "Multiplayer Mode", description: "Real-time multiplayer gaming" },
      { url: "/projectfolder/code-off-duty/5.png", title: "Leaderboard", description: "Competitive ranking system" },
      { url: "/projectfolder/code-off-duty/6.png", title: "Achievement System", description: "Badges and achievement tracking" },
      { url: "/projectfolder/code-off-duty/7.png", title: "User Profile", description: "Comprehensive user profile system" },
      { url: "/projectfolder/code-off-duty/8.png", title: "Game Analytics", description: "Performance analytics and insights" },
      { url: "/projectfolder/code-off-duty/9.png", title: "Community Hub", description: "Developer community features" },
      { url: "/projectfolder/code-off-duty/10.png", title: "Learning Module", description: "Gamified learning experience" },
      { url: "/projectfolder/code-off-duty/11.png", title: "Tournament Mode", description: "Competitive tournament system" },
      { url: "/projectfolder/code-off-duty/12.png", title: "Settings Panel", description: "Game configuration and settings" },
      { url: "/projectfolder/code-off-duty/13.png", title: "Help Center", description: "User support and documentation" },
      { url: "/projectfolder/code-off-duty/14.png", title: "Notification System", description: "Real-time notifications" },
      { url: "/projectfolder/code-off-duty/15.png", title: "Game Store", description: "In-game purchases and rewards" }
    ],
    challenges: [
      "Real-time multiplayer synchronization",
      "Game performance optimization",
      "Cross-platform compatibility"
    ],
    solutions: [
      "Implemented WebSocket for real-time communication",
      "Optimized game assets and code",
      "Used WebGL for cross-platform support"
    ]
  }
};

export default projectsDetailData;
