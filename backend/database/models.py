#!/usr/bin/env python3
"""
Database models and operations for Portfolio Website
"""

import sqlite3
import os
from datetime import datetime
from typing import List, Dict, Optional, Any

DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'portfolio.db')

class DatabaseManager:
    def __init__(self, db_path=DATABASE_PATH):
        self.db_path = db_path
        
    def get_connection(self):
        """Get database connection with foreign key support"""
        conn = sqlite3.connect(self.db_path)
        conn.execute("PRAGMA foreign_keys = ON")
        conn.row_factory = sqlite3.Row  # Enable dict-like access
        return conn
    
    def execute_query(self, query: str, params: tuple = ()) -> List[Dict]:
        """Execute a query and return results as list of dictionaries"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]
    
    def execute_update(self, query: str, params: tuple = ()) -> int:
        """Execute an update/insert query and return affected rows"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, params)
            conn.commit()
            return cursor.rowcount

class HackathonModel:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_hackathons(self) -> List[Dict]:
        """Get all hackathons with basic info"""
        query = '''
            SELECT 
                h.*,
                COUNT(DISTINCT tm.id) as team_size_actual,
                COUNT(DISTINCT pt.id) as timeline_count,
                COUNT(DISTINCT r.id) as awards_count
            FROM hackathons h
            LEFT JOIN team_members tm ON h.id = tm.hackathon_id
            LEFT JOIN project_timeline pt ON h.id = pt.hackathon_id
            LEFT JOIN recognition r ON h.id = r.hackathon_id
            GROUP BY h.id
            ORDER BY h.created_at DESC
        '''
        return self.db.execute_query(query)
    
    def get_hackathon_by_id(self, hackathon_id: int) -> Optional[Dict]:
        """Get detailed hackathon information by ID"""
        # Get basic hackathon info
        query = '''
            SELECT * FROM hackathons WHERE id = ?
        '''
        hackathons = self.db.execute_query(query, (hackathon_id,))
        
        if not hackathons:
            return None
        
        hackathon = hackathons[0]
        
        # Get technologies
        tech_query = '''
            SELECT t.* FROM technologies t
            JOIN hackathon_technologies ht ON t.id = ht.technology_id
            WHERE ht.hackathon_id = ?
        '''
        hackathon['technologies'] = self.db.execute_query(tech_query, (hackathon_id,))
        
        # Get team members
        team_query = '''
            SELECT * FROM team_members WHERE hackathon_id = ? ORDER BY name
        '''
        hackathon['team_members'] = self.db.execute_query(team_query, (hackathon_id,))
        
        # Get features
        features_query = '''
            SELECT * FROM project_features 
            WHERE hackathon_id = ? 
            ORDER BY feature_order
        '''
        hackathon['features'] = self.db.execute_query(features_query, (hackathon_id,))
        
        # Get timeline
        timeline_query = '''
            SELECT * FROM project_timeline 
            WHERE hackathon_id = ? 
            ORDER BY timeline_order
        '''
        hackathon['timeline'] = self.db.execute_query(timeline_query, (hackathon_id,))
        
        # Get recognition
        recognition_query = '''
            SELECT * FROM recognition 
            WHERE hackathon_id = ?
        '''
        hackathon['recognition'] = self.db.execute_query(recognition_query, (hackathon_id,))
        
        # Get gallery
        gallery_query = '''
            SELECT * FROM project_gallery 
            WHERE hackathon_id = ? 
            ORDER BY image_order, id
        '''
        hackathon['gallery'] = self.db.execute_query(gallery_query, (hackathon_id,))
        
        return hackathon
    
    def create_hackathon(self, data: Dict) -> int:
        """Create a new hackathon and return its ID"""
        query = '''
            INSERT INTO hackathons (
                title, event_name, description, position, start_date, end_date,
                team_size, location, prize_amount, project_url, github_url, demo_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        '''
        
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (
                data.get('title'),
                data.get('event_name'),
                data.get('description'),
                data.get('position'),
                data.get('start_date'),
                data.get('end_date'),
                data.get('team_size'),
                data.get('location'),
                data.get('prize_amount'),
                data.get('project_url'),
                data.get('github_url'),
                data.get('demo_url')
            ))
            conn.commit()
            return cursor.lastrowid
    
    def add_team_member(self, hackathon_id: int, member_data: Dict) -> int:
        """Add a team member to a hackathon"""
        query = '''
            INSERT INTO team_members (hackathon_id, name, role, linkedin_url, github_url, email)
            VALUES (?, ?, ?, ?, ?, ?)
        '''
        
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (
                hackathon_id,
                member_data.get('name'),
                member_data.get('role'),
                member_data.get('linkedin_url'),
                member_data.get('github_url'),
                member_data.get('email')
            ))
            conn.commit()
            return cursor.lastrowid
    
    def add_technology_to_hackathon(self, hackathon_id: int, technology_name: str) -> bool:
        """Link a technology to a hackathon"""
        # First get or create the technology
        tech_query = 'SELECT id FROM technologies WHERE name = ?'
        techs = self.db.execute_query(tech_query, (technology_name,))
        
        if not techs:
            # Create new technology
            create_tech_query = 'INSERT INTO technologies (name) VALUES (?)'
            with self.db.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(create_tech_query, (technology_name,))
                tech_id = cursor.lastrowid
                conn.commit()
        else:
            tech_id = techs[0]['id']
        
        # Link to hackathon
        link_query = '''
            INSERT OR IGNORE INTO hackathon_technologies (hackathon_id, technology_id)
            VALUES (?, ?)
        '''
        return self.db.execute_update(link_query, (hackathon_id, tech_id)) > 0

