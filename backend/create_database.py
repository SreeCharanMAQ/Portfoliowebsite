import sqlite3
import json

# Connect to database
conn = sqlite3.connect('portfolio.db')
cursor = conn.cursor()

# Drop existing tables if they exist
cursor.execute('DROP TABLE IF EXISTS project_gallery')
cursor.execute('DROP TABLE IF EXISTS team_members')
cursor.execute('DROP TABLE IF EXISTS project_features')
cursor.execute('DROP TABLE IF EXISTS project_timeline')
cursor.execute('DROP TABLE IF EXISTS recognition')
cursor.execute('DROP TABLE IF EXISTS hackathons')
cursor.execute('DROP TABLE IF EXISTS work_experience')
cursor.execute('DROP TABLE IF EXISTS education')
cursor.execute('DROP TABLE IF EXISTS skills')

# Create hackathons table
cursor.execute('''
CREATE TABLE hackathons (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT,
    date TEXT,
    place TEXT,
    position TEXT,
    description TEXT,
    technologies TEXT,
    team_size INTEGER,
    duration TEXT,
    prize_money TEXT,
    main_image TEXT
)
''')

# Create project_gallery table
cursor.execute('''
CREATE TABLE project_gallery (
    id INTEGER PRIMARY KEY,
    hackathon_id INTEGER,
    image_url TEXT,
    alt_text TEXT,
    image_order INTEGER,
    FOREIGN KEY (hackathon_id) REFERENCES hackathons (id)
)
''')

# Create team_members table
cursor.execute('''
CREATE TABLE team_members (
    id INTEGER PRIMARY KEY,
    hackathon_id INTEGER,
    name TEXT,
    role TEXT,
    member_order INTEGER,
    FOREIGN KEY (hackathon_id) REFERENCES hackathons (id)
)
''')

# Create project_features table
cursor.execute('''
CREATE TABLE project_features (
    id INTEGER PRIMARY KEY,
    hackathon_id INTEGER,
    feature_title TEXT,
    feature_description TEXT,
    feature_order INTEGER,
    FOREIGN KEY (hackathon_id) REFERENCES hackathons (id)
)
''')

# Create project_timeline table
cursor.execute('''
CREATE TABLE project_timeline (
    id INTEGER PRIMARY KEY,
    hackathon_id INTEGER,
    phase_title TEXT,
    phase_description TEXT,
    phase_order INTEGER,
    FOREIGN KEY (hackathon_id) REFERENCES hackathons (id)
)
''')

# Create recognition table
cursor.execute('''
CREATE TABLE recognition (
    id INTEGER PRIMARY KEY,
    hackathon_id INTEGER,
    recognition_type TEXT,
    recognition_description TEXT,
    recognition_order INTEGER,
    FOREIGN KEY (hackathon_id) REFERENCES hackathons (id)
)
''')

