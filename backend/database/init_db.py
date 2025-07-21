#!/usr/bin/env python3
"""
Database initialization script for Portfolio Website
Creates SQLite database with all necessary tables
"""

import sqlite3
import os
from datetime import datetime

DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'portfolio.db')

def create_database():
    """Create the SQLite database and all tables"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Enable foreign key constraints
    cursor.execute("PRAGMA foreign_keys = ON")
    
    # Users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT,
            google_id TEXT UNIQUE,
            profile_picture TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Hackathons table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS hackathons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            event_name TEXT NOT NULL,
            description TEXT,
            position TEXT,
            status TEXT DEFAULT 'active',
            start_date DATE,
            end_date DATE,
            team_size INTEGER,
            location TEXT,
            prize_amount DECIMAL(10,2),
            project_url TEXT,
            github_url TEXT,
            demo_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Technologies table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS technologies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            category TEXT,
            icon_url TEXT,
            color TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Hackathon technologies junction table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS hackathon_technologies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hackathon_id INTEGER NOT NULL,
            technology_id INTEGER NOT NULL,
            FOREIGN KEY (hackathon_id) REFERENCES hackathons (id) ON DELETE CASCADE,
            FOREIGN KEY (technology_id) REFERENCES technologies (id) ON DELETE CASCADE,
            UNIQUE(hackathon_id, technology_id)
        )
    ''')
    
    # Team members table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS team_members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hackathon_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            role TEXT,
            linkedin_url TEXT,
            github_url TEXT,
            email TEXT,
            FOREIGN KEY (hackathon_id) REFERENCES hackathons (id) ON DELETE CASCADE
        )
    ''')
    
    # Project features table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS project_features (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hackathon_id INTEGER NOT NULL,
            feature_text TEXT NOT NULL,
            feature_order INTEGER DEFAULT 0,
            FOREIGN KEY (hackathon_id) REFERENCES hackathons (id) ON DELETE CASCADE
        )
    ''')
    
    # Project timeline table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS project_timeline (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hackathon_id INTEGER NOT NULL,
            phase_name TEXT NOT NULL,
            description TEXT,
            date_completed DATE,
            duration_hours INTEGER,
            timeline_order INTEGER DEFAULT 0,
            FOREIGN KEY (hackathon_id) REFERENCES hackathons (id) ON DELETE CASCADE
        )
    ''')
    
    # Recognition/Awards table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recognition (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hackathon_id INTEGER NOT NULL,
            award_type TEXT NOT NULL,
            award_title TEXT NOT NULL,
            description TEXT,
            icon TEXT,
            FOREIGN KEY (hackathon_id) REFERENCES hackathons (id) ON DELETE CASCADE
        )
    ''')
    
    # Project gallery table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS project_gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hackathon_id INTEGER NOT NULL,
            image_url TEXT NOT NULL,
            image_alt TEXT,
            image_order INTEGER DEFAULT 0,
            is_featured BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (hackathon_id) REFERENCES hackathons (id) ON DELETE CASCADE
        )
    ''')
    
    # Work Experience tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS work_experiences (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_name TEXT NOT NULL,
            position TEXT NOT NULL,
            location TEXT,
            employment_type TEXT,
            start_date DATE NOT NULL,
            end_date DATE,
            is_current BOOLEAN DEFAULT FALSE,
            description TEXT,
            company_logo TEXT,
            company_website TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Work experience achievements table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS work_achievements (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            work_experience_id INTEGER NOT NULL,
            achievement_text TEXT NOT NULL,
            achievement_order INTEGER DEFAULT 0,
            FOREIGN KEY (work_experience_id) REFERENCES work_experiences (id) ON DELETE CASCADE
        )
    ''')
    
    # Work experience technologies junction table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS work_experience_technologies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            work_experience_id INTEGER NOT NULL,
            technology_id INTEGER NOT NULL,
            FOREIGN KEY (work_experience_id) REFERENCES work_experiences (id) ON DELETE CASCADE,
            FOREIGN KEY (technology_id) REFERENCES technologies (id) ON DELETE CASCADE,
            UNIQUE(work_experience_id, technology_id)
        )
    ''')
    
    # Education table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS education (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            degree TEXT NOT NULL,
            field_of_study TEXT,
            institution TEXT NOT NULL,
            location TEXT,
            start_date DATE,
            end_date DATE,
            gpa TEXT,
            description TEXT,
            institution_logo TEXT,
            institution_website TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Skills table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            skill_name TEXT NOT NULL,
            category TEXT,
            proficiency_level INTEGER DEFAULT 0,
            years_of_experience INTEGER,
            icon_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print(f"Database created successfully at: {DATABASE_PATH}")

def seed_sample_data():
    """Insert sample hackathon data"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Insert sample technologies
    technologies = [
        ('React', 'Frontend', 'react-icon.svg', '#61DAFB'),
        ('Python', 'Backend', 'python-icon.svg', '#3776AB'),
        ('Flask', 'Backend', 'flask-icon.svg', '#000000'),
        ('SQLite', 'Database', 'sqlite-icon.svg', '#003B57'),
        ('JavaScript', 'Frontend', 'js-icon.svg', '#F7DF1E'),
        ('HTML5', 'Frontend', 'html5-icon.svg', '#E34F26'),
        ('CSS3', 'Frontend', 'css3-icon.svg', '#1572B6'),
        ('Node.js', 'Backend', 'nodejs-icon.svg', '#339933'),
        ('Express', 'Backend', 'express-icon.svg', '#000000'),
        ('MongoDB', 'Database', 'mongodb-icon.svg', '#47A248')
    ]
    
    for tech in technologies:
        cursor.execute('''
            INSERT OR IGNORE INTO technologies (name, category, icon_url, color)
            VALUES (?, ?, ?, ?)
        ''', tech)
    
    # Insert sample hackathon - DevFest Jalandhar (first entry)
    cursor.execute('''
        INSERT INTO hackathons (
            title, event_name, description, position, start_date, end_date,
            team_size, location, prize_amount, project_url, github_url, demo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'DevFest Jalandhar 2024 - Winner',
        'DevFest Jalandhar - Google Developer Groups',
        'Won DevFest Jalandhar, a tech conference hosted by Google Developer Groups Jalandhar, bringing developers together to learn and innovate. Judges were so impressed that they awarded us monetary rewards and goodies, including exclusive event T-shirts. Connected with fellow developers and explored new ideas using Google\'s tools in an event filled with learning, collaboration, and unforgettable memories!',
        '1st Place - Winner',
        '2024-12-15',
        '2024-12-15',
        4,
        'Jalandhar, Punjab, India',
        15000.00,
        'https://devfest-jalandhar.com',
        'https://github.com/sreecharan/devfest-project',
        'https://devfest-demo.com'
    ))
    
    devfest_hackathon_id = cursor.lastrowid
    
    # Insert DevFest team members
    devfest_team_members = [
        (devfest_hackathon_id, 'Sree Charan', 'Full Stack Developer', 'https://linkedin.com/in/sreecharan', 'https://github.com/sreecharan', 'sree@example.com'),
        (devfest_hackathon_id, 'Amit Gupta', 'Frontend Developer', 'https://linkedin.com/in/amitgupta', 'https://github.com/amit', 'amit@example.com'),
        (devfest_hackathon_id, 'Badal Kumar', 'Backend Developer', 'https://linkedin.com/in/badalkumar', 'https://github.com/badal', 'badal@example.com'),
        (devfest_hackathon_id, 'Rehan Mittal', 'UI/UX Designer', 'https://linkedin.com/in/rehanmittal', 'https://github.com/rehan', 'rehan@example.com')
    ]
    
    for member in devfest_team_members:
        cursor.execute('''
            INSERT INTO team_members (hackathon_id, name, role, linkedin_url, github_url, email)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', member)
    
    # Insert DevFest project features
    devfest_features = [
        (devfest_hackathon_id, 'Built using Google\'s cutting-edge tools and technologies'),
        (devfest_hackathon_id, 'Innovative solution that impressed industry experts'),
        (devfest_hackathon_id, 'Collaborative development with cross-functional team'),
        (devfest_hackathon_id, 'Real-time implementation and live demonstration'),
        (devfest_hackathon_id, 'Scalable architecture with modern development practices'),
        (devfest_hackathon_id, 'User-centric design with excellent user experience')
    ]
    
    for i, (hid, feature) in enumerate(devfest_features):
        cursor.execute('''
            INSERT INTO project_features (hackathon_id, feature_text, feature_order)
            VALUES (?, ?, ?)
        ''', (hid, feature, i + 1))
    
    # Insert DevFest timeline
    devfest_timeline = [
        (devfest_hackathon_id, 'Registration & Team Formation', 'Registered for DevFest and formed team with fellow developers', '2024-12-15', 1, 1),
        (devfest_hackathon_id, 'Problem Statement Analysis', 'Analyzed the challenge and brainstormed innovative solutions', '2024-12-15', 2, 2),
        (devfest_hackathon_id, 'Design & Architecture', 'Created system design and user interface mockups', '2024-12-15', 3, 3),
        (devfest_hackathon_id, 'Development Phase', 'Implemented the solution using Google\'s tools and technologies', '2024-12-15', 6, 4),
        (devfest_hackathon_id, 'Testing & Integration', 'Tested the application and integrated all components', '2024-12-15', 2, 5),
        (devfest_hackathon_id, 'Final Presentation', 'Presented the solution to judges and won the competition', '2024-12-15', 1, 6)
    ]
    
    for item in devfest_timeline:
        cursor.execute('''
            INSERT INTO project_timeline (hackathon_id, phase_name, description, date_completed, duration_hours, timeline_order)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', item)
    
    # Insert DevFest recognition
    devfest_recognition = [
        (devfest_hackathon_id, 'winner', 'DevFest Winner', 'First place winner at DevFest Jalandhar 2024', '🏆'),
        (devfest_hackathon_id, 'monetary', 'Monetary Rewards', 'Received monetary rewards from the judges', '💰'),
        (devfest_hackathon_id, 'goodies', 'Event Goodies & T-Shirts', 'Exclusive event T-shirts and goodies from Google', '🎁'),
        (devfest_hackathon_id, 'networking', 'Developer Networking', 'Connected with fellow developers and industry experts', '🤝')
    ]
    
    for award in devfest_recognition:
        cursor.execute('''
            INSERT INTO recognition (hackathon_id, award_type, award_title, description, icon)
            VALUES (?, ?, ?, ?, ?)
        ''', award)
    
    # Insert DevFest gallery images
    devfest_gallery = [
        (devfest_hackathon_id, '/photo/devfest/main.jpg', 'DevFest Team with Winners Trophy', 1, True),
        (devfest_hackathon_id, '/photo/devfest/1.jpg', 'DevFest Team Presentation', 2, False),
        (devfest_hackathon_id, '/photo/devfest/2.jpg', 'DevFest Team Development Session', 3, False),
        (devfest_hackathon_id, '/photo/devfest/3.jpg', 'DevFest Networking and Learning', 4, False),
        (devfest_hackathon_id, '/photo/devfest/4.jpg', 'DevFest Awards Ceremony', 5, False),
        (devfest_hackathon_id, '/photo/devfest/5.jpg', 'DevFest Team Celebration', 6, False)
    ]
    
    for gallery_item in devfest_gallery:
        cursor.execute('''
            INSERT INTO project_gallery (hackathon_id, image_url, image_alt, image_order, is_featured)
            VALUES (?, ?, ?, ?, ?)
        ''', gallery_item)
    
    # Insert sample hackathon - EdTech Innovation Sprint (second entry)
    cursor.execute('''
        INSERT INTO hackathons (
            title, event_name, description, position, start_date, end_date,
            team_size, location, prize_amount, project_url, github_url, demo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'EdTech Innovation Sprint',
        'TechCrunch Disrupt 2024',
        'An innovative educational platform that revolutionizes online learning through AI-powered personalized content delivery and real-time collaboration tools.',
        '1st Place',
        '2024-03-15',
        '2024-03-17',
        4,
        'San Francisco, CA',
        25000.00,
        'https://edtech-platform.com',
        'https://github.com/username/edtech-platform',
        'https://demo.edtech-platform.com'
    ))
    
    hackathon_id = cursor.lastrowid
    
    # Insert team members for EdTech hackathon
    team_members = [
        (hackathon_id, 'Sree Charan', 'Full Stack Developer', 'https://linkedin.com/in/sreecharan', 'https://github.com/sreecharan', 'sree@example.com'),
        (hackathon_id, 'Alex Johnson', 'UI/UX Designer', 'https://linkedin.com/in/alexjohnson', 'https://github.com/alex', 'alex@example.com'),
        (hackathon_id, 'Maria Garcia', 'Data Scientist', 'https://linkedin.com/in/mariagarcia', 'https://github.com/maria', 'maria@example.com'),
        (hackathon_id, 'David Chen', 'DevOps Engineer', 'https://linkedin.com/in/davidchen', 'https://github.com/david', 'david@example.com')
    ]
    
    for member in team_members:
        cursor.execute('''
            INSERT INTO team_members (hackathon_id, name, role, linkedin_url, github_url, email)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', member)
    
    # Insert project features
    features = [
        (hackathon_id, 'AI-powered personalized learning paths'),
        (hackathon_id, 'Real-time collaborative whiteboards'),
        (hackathon_id, 'Adaptive assessment system'),
        (hackathon_id, 'Multi-language support'),
        (hackathon_id, 'Advanced analytics dashboard'),
        (hackathon_id, 'Mobile-responsive design')
    ]
    
    for i, (hid, feature) in enumerate(features):
        cursor.execute('''
            INSERT INTO project_features (hackathon_id, feature_text, feature_order)
            VALUES (?, ?, ?)
        ''', (hid, feature, i + 1))
    
    # Insert timeline
    timeline = [
        (hackathon_id, 'Project Planning', 'Initial brainstorming and requirement analysis', '2024-03-15', 4, 1),
        (hackathon_id, 'Design Phase', 'UI/UX design and wireframing', '2024-03-15', 6, 2),
        (hackathon_id, 'Backend Development', 'API development and database setup', '2024-03-16', 8, 3),
        (hackathon_id, 'Frontend Development', 'React components and user interface', '2024-03-16', 10, 4),
        (hackathon_id, 'Integration & Testing', 'System integration and bug fixes', '2024-03-17', 6, 5),
        (hackathon_id, 'Final Presentation', 'Demo preparation and pitch delivery', '2024-03-17', 2, 6)
    ]
    
    for item in timeline:
        cursor.execute('''
            INSERT INTO project_timeline (hackathon_id, phase_name, description, date_completed, duration_hours, timeline_order)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', item)
    
    # Insert recognition
    recognition = [
        (hackathon_id, 'winner', '1st Place Winner', 'First place in the EdTech category', '🏆'),
        (hackathon_id, 'innovation', 'Innovation Award', 'Most innovative use of AI in education', '💡'),
        (hackathon_id, 'audience', 'Audience Choice', 'Voted best project by audience', '👥')
    ]
    
    for award in recognition:
        cursor.execute('''
            INSERT INTO recognition (hackathon_id, award_type, award_title, description, icon)
            VALUES (?, ?, ?, ?, ?)
        ''', award)
    
    # Link technologies to EdTech hackathon
    tech_names = ['React', 'Python', 'Flask', 'SQLite', 'JavaScript']
    for tech_name in tech_names:
        cursor.execute('SELECT id FROM technologies WHERE name = ?', (tech_name,))
        tech_id = cursor.fetchone()[0]
        cursor.execute('''
            INSERT INTO hackathon_technologies (hackathon_id, technology_id)
            VALUES (?, ?)
        ''', (hackathon_id, tech_id))
    
    # Link technologies to DevFest hackathon
    devfest_tech_names = ['JavaScript', 'Python', 'React', 'Node.js', 'HTML5', 'CSS3']
    for tech_name in devfest_tech_names:
        cursor.execute('SELECT id FROM technologies WHERE name = ?', (tech_name,))
        tech_result = cursor.fetchone()
        if tech_result:
            tech_id = tech_result[0]
            cursor.execute('''
                INSERT INTO hackathon_technologies (hackathon_id, technology_id)
                VALUES (?, ?)
            ''', (devfest_hackathon_id, tech_id))
    
    # Insert sample work experiences
    work_experiences = [
        {
            'company_name': 'MAQ Software',
            'position': 'Software Engineer',
            'location': 'Hyderabad, India',
            'employment_type': 'Full-time',
            'start_date': '2023-07-01',
            'end_date': None,
            'is_current': True,
            'description': 'Developing scalable web applications and contributing to data analytics solutions',
            'company_logo': '/companies/maq-software.png',
            'company_website': 'https://maqsoftware.com',
            'achievements': [
                'Developed and maintained React-based web applications serving 10,000+ users',
                'Built scalable backend APIs using Python Flask with 99.9% uptime',
                'Collaborated with cross-functional teams to deliver projects 20% ahead of schedule',
                'Optimized application performance resulting in 40% faster load times',
                'Mentored 3 junior developers and conducted code reviews'
            ],
            'technologies': ['React', 'Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3']
        },
        {
            'company_name': 'TechStart Solutions',
            'position': 'Junior Full Stack Developer',
            'location': 'Bangalore, India',
            'employment_type': 'Internship',
            'start_date': '2023-01-15',
            'end_date': '2023-06-30',
            'is_current': False,
            'description': 'Contributed to full-stack development projects and gained hands-on experience',
            'company_logo': '/companies/techstart.png',
            'company_website': 'https://techstartsolutions.com',
            'achievements': [
                'Built responsive web interfaces using React and Material-UI',
                'Developed RESTful APIs using Node.js and Express',
                'Integrated third-party payment gateways and authentication systems',
                'Participated in agile development processes and daily standups',
                'Achieved 95% code coverage in unit testing'
            ],
            'technologies': ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript']
        },
        {
            'company_name': 'InnovateLab',
            'position': 'Frontend Developer Intern',
            'location': 'Remote',
            'employment_type': 'Internship',
            'start_date': '2022-06-01',
            'end_date': '2022-08-31',
            'is_current': False,
            'description': 'Focused on frontend development and user experience improvements',
            'company_logo': '/companies/innovatelab.png',
            'company_website': 'https://innovatelab.com',
            'achievements': [
                'Created interactive dashboard components using React and D3.js',
                'Improved website accessibility score from 70% to 95%',
                'Implemented responsive design patterns for mobile optimization',
                'Collaborated with UX designers to implement pixel-perfect designs'
            ],
            'technologies': ['React', 'JavaScript', 'HTML5', 'CSS3']
        }
    ]
    
    for work_exp in work_experiences:
        # Insert work experience
        cursor.execute('''
            INSERT INTO work_experiences (
                company_name, position, location, employment_type, start_date, end_date,
                is_current, description, company_logo, company_website
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            work_exp['company_name'],
            work_exp['position'], 
            work_exp['location'],
            work_exp['employment_type'],
            work_exp['start_date'],
            work_exp['end_date'],
            work_exp['is_current'],
            work_exp['description'],
            work_exp['company_logo'],
            work_exp['company_website']
        ))
        
        work_exp_id = cursor.lastrowid
        
        # Insert achievements
        for i, achievement in enumerate(work_exp['achievements']):
            cursor.execute('''
                INSERT INTO work_achievements (work_experience_id, achievement_text, achievement_order)
                VALUES (?, ?, ?)
            ''', (work_exp_id, achievement, i + 1))
        
        # Link technologies
        for tech_name in work_exp['technologies']:
            cursor.execute('SELECT id FROM technologies WHERE name = ?', (tech_name,))
            tech_result = cursor.fetchone()
            if tech_result:
                tech_id = tech_result[0]
                cursor.execute('''
                    INSERT INTO work_experience_technologies (work_experience_id, technology_id)
                    VALUES (?, ?)
                ''', (work_exp_id, tech_id))
    
    # Insert sample education
    education_data = [
        {
            'degree': 'Bachelor of Technology',
            'field_of_study': 'Computer Science Engineering',
            'institution': 'JNTUH College of Engineering',
            'location': 'Hyderabad, India',
            'start_date': '2019-08-01',
            'end_date': '2023-05-31',
            'gpa': '8.5/10',
            'description': 'Specialized in software development, data structures, and algorithms',
            'institution_logo': '/institutions/jntuh.png',
            'institution_website': 'https://jntuh.ac.in'
        }
    ]
    
    for edu in education_data:
        cursor.execute('''
            INSERT INTO education (
                degree, field_of_study, institution, location, start_date, end_date,
                gpa, description, institution_logo, institution_website
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            edu['degree'], edu['field_of_study'], edu['institution'], edu['location'],
            edu['start_date'], edu['end_date'], edu['gpa'], edu['description'],
            edu['institution_logo'], edu['institution_website']
        ))
    
    # Insert Arena Hackathon
    cursor.execute('''
        INSERT INTO hackathons (
            title, event_name, description, position, start_date, end_date,
            team_size, location, prize_amount, project_url, github_url, demo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'Arena Hackathon 2024',
        'Arena Tech Challenge',
        'Participated in Arena Hackathon, a competitive programming and development challenge focusing on innovative tech solutions.',
        '2nd Place',
        '2024-10-20',
        '2024-10-22',
        4,
        'Arena Tech Hub, India',
        25000.00,
        'https://arena-project.com',
        'https://github.com/sreecharan/arena-project',
        'https://arena-demo.com'
    ))
    
    arena_hackathon_id = cursor.lastrowid
    
    # Insert Arena gallery images
    arena_gallery = [
        (arena_hackathon_id, '/photo/arena/main.jpg', 'Arena Hackathon Main Photo', 0, True),
        (arena_hackathon_id, '/photo/arena/1.jpg', 'Arena Hackathon Photo 1', 1, False),
        (arena_hackathon_id, '/photo/arena/2.jpg', 'Arena Hackathon Photo 2', 2, False),
        (arena_hackathon_id, '/photo/arena/3.jpg', 'Arena Hackathon Photo 3', 3, False)
    ]
    
    for gallery in arena_gallery:
        cursor.execute('''
            INSERT INTO project_gallery (hackathon_id, image_url, image_alt, image_order, is_featured)
            VALUES (?, ?, ?, ?, ?)
        ''', gallery)
    
    # Insert Code-a-Haunt Hackathon
    cursor.execute('''
        INSERT INTO hackathons (
            title, event_name, description, position, start_date, end_date,
            team_size, location, prize_amount, project_url, github_url, demo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'Code-a-Haunt Halloween Hackathon',
        'Code-a-Haunt 2024',
        'Halloween-themed hackathon where we built spooky and creative tech solutions with a horror twist.',
        '3rd Place',
        '2024-10-31',
        '2024-11-01',
        3,
        'Online Event',
        15000.00,
        'https://code-a-haunt.com',
        'https://github.com/sreecharan/code-a-haunt',
        'https://haunt-demo.com'
    ))
    
    haunt_hackathon_id = cursor.lastrowid
    
    # Insert Code-a-Haunt gallery
    cursor.execute('''
        INSERT INTO project_gallery (hackathon_id, image_url, image_alt, image_order, is_featured)
        VALUES (?, ?, ?, ?, ?)
    ''', (haunt_hackathon_id, '/photo/code-a-haunt/main.jpg', 'Code-a-Haunt Main Photo', 0, True))
    
    # Insert Code of Duty Hackathon
    cursor.execute('''
        INSERT INTO hackathons (
            title, event_name, description, position, start_date, end_date,
            team_size, location, prize_amount, project_url, github_url, demo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'Code of Duty - Gaming Hackathon',
        'Code of Duty 2024',
        'Gaming-themed hackathon inspired by Call of Duty, focusing on building gaming applications and interactive experiences.',
        '1st Place',
        '2024-09-15',
        '2024-09-17',
        5,
        'Gaming Arena, Bangalore',
        50000.00,
        'https://code-of-duty.com',
        'https://github.com/sreecharan/code-of-duty',
        'https://cod-demo.com'
    ))
    
    cod_hackathon_id = cursor.lastrowid
    
    # Insert Code of Duty gallery
    cod_gallery = [
        (cod_hackathon_id, '/photo/code-of-duty/mian.jpg', 'Code of Duty Main Photo', 0, True),
        (cod_hackathon_id, '/photo/code-of-duty/1.jpg', 'Code of Duty Photo 1', 1, False),
        (cod_hackathon_id, '/photo/code-of-duty/2.jpg', 'Code of Duty Photo 2', 2, False),
        (cod_hackathon_id, '/photo/code-of-duty/3.jpg', 'Code of Duty Photo 3', 3, False),
        (cod_hackathon_id, '/photo/code-of-duty/4.jpg', 'Code of Duty Photo 4', 4, False),
        (cod_hackathon_id, '/photo/code-of-duty/5.jpg', 'Code of Duty Photo 5', 5, False)
    ]
    
    for gallery in cod_gallery:
        cursor.execute('''
            INSERT INTO project_gallery (hackathon_id, image_url, image_alt, image_order, is_featured)
            VALUES (?, ?, ?, ?, ?)
        ''', gallery)
    
    # Insert CodingBlocks LPU Hackathon
    cursor.execute('''
        INSERT INTO hackathons (
            title, event_name, description, position, start_date, end_date,
            team_size, location, prize_amount, project_url, github_url, demo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'CodingBlocks LPU Hackathon',
        'CodingBlocks x LPU Tech Fest',
        'Collaboration between CodingBlocks and LPU (Lovely Professional University) for a major tech hackathon focusing on educational technology solutions.',
        '2nd Place',
        '2024-08-25',
        '2024-08-27',
        4,
        'LPU Campus, Punjab',
        30000.00,
        'https://codingblocks-lpu.com',
        'https://github.com/sreecharan/cb-lpu-project',
        'https://cb-lpu-demo.com'
    ))
    
    cb_hackathon_id = cursor.lastrowid
    
    # Insert CodingBlocks LPU gallery
    cb_gallery = [
        (cb_hackathon_id, '/photo/codingblockslpu/main.jpg', 'CodingBlocks LPU Main Photo', 0, True),
        (cb_hackathon_id, '/photo/codingblockslpu/1.jpg', 'CodingBlocks LPU Photo 1', 1, False),
        (cb_hackathon_id, '/photo/codingblockslpu/2.jpg', 'CodingBlocks LPU Photo 2', 2, False),
        (cb_hackathon_id, '/photo/codingblockslpu/3.jpg', 'CodingBlocks LPU Photo 3', 3, False)
    ]
    
    for gallery in cb_gallery:
        cursor.execute('''
            INSERT INTO project_gallery (hackathon_id, image_url, image_alt, image_order, is_featured)
            VALUES (?, ?, ?, ?, ?)
        ''', gallery)
    
    # Insert Microsoft Hackathon
    cursor.execute('''
        INSERT INTO hackathons (
            title, event_name, description, position, start_date, end_date,
            team_size, location, prize_amount, project_url, github_url, demo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'Microsoft Azure Hackathon 2024',
        'Microsoft Azure Developer Challenge',
        'Official Microsoft Azure hackathon focusing on cloud-native applications and AI integration. Built innovative solutions using Microsoft\'s cloud ecosystem.',
        '1st Place',
        '2024-07-10',
        '2024-07-12',
        4,
        'Microsoft Office, Hyderabad',
        75000.00,
        'https://azure-project.com',
        'https://github.com/sreecharan/azure-hackathon',
        'https://azure-demo.com'
    ))
    
    ms_hackathon_id = cursor.lastrowid
    
    # Insert Microsoft gallery
    ms_gallery = [
        (ms_hackathon_id, '/photo/microsoft/main.jpg', 'Microsoft Hackathon Main Photo', 0, True),
        (ms_hackathon_id, '/photo/microsoft/1.jpg', 'Microsoft Hackathon Photo 1', 1, False),
        (ms_hackathon_id, '/photo/microsoft/2.jpg', 'Microsoft Hackathon Photo 2', 2, False),
        (ms_hackathon_id, '/photo/microsoft/3.jpg', 'Microsoft Hackathon Photo 3', 3, False),
        (ms_hackathon_id, '/photo/microsoft/4.jpg', 'Microsoft Hackathon Photo 4', 4, False),
        (ms_hackathon_id, '/photo/microsoft/5.jpg', 'Microsoft Hackathon Photo 5', 5, False),
        (ms_hackathon_id, '/photo/microsoft/6.jpg', 'Microsoft Hackathon Photo 6', 6, False),
        (ms_hackathon_id, '/photo/microsoft/7.jpg', 'Microsoft Hackathon Photo 7', 7, False)
    ]
    
    for gallery in ms_gallery:
        cursor.execute('''
            INSERT INTO project_gallery (hackathon_id, image_url, image_alt, image_order, is_featured)
            VALUES (?, ?, ?, ?, ?)
        ''', gallery)
    
    # Insert Other/General Hackathons
    cursor.execute('''
        INSERT INTO hackathons (
            title, event_name, description, position, start_date, end_date,
            team_size, location, prize_amount, project_url, github_url, demo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'Open Source Innovation Challenge',
        'Various Tech Events',
        'Collection of various hackathon participations and open source contributions across different tech events and challenges.',
        'Participant',
        '2024-06-01',
        '2024-11-30',
        1,
        'Various Locations',
        0.00,
        'https://opensource-projects.com',
        'https://github.com/sreecharan/opensource',
        'https://oss-demo.com'
    ))
    
    other_hackathon_id = cursor.lastrowid
    
    # Insert Other gallery
    other_gallery = [
        (other_hackathon_id, '/photo/other/1.png', 'Open Source Photo 1', 0, True),
        (other_hackathon_id, '/photo/other/2.png', 'Open Source Photo 2', 1, False),
        (other_hackathon_id, '/photo/other/3.jpg', 'Open Source Photo 3', 2, False)
    ]
    
    for gallery in other_gallery:
        cursor.execute('''
            INSERT INTO project_gallery (hackathon_id, image_url, image_alt, image_order, is_featured)
            VALUES (?, ?, ?, ?, ?)
        ''', gallery)

    # Insert sample skills
    skills_data = [
        ('JavaScript', 'Programming Languages', 90, 3),
        ('Python', 'Programming Languages', 85, 2),
        ('React', 'Frontend Frameworks', 90, 3),
        ('Node.js', 'Backend Technologies', 80, 2),
        ('Flask', 'Backend Technologies', 75, 2),
        ('HTML5', 'Frontend Technologies', 95, 4),
        ('CSS3', 'Frontend Technologies', 90, 4),
        ('Git', 'Tools & Technologies', 85, 3),
        ('SQL', 'Databases', 80, 2),
        ('MongoDB', 'Databases', 70, 1)
    ]
    
    for skill_name, category, proficiency, years in skills_data:
        cursor.execute('''
            INSERT INTO skills (skill_name, category, proficiency_level, years_of_experience)
            VALUES (?, ?, ?, ?)
        ''', (skill_name, category, proficiency, years))
    
    conn.commit()
    conn.close()
    print("Sample data inserted successfully!")

if __name__ == "__main__":
    create_database()
    seed_sample_data()