class TechnologyModel:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_technologies(self) -> List[Dict]:
        """Get all technologies"""
        query = 'SELECT * FROM technologies ORDER BY name'
        return self.db.execute_query(query)
    
    def get_popular_technologies(self, limit: int = 10) -> List[Dict]:
        """Get most used technologies"""
        query = '''
            SELECT t.*, COUNT(ht.hackathon_id) as usage_count
            FROM technologies t
            LEFT JOIN hackathon_technologies ht ON t.id = ht.technology_id
            GROUP BY t.id
            ORDER BY usage_count DESC, t.name
            LIMIT ?
        '''
        return self.db.execute_query(query, (limit,))

class UserModel:
    def __init__(self):
        self.db = DatabaseManager()
    
    def create_user(self, name: str, email: str, password_hash: str = None, google_id: str = None) -> int:
        """Create a new user"""
        query = '''
            INSERT INTO users (name, email, password_hash, google_id)
            VALUES (?, ?, ?, ?)
        '''
        
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (name, email, password_hash, google_id))
            conn.commit()
            return cursor.lastrowid
    
    def get_user_by_email(self, email: str) -> Optional[Dict]:
        """Get user by email"""
        query = 'SELECT * FROM users WHERE email = ?'
        users = self.db.execute_query(query, (email,))
        return users[0] if users else None
    
    def get_user_by_google_id(self, google_id: str) -> Optional[Dict]:
        """Get user by Google ID"""
        query = 'SELECT * FROM users WHERE google_id = ?'
        users = self.db.execute_query(query, (google_id,))
        return users[0] if users else None

class WorkExperienceModel:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_work_experiences(self) -> List[Dict]:
        """Get all work experiences with achievements and technologies"""
        query = '''
            SELECT * FROM work_experiences 
            ORDER BY is_current DESC, end_date DESC, start_date DESC
        '''
        work_experiences = self.db.execute_query(query)
        
        for work_exp in work_experiences:
            work_exp_id = work_exp['id']
            
            # Get achievements
            achievements_query = '''
                SELECT * FROM work_achievements 
                WHERE work_experience_id = ? 
                ORDER BY achievement_order
            '''
            work_exp['achievements'] = self.db.execute_query(achievements_query, (work_exp_id,))
            
            # Get technologies
            tech_query = '''
                SELECT t.* FROM technologies t
                JOIN work_experience_technologies wet ON t.id = wet.technology_id
                WHERE wet.work_experience_id = ?
            '''
            work_exp['technologies'] = self.db.execute_query(tech_query, (work_exp_id,))
        
        return work_experiences
    
    def get_work_experience_by_id(self, work_exp_id: int) -> Optional[Dict]:
        """Get detailed work experience by ID"""
        query = 'SELECT * FROM work_experiences WHERE id = ?'
        work_experiences = self.db.execute_query(query, (work_exp_id,))
        
        if not work_experiences:
            return None
        
        work_exp = work_experiences[0]
        
        # Get achievements
        achievements_query = '''
            SELECT * FROM work_achievements 
            WHERE work_experience_id = ? 
            ORDER BY achievement_order
        '''
        work_exp['achievements'] = self.db.execute_query(achievements_query, (work_exp_id,))
        
        # Get technologies
        tech_query = '''
            SELECT t.* FROM technologies t
            JOIN work_experience_technologies wet ON t.id = wet.technology_id
            WHERE wet.work_experience_id = ?
        '''
        work_exp['technologies'] = self.db.execute_query(tech_query, (work_exp_id,))
        
        return work_exp
    
    def create_work_experience(self, data: Dict) -> int:
        """Create a new work experience"""
        query = '''
            INSERT INTO work_experiences (
                company_name, position, location, employment_type, start_date, end_date,
                is_current, description, company_logo, company_website
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        '''
        
        with self.db.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (
                data.get('company_name'),
                data.get('position'),
                data.get('location'),
                data.get('employment_type'),
                data.get('start_date'),
                data.get('end_date'),
                data.get('is_current', False),
                data.get('description'),
                data.get('company_logo'),
                data.get('company_website')
            ))
            conn.commit()
            return cursor.lastrowid