# Insert hackathons
hackathons_data = [
    (1, "DevFest Jalandhar 2024", "Google Developer Groups", "December 2024", "1st Place", "Winner", 
     "Won DevFest Jalandhar, a tech conference hosted by Google Developer Groups Jalandhar, bringing developers together to learn and innovate. Judges were so impressed that they awarded us monetary rewards and goodies, including exclusive event T-shirts. Connected with fellow developers and explored new ideas while using Google's tools in an event filled with learning, collaboration, and unforgettable memories!", 
     '["React", "Node.js", "AI/ML", "Google Cloud"]', 4, "48 hours", "₹15,000", "/photo/devfest/main.jpg"),
    
    (2, "EdTech Innovation Sprint", "TechLearnz Groups 2024", "March 2024", "1st Place", "Winner",
     "Innovative educational platform that revolutionizes online learning through AI-powered personalized content delivery and real-time collaboration tools.",
     '["React", "Python", "AI/ML", "MongoDB"]', 4, "24 hours", "₹25,000", "/photo/other/main.jpg"),
    
    (3, "DevFest Jalandhar 2024", "Google Developer Groups", "December 2024", "1st Place", "Winner", 
     "Won DevFest Jalandhar, a tech conference hosted by Google Developer Groups Jalandhar, bringing developers together to learn and innovate. Judges were so impressed that they awarded us monetary rewards and goodies, including exclusive event T-shirts. Connected with fellow developers and explored new ideas while using Google's tools in an event filled with learning, collaboration, and unforgettable memories!", 
     '["React", "Node.js", "AI/ML", "Google Cloud"]', 4, "48 hours", "₹15,000", "/photo/devfest/main.jpg"),
    
    (4, "TechFest Innovation Challenge", "TechFest Community", "November 2024", "2nd Place", "Runner-up",
     "Built an innovative solution for smart city management using IoT sensors and real-time data analytics.",
     '["IoT", "Python", "React", "Firebase"]', 3, "36 hours", "₹10,000", "/photo/other/main.jpg"),
    
    (5, "Arena Hackathon 2024", "Arena Tech Challenge", "October 2024", "2nd Place", "Runner-up",
     "Arena Tech Challenge hackathon where we built innovative solutions and competed with talented developers from across the region.",
     '["JavaScript", "React", "Node.js", "MongoDB"]', 4, "24 hours", "₹12,000", "/photo/arena/main.jpg"),
    
    (6, "Code-a-Haunt Halloween Hackathon", "Code-a-Haunt 2024", "October 2024", "3rd Place", "Third Position",
     "Spooky themed hackathon where we created Halloween-inspired tech solutions with a creative twist.",
     '["Python", "Flask", "JavaScript", "CSS"]', 3, "48 hours", "₹8,000", "/photo/code-a-haunt/main.jpg"),
    
    (7, "Code of Duty Gaming Hackathon", "Gaming Community 2024", "September 2024", "1st Place", "Winner",
     "Gaming-focused hackathon where we developed innovative gaming solutions and interactive experiences.",
     '["Unity", "C#", "JavaScript", "WebGL"]', 4, "72 hours", "₹20,000", "/photo/code-of-duty/main.jpg"),
    
    (8, "CodingBlocks LPU Hackathon", "LPU CodingBlocks", "August 2024", "2nd Place", "Runner-up",
     "University-level hackathon organized by CodingBlocks at LPU, focusing on practical coding solutions.",
     '["Java", "Spring Boot", "React", "MySQL"]', 3, "24 hours", "₹15,000", "/photo/codingblockslpu/main.jpg"),
    
    (9, "Microsoft Azure Innovation Challenge", "Microsoft", "July 2024", "1st Place", "Winner",
     "Microsoft-sponsored hackathon focusing on cloud solutions and Azure services integration.",
     '["Azure", "C#", ".NET", "React"]', 4, "48 hours", "₹30,000", "/photo/microsoft/main.jpg"),
    
    (10, "General Tech Hackathon", "Various Tech Communities", "June 2024", "Participant", "Participated",
     "Multi-community hackathon bringing together developers from various tech backgrounds and specializations.",
     '["Full Stack", "Various Technologies"]', 4, "36 hours", "Experience", "/photo/other/main.jpg")
]

