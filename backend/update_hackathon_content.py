import sqlite3
import json

# Connect to database
conn = sqlite3.connect('portfolio.db')
cursor = conn.cursor()

# Clear existing data
cursor.execute('DELETE FROM project_gallery')
cursor.execute('DELETE FROM team_members')
cursor.execute('DELETE FROM project_features')
cursor.execute('DELETE FROM project_timeline')
cursor.execute('DELETE FROM recognition')
cursor.execute('DELETE FROM hackathons')

# Insert updated hackathons with real content
hackathons_data = [
    # Web-a-Thon by OnDemand - Healthcare AI
    (1, "Web-a-Thon Healthcare AI Challenge", "OnDemand", "2024-11", "3rd Place", "Third Position", 
     "💥 We Won ₹50,000 and Secured 3rd Place in the Web-a-Thon by OnDemand! After 24 intense hours of problem-solving, we tackled real-world healthcare challenges by developing AI-driven agents, proving the potential of technology in revolutionizing health tech. It's more than just a prize—it's a testament to how innovation can drive change.", 
     '["AI/ML", "Healthcare Tech", "Python", "React"]', 4, "24 hours", "₹50,000", "/photo/other/main.jpg"),
    
    # Code Caravan 2.0 - CodingBlocks LPU
    (2, "Code Caravan 2.0", "CodingBlocks LPU", "2024-10", "1st Place", "Winner",
     "🚗💻 Exciting news! Team Binary 4 emerged victorious at the Code Carvan 2.0 hackathon, organized by CodingBlocks LPU! We won goodies including Code Help shirts and gained valuable knowledge, plus ₹10,000 prize money. Special thanks to Mr. Lakshay Kumar from Adobe and Love Babbar, Founder of Code Help.",
     '["JavaScript", "React", "Node.js", "MongoDB"]', 4, "24 hours", "₹10,000", "/photo/codingblockslpu/main.jpg"),
    
    # DevFest Jalandhar 2024 - Google Developer Groups
    (3, "DevFest Jalandhar 2024", "Google Developer Groups", "December 2024", "1st Place", "Winner", 
     "Won DevFest Jalandhar, a tech conference hosted by Google Developer Groups Jalandhar, bringing developers together to learn and innovate. Judges were so impressed that they awarded us monetary rewards and goodies, including exclusive event T-shirts. Connected with fellow developers and explored new ideas while using Google's tools in an event filled with learning, collaboration, and unforgettable memories!", 
     '["React", "Node.js", "AI/ML", "Google Cloud"]', 4, "48 hours", "₹15,000", "/photo/devfest/main.jpg"),
    
    # Smart Device Platform - LPU Binary Five
    (4, "Smart Device Platform Hackathon", "LPU University", "2024-09", "1st Place", "Winner",
     "🎉 Celebrating a 24-hour journey, we emerged as winners as Team Binary Five, securing the trophy and ₹10,000. Our smart device platform integrates AI bots, AI attendance using face recognition, and video conferencing. It simplifies tasks and enhances productivity, streamlining communication and collaboration for future-ready solutions.",
     '["AI/ML", "Face Recognition", "Video Conferencing", "React", "Python"]', 5, "24 hours", "₹10,000", "/photo/other/main.jpg"),
    
    # Arena Hackathon 2024
    (5, "Arena Hackathon 2024", "Arena Tech Challenge", "October 2024", "2nd Place", "Runner-up",
     "Arena Tech Challenge hackathon where we built innovative solutions and competed with talented developers from across the region. Focused on creating impactful technology solutions with modern development practices.",
     '["JavaScript", "React", "Node.js", "MongoDB"]', 4, "24 hours", "₹12,000", "/photo/arena/main.jpg"),
    
    # Code-a-Haunt Halloween Hackathon
    (6, "Code-a-Haunt Halloween Hackathon", "Code-a-Haunt 2024", "October 2024", "3rd Place", "Third Position",
     "Spooky themed hackathon where we created Halloween-inspired tech solutions with a creative twist. An incredible journey with amazing teammates showcasing innovation in a fun, themed environment.",
     '["Python", "Flask", "JavaScript", "CSS"]', 3, "48 hours", "₹8,000", "/photo/code-a-haunt/main.jpg"),
    
    # Code of Duty Gaming Hackathon
    (7, "Code of Duty Gaming Hackathon", "Gaming Community 2024", "September 2024", "1st Place", "Winner",
     "Gaming-focused hackathon where we developed innovative gaming solutions and interactive experiences. Built cutting-edge gaming applications with modern technologies and creative gameplay mechanics.",
     '["Unity", "C#", "JavaScript", "WebGL"]', 4, "72 hours", "₹20,000", "/photo/code-of-duty/main.jpg"),
    
    # Code Cubicle by Microsoft
    (8, "Code Cubicle by Microsoft", "Microsoft & Geek Room", "2024-08", "3rd Place", "3rd Runners-up",
     "Incredible journey to becoming 3rd runners-up at the Code Cubicle by Geek Room at Microsoft! Team 'The Losers' built our entire project in just 7 days! We dove deep into web scraping and mastered Streamlit, winning ₹5000 cash prize. The venue was incredible, and the experience was unforgettable!",
     '["Python", "Streamlit", "Web Scraping", "Data Science"]', 5, "7 days", "₹5,000", "/photo/microsoft/main.jpg"),
    
    # Adobe GenSolve Hackathon
    (9, "Adobe GenSolve Hackathon", "Adobe & GeeksforGeeks", "2024-07", "Top 5%", "Top 5 Percentile",
     "Thrilled to announce that our team placed in the top 5 percentile of the Adobe GenSolve Hackathon! This achievement showcases our technical excellence and innovative problem-solving skills in competitive environment with thousands of participants.",
     '["Adobe Creative Suite", "AI/ML", "Design Tech", "JavaScript"]', 4, "48 hours", "Recognition", "/photo/microsoft/main.jpg"),
    
    # Code Fusion Hackathon
    (10, "Code Fusion Hackathon", "Chandigarh University", "2024-06", "1st Place", "Winner",
     "🎉 Thrilled to announce: We Won First Place at Code Fusion Hackathon! We developed an innovative job portal with AI features including resume builder, personalized roadmap builder, and chatbot assistance. Our next-level UI offers seamless experience. Earned exclusive internship opportunity at LWT Academy, Singapore!",
     '["React", "AI/ML", "Full Stack", "UI/UX"]', 4, "36 hours", "Internship + Prize", "/photo/other/main.jpg")
]