class EducationModel:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_education(self) -> List[Dict]:
        """Get all education records"""
        query = '''
            SELECT * FROM education 
            ORDER BY end_date DESC, start_date DESC
        '''
        return self.db.execute_query(query)
    
    def get_education_by_id(self, edu_id: int) -> Optional[Dict]:
        """Get education by ID"""
        query = 'SELECT * FROM education WHERE id = ?'
        education = self.db.execute_query(query, (edu_id,))
        return education[0] if education else None

class SkillModel:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_skills(self) -> List[Dict]:
        """Get all skills grouped by category"""
        query = '''
            SELECT * FROM skills 
            ORDER BY category, proficiency_level DESC, skill_name
        '''
        return self.db.execute_query(query)
    
    def get_skills_by_category(self) -> Dict[str, List[Dict]]:
        """Get skills grouped by category"""
        skills = self.get_all_skills()
        categorized_skills = {}
        
        for skill in skills:
            category = skill.get('category', 'Other')
            if category not in categorized_skills:
                categorized_skills[category] = []
            categorized_skills[category].append(skill)
        
        return categorized_skills

class ProjectModel:
    def __init__(self):
        self.db = DatabaseManager()
    
    def get_all_projects(self) -> List[Dict]:
        """Get all projects with basic info"""
        query = '''
            SELECT 
                p.*,
                COUNT(DISTINCT pt.id) as technology_count,
                COUNT(DISTINCT pf.id) as feature_count
            FROM projects p
            LEFT JOIN project_technologies pt ON p.id = pt.project_id
            LEFT JOIN project_features pf ON p.id = pf.project_id
            GROUP BY p.id
            ORDER BY p.featured DESC, p.created_at DESC
        '''
        return self.db.execute_query(query)
    
    def get_project_by_id(self, project_id: int) -> Optional[Dict]:
        """Get detailed project information by ID"""
        # Get basic project info
        query = '''
            SELECT * FROM projects WHERE id = ?
        '''
        projects = self.db.execute_query(query, (project_id,))
        
        if not projects:
            return None
        
        project = projects[0]
        
        # Get technologies
        tech_query = '''
            SELECT t.* FROM technologies t
            JOIN project_technologies pt ON t.id = pt.technology_id
            WHERE pt.project_id = ?
        '''
        project['technologies'] = self.db.execute_query(tech_query, (project_id,))
        
        # Get features
        features_query = '''
            SELECT * FROM project_features 
            WHERE project_id = ? 
            ORDER BY feature_order
        '''
        project['features'] = self.db.execute_query(features_query, (project_id,))
        
        # Get gallery
        gallery_query = '''
            SELECT * FROM project_gallery 
            WHERE project_id = ? 
            ORDER BY image_order, id
        '''
        project['gallery'] = self.db.execute_query(gallery_query, (project_id,))
        
        return project
    
    def get_projects_by_category(self, category: str) -> List[Dict]:
        """Get projects by category"""
        query = '''
            SELECT * FROM projects 
            WHERE category = ? 
            ORDER BY featured DESC, created_at DESC
        '''
        return self.db.execute_query(query, (category,))
    
    def get_featured_projects(self, limit: int = 3) -> List[Dict]:
        """Get featured projects"""
        query = '''
            SELECT * FROM projects 
            WHERE featured = 1 
            ORDER BY created_at DESC 
            LIMIT ?
        '''
        return self.db.execute_query(query, (limit,))