# Insert hackathons
cursor.executemany('''
INSERT INTO hackathons (id, title, organization, date, place, position, description, technologies, team_size, duration, prize_money, main_image)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', hackathons_data)

# Insert gallery data for each hackathon
gallery_data = [
    # DevFest (ID 1 and 3)
    (1, 1, "/photo/devfest/devfest1.jpg", "DevFest Team Photo", 1),
    (2, 1, "/photo/devfest/devfest2.jpg", "DevFest Presentation", 2),
    (3, 1, "/photo/devfest/devfest3.jpg", "DevFest Awards Ceremony", 3),
    (4, 1, "/photo/devfest/devfest4.jpg", "DevFest Coding Session", 4),
    (5, 1, "/photo/devfest/devfest5.jpg", "DevFest Group Discussion", 5),
    (6, 1, "/photo/devfest/devfest6.jpg", "DevFest Final Demo", 6),
    
    (7, 3, "/photo/devfest/devfest1.jpg", "DevFest Team Photo", 1),
    (8, 3, "/photo/devfest/devfest2.jpg", "DevFest Presentation", 2),
    (9, 3, "/photo/devfest/devfest3.jpg", "DevFest Awards Ceremony", 3),
    (10, 3, "/photo/devfest/devfest4.jpg", "DevFest Coding Session", 4),
    (11, 3, "/photo/devfest/devfest5.jpg", "DevFest Group Discussion", 5),
    (12, 3, "/photo/devfest/devfest6.jpg", "DevFest Final Demo", 6),
    
    # Arena (ID 5)
    (13, 5, "/photo/arena/arena1.jpg", "Arena Hackathon Opening", 1),
    (14, 5, "/photo/arena/arena2.jpg", "Arena Team Collaboration", 2),
    (15, 5, "/photo/arena/arena3.jpg", "Arena Project Development", 3),
    (16, 5, "/photo/arena/arena4.jpg", "Arena Final Presentation", 4),
    
    # Code-a-Haunt (ID 6)
    (17, 6, "/photo/code-a-haunt/codeahaunt1.jpg", "Halloween Themed Setup", 1),
    (18, 6, "/photo/code-a-haunt/codeahaunt2.jpg", "Spooky Coding Session", 2),
    (19, 6, "/photo/code-a-haunt/codeahaunt3.jpg", "Halloween Project Demo", 3),
    (20, 6, "/photo/code-a-haunt/codeahaunt4.jpg", "Code-a-Haunt Award Ceremony", 4),
    (21, 6, "/photo/code-a-haunt/codeahaunt5.jpg", "Halloween Team Photo", 5),
    
    # Code of Duty (ID 7)
    (22, 7, "/photo/code-of-duty/codeofduty1.jpg", "Gaming Hackathon Kickoff", 1),
    (23, 7, "/photo/code-of-duty/codeofduty2.jpg", "Game Development Session", 2),
    (24, 7, "/photo/code-of-duty/codeofduty3.jpg", "Code of Duty Team Building", 3),
    (25, 7, "/photo/code-of-duty/codeofduty4.jpg", "Gaming Solution Demo", 4),
    (26, 7, "/photo/code-of-duty/codeofduty5.jpg", "Winners Celebration", 5),
    
    # CodingBlocks LPU (ID 8)
    (27, 8, "/photo/codingblockslpu/codingblockslpu1.jpg", "LPU Campus Event", 1),
    (28, 8, "/photo/codingblockslpu/codingblockslpu2.jpg", "University Hackathon", 2),
    (29, 8, "/photo/codingblockslpu/codingblockslpu3.jpg", "CodingBlocks Mentorship", 3),
    (30, 8, "/photo/codingblockslpu/codingblockslpu4.jpg", "LPU Project Showcase", 4),
    (31, 8, "/photo/codingblockslpu/codingblockslpu5.jpg", "Academic Excellence", 5),
    (32, 8, "/photo/codingblockslpu/codingblockslpu6.jpg", "University Achievement", 6),
    
    # Microsoft (ID 9)
    (33, 9, "/photo/microsoft/microsoft1.jpg", "Microsoft Azure Challenge", 1),
    (34, 9, "/photo/microsoft/microsoft2.jpg", "Cloud Solutions Development", 2),
    (35, 9, "/photo/microsoft/microsoft3.jpg", "Microsoft Mentorship", 3),
    (36, 9, "/photo/microsoft/microsoft4.jpg", "Azure Integration Demo", 4),
    (37, 9, "/photo/microsoft/microsoft5.jpg", "Microsoft Award Ceremony", 5),
    (38, 9, "/photo/microsoft/microsoft6.jpg", "Cloud Innovation Team", 6),
    (39, 9, "/photo/microsoft/microsoft7.jpg", "Microsoft Partnership", 7),
    (40, 9, "/photo/microsoft/microsoft8.jpg", "Enterprise Solution Showcase", 8),
    
    # Other/General (ID 2, 4, 10)
    (41, 2, "/photo/other/other1.jpg", "EdTech Innovation", 1),
    (42, 2, "/photo/other/other2.jpg", "Educational Platform Demo", 2),
    (43, 4, "/photo/other/other3.jpg", "TechFest Smart City Solution", 1),
    (44, 4, "/photo/other/other4.jpg", "IoT Innovation Demo", 2),
    (45, 10, "/photo/other/other5.jpg", "General Tech Community", 1),
    (46, 10, "/photo/other/other6.jpg", "Multi-Community Collaboration", 2)
]

cursor.executemany('''
INSERT INTO project_gallery (id, hackathon_id, image_url, alt_text, image_order)
VALUES (?, ?, ?, ?, ?)
''', gallery_data)

# Create other tables for completeness
cursor.execute('''
CREATE TABLE work_experience (
    id INTEGER PRIMARY KEY,
    company TEXT,
    position TEXT,
    duration TEXT,
    description TEXT,
    technologies TEXT,
    achievements TEXT
)
''')

cursor.execute('''
CREATE TABLE education (
    id INTEGER PRIMARY KEY,
    institution TEXT,
    degree TEXT,
    field TEXT,
    duration TEXT,
    grade TEXT,
    description TEXT
)
''')

cursor.execute('''
CREATE TABLE skills (
    id INTEGER PRIMARY KEY,
    category TEXT,
    skill_name TEXT,
    proficiency_level INTEGER,
    years_experience INTEGER
)
''')

# Commit changes and close connection
conn.commit()
conn.close()

print("Database created successfully with all hackathon data!")
