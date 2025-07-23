#!/usr/bin/env python3
"""
Create projects database tables and populate with initial data
"""
import sqlite3
import os
from datetime import datetime

def create_projects_tables():
    # Database path
    db_path = os.path.join(os.path.dirname(__file__), 'database', 'portfolio.db')
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Create projects table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT,
                long_description TEXT,
                status TEXT DEFAULT 'completed',
                start_date DATE,
                end_date DATE,
                project_url TEXT,
                github_url TEXT,
                demo_url TEXT,
                image_url TEXT,
                featured BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create project_technologies table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS project_technologies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL,
                technology_id INTEGER NOT NULL,
                FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
                FOREIGN KEY (technology_id) REFERENCES technologies (id) ON DELETE CASCADE,
                UNIQUE(project_id, technology_id)
            )
        ''')
        
        # Create project_features table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS project_features (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL,
                feature_text TEXT NOT NULL,
                feature_order INTEGER DEFAULT 0,
                FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
            )
        ''')
        
        # Create project_gallery table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS project_gallery (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id INTEGER NOT NULL,
                image_url TEXT NOT NULL,
                image_alt TEXT,
                image_order INTEGER DEFAULT 0,
                is_featured BOOLEAN DEFAULT FALSE,
                FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
            )
        ''')
        
        print("✅ Created projects database tables")
        
        # Insert initial projects
        projects_data = [
            {
                'id': 1,
                'title': 'Study Buddy - AI Learning Assistant',
                'category': 'AI/ML',
                'description': 'An intelligent study companion that helps students learn more effectively using AI-powered features.',
                'long_description': 'Study Buddy is a comprehensive AI-powered learning platform that personalizes the study experience for each student. It features intelligent flashcards, progress tracking, study schedule optimization, and AI-generated quizzes based on your learning materials.',
                'status': 'completed',
                'start_date': '2024-03-01',
                'end_date': '2024-06-15',
                'github_url': 'https://github.com/sreecharan/study-buddy',
                'demo_url': 'https://study-buddy-demo.netlify.app',
                'image_url': '/project/study-buddy/main.jpg',
                'featured': True
            },
            {
                'id': 2,
                'title': 'Health Buddy - Personal Wellness Tracker',
                'category': 'Healthcare',
                'description': 'A comprehensive health monitoring and wellness tracking application with AI insights.',
                'long_description': 'Health Buddy is a modern health tracking application that monitors vital signs, tracks fitness goals, provides medication reminders, and offers personalized health insights using machine learning algorithms.',
                'status': 'completed',
                'start_date': '2024-01-15',
                'end_date': '2024-04-30',
                'github_url': 'https://github.com/sreecharan/health-buddy',
                'demo_url': 'https://health-buddy-app.vercel.app',
                'image_url': '/project/health-buddy/main.jpg',
                'featured': True
            },
            {
                'id': 3,
                'title': 'Agriculture Buddy - Smart Farming Assistant',
                'category': 'AgriTech',
                'description': 'An IoT and AI-powered platform for modern farmers to optimize crop yield and monitor farm conditions.',
                'long_description': 'Agriculture Buddy combines IoT sensors, satellite imagery, and machine learning to provide farmers with real-time insights about soil conditions, weather patterns, pest detection, and crop health monitoring.',
                'status': 'completed',
                'start_date': '2024-02-01',
                'end_date': '2024-05-20',
                'github_url': 'https://github.com/sreecharan/agriculture-buddy',
                'demo_url': 'https://agri-buddy-platform.herokuapp.com',
                'image_url': '/project/agriculture-buddy/main.jpg',
                'featured': True
            },
            {
                'id': 4,
                'title': 'SmartPredict - Advanced Analytics Platform',
                'category': 'AI/ML',
                'description': 'A machine learning platform for predictive analytics and business intelligence.',
                'long_description': 'SmartPredict is an enterprise-grade analytics platform that uses advanced machine learning algorithms to provide predictive insights, automated reporting, and real-time data visualization for business decision making.',
                'status': 'completed',
                'start_date': '2024-04-01',
                'end_date': '2024-07-15',
                'github_url': 'https://github.com/sreecharan/smart-predict',
                'demo_url': 'https://smartpredict-analytics.com',
                'image_url': '/project/smart-predict/main.jpg',
                'featured': True
            },
            {
                'id': 5,
                'title': 'VisionAI - Computer Vision Suite',
                'category': 'AI/ML',
                'description': 'A comprehensive computer vision toolkit for object detection, image recognition, and analysis.',
                'long_description': 'VisionAI is a powerful computer vision platform that provides pre-trained models for object detection, facial recognition, image classification, and custom model training with an intuitive web interface.',
                'status': 'completed',
                'start_date': '2024-05-01',
                'end_date': '2024-08-10',
                'github_url': 'https://github.com/sreecharan/vision-ai',
                'demo_url': 'https://vision-ai-suite.netlify.app',
                'image_url': '/project/vision-ai/main.jpg',
                'featured': True
            }
        ]
        
        # Insert projects
        for project in projects_data:
            cursor.execute('''
                INSERT OR REPLACE INTO projects (
                    id, title, category, description, long_description, status,
                    start_date, end_date, github_url, demo_url, image_url, featured
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                project['id'], project['title'], project['category'], 
                project['description'], project['long_description'], project['status'],
                project['start_date'], project['end_date'], project['github_url'],
                project['demo_url'], project['image_url'], project['featured']
            ))
            print(f"✅ Added project: {project['title']}")
        
        # Add technologies for projects
        project_technologies = [
            # Study Buddy technologies
            (1, 'Python'), (1, 'TensorFlow'), (1, 'React'), (1, 'Node.js'), (1, 'MongoDB'), (1, 'Natural Language Processing'),
            # Health Buddy technologies
            (2, 'React Native'), (2, 'Python'), (2, 'FastAPI'), (2, 'PostgreSQL'), (2, 'Machine Learning'), (2, 'Docker'),
            # Agriculture Buddy technologies
            (3, 'IoT'), (3, 'Python'), (3, 'Django'), (3, 'React'), (3, 'Computer Vision'), (3, 'AWS'),
            # SmartPredict technologies
            (4, 'Python'), (4, 'Scikit-learn'), (4, 'Pandas'), (4, 'React'), (4, 'Flask'), (4, 'Redis'),
            # VisionAI technologies
            (5, 'Python'), (5, 'OpenCV'), (5, 'PyTorch'), (5, 'FastAPI'), (5, 'React'), (5, 'Docker')
        ]
        
        for project_id, tech_name in project_technologies:
            # Get or create technology
            cursor.execute('SELECT id FROM technologies WHERE name = ?', (tech_name,))
            tech_result = cursor.fetchone()
            
            if tech_result:
                tech_id = tech_result[0]
            else:
                cursor.execute('INSERT INTO technologies (name, category) VALUES (?, ?)', (tech_name, 'General'))
                tech_id = cursor.lastrowid
            
            # Link technology to project
            cursor.execute('''
                INSERT OR IGNORE INTO project_technologies (project_id, technology_id)
                VALUES (?, ?)
            ''', (project_id, tech_id))
        
        print("✅ Added project technologies")
        
        # Add features for projects
        project_features = [
            # Study Buddy features
            (1, 'AI-powered flashcard generation', 1),
            (1, 'Personalized study schedules', 2),
            (1, 'Progress tracking and analytics', 3),
            (1, 'Smart quiz generation', 4),
            (1, 'Study group collaboration', 5),
            (1, 'Voice-to-text note taking', 6),
            
            # Health Buddy features
            (2, 'Vital signs monitoring', 1),
            (2, 'Fitness goal tracking', 2),
            (2, 'Medication reminders', 3),
            (2, 'Health insights dashboard', 4),
            (2, 'Doctor appointment scheduling', 5),
            (2, 'Emergency contact integration', 6),
            
            # Agriculture Buddy features
            (3, 'IoT sensor integration', 1),
            (3, 'Crop health monitoring', 2),
            (3, 'Weather prediction', 3),
            (3, 'Pest detection using AI', 4),
            (3, 'Yield optimization recommendations', 5),
            (3, 'Market price tracking', 6),
            
            # SmartPredict features
            (4, 'Advanced machine learning models', 1),
            (4, 'Real-time data processing', 2),
            (4, 'Interactive dashboards', 3),
            (4, 'Automated report generation', 4),
            (4, 'API integration', 5),
            (4, 'Custom model training', 6),
            
            # VisionAI features
            (5, 'Object detection and tracking', 1),
            (5, 'Facial recognition system', 2),
            (5, 'Image classification', 3),
            (5, 'Custom model training', 4),
            (5, 'Real-time video analysis', 5),
            (5, 'Batch image processing', 6)
        ]
        
        for project_id, feature_text, feature_order in project_features:
            cursor.execute('''
                INSERT INTO project_features (project_id, feature_text, feature_order)
                VALUES (?, ?, ?)
            ''', (project_id, feature_text, feature_order))
        
        print("✅ Added project features")
        
        # Commit all changes
        conn.commit()
        
        # Verify the data
        cursor.execute('SELECT COUNT(*) FROM projects')
        project_count = cursor.fetchone()[0]
        print(f"\n✅ Successfully created projects database with {project_count} projects")
        
        # Show summary
        cursor.execute('SELECT id, title, category FROM projects ORDER BY id')
        projects = cursor.fetchall()
        print("\n📋 Projects created:")
        for project in projects:
            print(f"  ID {project[0]}: {project[1]} ({project[2]})")
        
        conn.close()
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    create_projects_tables()