# Insert hackathons
cursor.executemany('''
INSERT INTO hackathons (id, title, organization, date, place, position, description, technologies, team_size, duration, prize_money, main_image)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', hackathons_data)

# Insert team members data
team_members_data = [
    # Web-a-Thon Healthcare AI (ID 1)
    (1, 1, "Sree Charan", "Full Stack Developer", 1),
    (2, 1, "Rehan Mittal", "AI/ML Engineer", 2),
    (3, 1, "Aman Kumar", "Backend Developer", 3),
    (4, 1, "Amit Gupta", "Frontend Developer", 4),
    
    # Code Caravan 2.0 (ID 2)
    (5, 2, "Sree Charan", "Team Lead", 1),
    (6, 2, "Ritik Kumar", "Frontend Developer", 2),
    (7, 2, "Abhishek Roy", "Backend Developer", 3),
    (8, 2, "Shafe Ahsan", "UI/UX Designer", 4),
    
    # DevFest (ID 3)
    (9, 3, "Sree Charan", "Full Stack Developer", 1),
    (10, 3, "Amit Gupta", "Frontend Developer", 2),
    (11, 3, "Badal Kumar", "Backend Developer", 3),
    (12, 3, "Rehan Mittal", "UI/UX Designer", 4),
    
    # Smart Device Platform (ID 4)
    (13, 4, "Abhishek Kumar", "Team Lead", 1),
    (14, 4, "Hardik Arora", "AI Engineer", 2),
    (15, 4, "Sree Charan", "Full Stack Developer", 3),
    (16, 4, "Shubham Pandey", "Backend Developer", 4),
    (17, 4, "Sushil", "Frontend Developer", 5),
    
    # Code Cubicle Microsoft (ID 8)
    (18, 8, "Sree Charan", "Team Lead", 1),
    (19, 8, "Shivani Satapathy", "Data Scientist", 2),
    (20, 8, "Abhishek Kumar", "Backend Developer", 3),
    (21, 8, "Sushil Kumar Verma", "Frontend Developer", 4),
    
    # Code Fusion (ID 10)
    (22, 10, "Sree Charan", "Full Stack Developer", 1),
    (23, 10, "Team Member 2", "AI Engineer", 2),
    (24, 10, "Team Member 3", "Backend Developer", 3),
    (25, 10, "Team Member 4", "UI/UX Designer", 4)
]

cursor.executemany('''
INSERT INTO team_members (id, hackathon_id, name, role, member_order)
VALUES (?, ?, ?, ?, ?)
''', team_members_data)

# Insert project features
features_data = [
    # Web-a-Thon Healthcare AI (ID 1)
    (1, 1, "AI-Driven Healthcare Agents", "Developed intelligent agents to solve real-world healthcare challenges", 1),
    (2, 1, "Revolutionary Health Tech", "Proved the potential of technology in revolutionizing healthcare industry", 2),
    (3, 1, "24-Hour Innovation Sprint", "Completed intensive problem-solving session in just 24 hours", 3),
    (4, 1, "Industry Expert Guidance", "Received valuable feedback from Mr. Navnit Anand", 4),
    
    # Code Caravan 2.0 (ID 2)
    (5, 2, "Code Help Integration", "Built solutions aligned with Code Help's educational platform", 1),
    (6, 2, "Industry Mentorship", "Guidance from Adobe scientist Lakshay Kumar and Love Babbar", 2),
    (7, 2, "Educational Impact", "Created tools to enhance coding education and learning", 3),
    
    # DevFest (ID 3)
    (8, 3, "Google Tools Integration", "Built using Google's cutting-edge tools and technologies", 1),
    (9, 3, "Innovation Focus", "Explored new ideas while using Google's development ecosystem", 2),
    (10, 3, "Collaborative Development", "Connected with fellow developers in an inspiring environment", 3),
    (11, 3, "Event T-shirts & Goodies", "Received exclusive event merchandise and rewards", 4),
    
    # Smart Device Platform (ID 4)
    (12, 4, "AI-Powered Bots", "Streamlined communication and task management with intelligent bots", 1),
    (13, 4, "Face Recognition Attendance", "Revolutionary attendance tracking using AI face recognition", 2),
    (14, 4, "Video Conferencing Integration", "Seamless collaboration features for remote settings", 3),
    (15, 4, "Future-Ready Architecture", "Designed for further enhancements and integrations", 4),
    
    # Code Cubicle Microsoft (ID 8)
    (16, 8, "Web Scraping Mastery", "Advanced web scraping techniques for data collection", 1),
    (17, 8, "Streamlit Application", "Built comprehensive project using Streamlit framework", 2),
    (18, 8, "7-Day Development", "Complete project development in just one week", 3),
    (19, 8, "Microsoft Venue Experience", "Incredible venue and networking opportunities", 4),
    
    # Code Fusion (ID 10)
    (20, 10, "Dual Interface Portal", "Separate interfaces for recruiters and job seekers", 1),
    (21, 10, "AI Resume Builder", "Intelligent resume generation and optimization", 2),
    (22, 10, "Personalized Roadmaps", "Custom learning and career path recommendations", 3),
    (23, 10, "Next-Level UI/UX", "Seamless and engaging user experience design", 4)
]

cursor.executemany('''
INSERT INTO project_features (id, hackathon_id, feature_title, feature_description, feature_order)
VALUES (?, ?, ?, ?, ?)
''', features_data)

# Insert project timeline
timeline_data = [
    # Web-a-Thon (ID 1)
    (1, 1, "Problem Analysis", "Analyzed real-world healthcare challenges and identified key areas", 1),
    (2, 1, "AI Agent Development", "Built intelligent agents with healthcare-specific capabilities", 2),
    (3, 1, "Testing & Validation", "Validated solution effectiveness with industry standards", 3),
    (4, 1, "Final Presentation", "Presented to judges and secured 3rd place with ₹50,000", 4),
    
    # Code Caravan 2.0 (ID 2)
    (5, 2, "Ideation Phase", "Brainstormed educational technology solutions", 1),
    (6, 2, "Development Sprint", "24-hour intensive coding and development", 2),
    (7, 2, "Mentor Feedback", "Received guidance from industry experts", 3),
    (8, 2, "Victory Celebration", "Won first place and received Code Help merchandise", 4),
    
    # Smart Device Platform (ID 4)
    (9, 4, "Platform Architecture", "Designed comprehensive smart device integration system", 1),
    (10, 4, "AI Implementation", "Developed face recognition and bot functionalities", 2),
    (11, 4, "Video Integration", "Added seamless conferencing capabilities", 3),
    (12, 4, "Final Demo", "Showcased complete platform and won first place", 4)
]

cursor.executemany('''
INSERT INTO project_timeline (id, hackathon_id, phase_title, phase_description, phase_order)
VALUES (?, ?, ?, ?, ?)
''', timeline_data)

# Insert recognition data
recognition_data = [
    # Web-a-Thon (ID 1)
    (1, 1, "3rd Place Winner", "Secured 3rd position in competitive healthcare AI challenge", 1),
    (2, 1, "₹50,000 Prize Money", "Won substantial cash prize for innovative healthcare solution", 2),
    (3, 1, "Industry Recognition", "Recognized by healthcare and tech industry experts", 3),
    (4, 1, "YouTube Feature", "Project featured in official YouTube documentation", 4),
    
    # Code Caravan 2.0 (ID 2)
    (5, 2, "First Place Champion", "Emerged victorious in CodingBlocks LPU hackathon", 1),
    (6, 2, "Code Help Merchandise", "Received exclusive Code Help shirts and goodies", 2),
    (7, 2, "₹10,000 Prize", "Won cash prize for educational technology innovation", 3),
    
    # Smart Device Platform (ID 4)
    (8, 4, "Innovation Award", "Recognized for advanced AI integration and platform design", 1),
    (9, 4, "₹10,000 Winner Prize", "Cash prize for comprehensive smart device solution", 2),
    (10, 4, "Future Tech Recognition", "Acknowledged for future-ready architecture", 3),
    
    # Code Fusion (ID 10)
    (11, 10, "First Place Victory", "Won top position in Chandigarh University hackathon", 1),
    (12, 10, "Singapore Internship", "Earned exclusive internship opportunity at LWT Academy", 2),
    (13, 10, "UI/UX Excellence", "Recognized for next-level user interface design", 3)
]

cursor.executemany('''
INSERT INTO recognition (id, hackathon_id, recognition_type, recognition_description, recognition_order)
VALUES (?, ?, ?, ?, ?)
''', recognition_data)

# Insert gallery data with proper image paths
gallery_data = [
    # Web-a-Thon (ID 1)
    (1, 1, "/photo/other/1.png", "Healthcare AI Challenge Team", 1),
    (2, 1, "/photo/other/2.png", "OnDemand Web-a-Thon Event", 2),
    (3, 1, "/photo/other/3.jpg", "Third Place Achievement", 3),
    
    # Code Caravan 2.0 (ID 2)
    (4, 2, "/photo/codingblockslpu/1.jpg", "CodingBlocks LPU Hackathon", 1),
    (5, 2, "/photo/codingblockslpu/2.jpg", "Team Binary 4 Victory", 2),
    (6, 2, "/photo/codingblockslpu/3.jpg", "Code Help Celebration", 3),
    
    # DevFest (ID 3)
    (7, 3, "/photo/devfest/1.jpg", "DevFest Jalandhar Team Photo", 1),
    (8, 3, "/photo/devfest/2.jpg", "Google Developer Groups Event", 2),
    (9, 3, "/photo/devfest/3.jpg", "DevFest Awards Ceremony", 3),
    (10, 3, "/photo/devfest/4.jpg", "DevFest Coding Session", 4),
    (11, 3, "/photo/devfest/5.jpg", "DevFest Innovation Showcase", 5),
    
    # Smart Device Platform (ID 4)
    (12, 4, "/photo/other/1.png", "Team Binary Five Group", 1),
    (13, 4, "/photo/other/2.png", "Smart Device Demo", 2),
    
    # Arena (ID 5)
    (14, 5, "/photo/arena/1.jpg", "Arena Hackathon Opening", 1),
    (15, 5, "/photo/arena/2.jpg", "Arena Team Collaboration", 2),
    (16, 5, "/photo/arena/3.jpg", "Arena Final Presentation", 3),
    
    # Code-a-Haunt (ID 6)
    (17, 6, "/photo/code-a-haunt/main.jpg", "Halloween Themed Hackathon", 1),
    
    # Code of Duty (ID 7)
    (18, 7, "/photo/code-of-duty/1.jpg", "Gaming Hackathon Kickoff", 1),
    (19, 7, "/photo/code-of-duty/2.jpg", "Game Development Session", 2),
    (20, 7, "/photo/code-of-duty/3.jpg", "Code of Duty Team Building", 3),
    (21, 7, "/photo/code-of-duty/4.jpg", "Gaming Solution Demo", 4),
    (22, 7, "/photo/code-of-duty/5.jpg", "Winners Celebration", 5),
    
    # Microsoft Code Cubicle (ID 8)
    (23, 8, "/photo/microsoft/1.jpg", "Microsoft Code Cubicle Event", 1),
    (24, 8, "/photo/microsoft/2.jpg", "Team 'The Losers' at Microsoft", 2),
    (25, 8, "/photo/microsoft/3.jpg", "Streamlit Project Demo", 3),
    (26, 8, "/photo/microsoft/4.jpg", "Microsoft Venue Experience", 4),
    (27, 8, "/photo/microsoft/5.jpg", "3rd Place Achievement", 5),
    
    # Adobe GenSolve (ID 9)
    (28, 9, "/photo/microsoft/6.jpg", "Adobe GenSolve Challenge", 1),
    (29, 9, "/photo/microsoft/7.jpg", "Top 5% Achievement", 2),
    
    # Code Fusion (ID 10)
    (30, 10, "/photo/other/1.png", "Code Fusion Victory", 1),
    (31, 10, "/photo/other/2.png", "Chandigarh University Event", 2)
]

cursor.executemany('''
INSERT INTO project_gallery (id, hackathon_id, image_url, alt_text, image_order)
VALUES (?, ?, ?, ?, ?)
''', gallery_data)

# Commit changes and close connection
conn.commit()
conn.close()

print("Database updated successfully with real hackathon content!")
