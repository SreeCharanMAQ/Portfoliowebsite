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
    
    # Insert sample hackathon
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
    
    # Insert team members
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
    
    # Link technologies to hackathon
    tech_names = ['React', 'Python', 'Flask', 'SQLite', 'JavaScript']
    for tech_name in tech_names:
        cursor.execute('SELECT id FROM technologies WHERE name = ?', (tech_name,))
        tech_id = cursor.fetchone()[0]
        cursor.execute('''
            INSERT INTO hackathon_technologies (hackathon_id, technology_id)
            VALUES (?, ?)
        ''', (hackathon_id, tech_id))
    
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
