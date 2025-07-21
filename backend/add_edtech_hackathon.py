import sqlite3

# Connect to database
conn = sqlite3.connect('portfolio.db')
cursor = conn.cursor()

# Add EdTech Innovation Sprint hackathon
edtech_data = (
    11,  # ID 11
    "EdTech Innovation Sprint",
    "TechCrunch Disrupt 2024", 
    "March 2024",
    "1st Place",
    "Winner",
    "An innovative educational platform that revolutionizes online learning through AI-powered personalized content delivery and real-time collaboration tools. Built during TechCrunch Disrupt 2024, this project showcases the future of education technology with advanced AI integration and seamless user experience.",
    '["React", "Python", "AI/ML", "MongoDB", "Node.js", "TensorFlow"]',
    4,
    "48 hours",
    "₹25,000",
    "/photo/other/main.jpg"
)

# Insert EdTech hackathon
cursor.execute('''
INSERT INTO hackathons (id, title, organization, date, place, position, description, technologies, team_size, duration, prize_money, main_image)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', edtech_data)

# Add team members for EdTech (ID 11)
team_members_data = [
    (26, 11, "Sree Charan", "Full Stack Developer & Team Lead", 1),
    (27, 11, "Team Member 2", "AI/ML Engineer", 2),
    (28, 11, "Team Member 3", "Backend Developer", 3),
    (29, 11, "Team Member 4", "UI/UX Designer", 4)
]

cursor.executemany('''
INSERT INTO team_members (id, hackathon_id, name, role, member_order)
VALUES (?, ?, ?, ?, ?)
''', team_members_data)

# Add features for EdTech (ID 11)
features_data = [
    (24, 11, "AI-Powered Personalization", "Intelligent content delivery system that adapts to individual learning styles", 1),
    (25, 11, "Real-Time Collaboration", "Seamless collaboration tools for students and educators", 2),
    (26, 11, "Advanced Analytics", "Comprehensive learning analytics and progress tracking", 3),
    (27, 11, "Adaptive Learning Paths", "Dynamic curriculum adjustment based on student performance", 4)
]

cursor.executemany('''
INSERT INTO project_features (id, hackathon_id, feature_title, feature_description, feature_order)
VALUES (?, ?, ?, ?, ?)
''', features_data)

# Add timeline for EdTech (ID 11)
timeline_data = [
    (13, 11, "Platform Architecture Design", "Designed comprehensive educational platform architecture", 1),
    (14, 11, "AI Integration Development", "Implemented AI-powered personalization algorithms", 2),
    (15, 11, "Collaboration Tools", "Built real-time collaboration and communication features", 3),
    (16, 11, "Final Presentation", "Presented to TechCrunch Disrupt judges and won first place", 4)
]

cursor.executemany('''
INSERT INTO project_timeline (id, hackathon_id, phase_title, phase_description, phase_order)
VALUES (?, ?, ?, ?, ?)
''', timeline_data)

# Add recognition for EdTech (ID 11)
recognition_data = [
    (14, 11, "TechCrunch Disrupt Winner", "Won first place at prestigious TechCrunch Disrupt 2024", 1),
    (15, 11, "₹25,000 Prize Money", "Substantial cash prize for educational innovation", 2),
    (16, 11, "EdTech Innovation Award", "Recognized for revolutionary approach to online learning", 3),
    (17, 11, "Industry Recognition", "Featured by TechCrunch for innovative educational solutions", 4)
]

cursor.executemany('''
INSERT INTO recognition (id, hackathon_id, recognition_type, recognition_description, recognition_order)
VALUES (?, ?, ?, ?, ?)
''', recognition_data)

# Add gallery for EdTech (ID 11) - using other folder photos
gallery_data = [
    (32, 11, "/photo/other/1.png", "EdTech Innovation Sprint Team", 1),
    (33, 11, "/photo/other/2.png", "TechCrunch Disrupt 2024 Event", 2),
    (34, 11, "/photo/other/3.jpg", "Educational Platform Demo", 3)
]

cursor.executemany('''
INSERT INTO project_gallery (id, hackathon_id, image_url, alt_text, image_order)
VALUES (?, ?, ?, ?, ?)
''', gallery_data)

# Commit changes and close connection
conn.commit()
conn.close()

print("EdTech Innovation Sprint hackathon added successfully!")
