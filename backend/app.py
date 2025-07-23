from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import logging
from datetime import datetime
from auth import AuthManager, token_required
from chatbot import portfolio_chatbot
from database.models import HackathonModel, TechnologyModel, UserModel, WorkExperienceModel, EducationModel, SkillModel, ProjectModel

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app, origins=['http://localhost:3000'])

# Configure Flask-Mail
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

# Initialize authentication
auth_manager = AuthManager(app)

# Initialize database models
hackathon_model = HackathonModel()
tech_model = TechnologyModel()
user_model = UserModel()
work_experience_model = WorkExperienceModel()
education_model = EducationModel()
skill_model = SkillModel()
project_model = ProjectModel()

mail = Mail(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def home():
    """Home route"""
    return jsonify({
        'message': 'Portfolio Backend API',
        'version': '1.0.0',
        'status': 'running',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat()
    })

# Authentication Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        result, status_code = auth_manager.register_user(
            data['email'], 
            data['password'], 
            data['name']
        )
        
        return jsonify({'success': status_code == 201, **result}), status_code
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Registration failed'
        }), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user with email and password"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        result, status_code = auth_manager.login_user(
            data['email'], 
            data['password']
        )
        
        return jsonify({'success': status_code == 200, **result}), status_code
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Login failed'
        }), 500

@app.route('/api/auth/google', methods=['POST'])
def google_login():
    """Login user with Google OAuth"""
    try:
        data = request.get_json()
        
        if not data.get('token'):
            return jsonify({
                'success': False,
                'error': 'Missing Google token'
            }), 400
        
        result, status_code = auth_manager.google_login(data['token'])
        
        return jsonify({'success': status_code == 200, **result}), status_code
        
    except Exception as e:
        logger.error(f"Google login error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Google login failed'
        }), 500

@app.route('/api/auth/me', methods=['GET'])
@token_required
def get_current_user(current_user_id):
    """Get current user info"""
    try:
        user = auth_manager.get_user_by_id(current_user_id)
        
        if not user:
            return jsonify({
                'success': False,
                'error': 'User not found'
            }), 404
        
        return jsonify({
            'success': True,
            'user': user
        }), 200
        
    except Exception as e:
        logger.error(f"Get user error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to get user info'
        }), 500

# Chatbot Routes
@app.route('/api/chatbot/message', methods=['POST'])
def chatbot_message():
    """Handle chatbot messages"""
    try:
        data = request.get_json()
        
        if not data.get('message'):
            return jsonify({
                'success': False,
                'error': 'Message is required'
            }), 400
        
        # Get response from RAG chatbot
        response_data = portfolio_chatbot.get_response(data['message'])
        
        return jsonify({
            'success': True,
            'response': response_data['response'],
            'sources': response_data['sources'],
            'confidence': response_data['confidence'],
            'timestamp': datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        logger.error(f"Chatbot error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to process message',
            'response': "I'm sorry, I'm having trouble processing your message right now. Please try again later."
        }), 500

@app.route('/api/chatbot/health', methods=['GET'])
def chatbot_health():
    """Check chatbot health status"""
    try:
        # Test the chatbot with a simple query
        test_response = portfolio_chatbot.get_response("Hello")
        
        return jsonify({
            'success': True,
            'status': 'healthy',
            'message': 'Chatbot is operational',
            'knowledge_base_loaded': portfolio_chatbot.vectorstore is not None
        }), 200
        
    except Exception as e:
        logger.error(f"Chatbot health check error: {str(e)}")
        return jsonify({
            'success': False,
            'status': 'unhealthy',
            'error': str(e)
        }), 500

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Extract form data
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        
        # Create email message
        msg = Message(
            subject=f'Portfolio Contact: {subject}',
            recipients=[os.getenv('RECIPIENT_EMAIL', 'your-email@example.com')],
            reply_to=email
        )
        
        # Email body
        msg.body = f"""
        New message from portfolio website:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        
        Sent at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        msg.html = f"""
        <h2>New Portfolio Contact Message</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <hr>
        <h3>Message:</h3>
        <p>{message.replace(chr(10), '<br>')}</p>
        <hr>
        <p><small>Sent at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</small></p>
        """
        
        # Send email
        mail.send(msg)
        
        # Log the contact submission
        logger.info(f'Contact form submission from {name} ({email})')
        
        return jsonify({
            'success': True,
            'message': 'Message sent successfully!'
        })
        
    except Exception as e:
        logger.error(f'Error sending contact email: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Failed to send message. Please try again later.'
        }), 500

@app.route('/api/projects')
def get_projects():
    """Get all projects from database"""
    try:
        projects = project_model.get_all_projects()
        
        return jsonify({
            'success': True,
            'projects': projects,
            'count': len(projects)
        })
        
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch projects'
        }), 500

# Hackathon API Routes
@app.route('/api/hackathons', methods=['GET'])
def get_hackathons():
    """Get all hackathons"""
    try:
        hackathon_model = HackathonModel()
        hackathons = hackathon_model.get_all_hackathons()
        
        return jsonify({
            'success': True,
            'hackathons': hackathons,
            'count': len(hackathons)
        })
        
    except Exception as e:
        logger.error(f"Error fetching hackathons: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch hackathons'
        }), 500

@app.route('/api/hackathons/<int:hackathon_id>', methods=['GET'])
def get_hackathon_detail(hackathon_id):
    """Get detailed hackathon information"""
    try:
        hackathon_model = HackathonModel()
        hackathon = hackathon_model.get_hackathon_by_id(hackathon_id)
        
        if not hackathon:
            return jsonify({
                'success': False,
                'error': 'Hackathon not found'
            }), 404
        
        return jsonify({
            'success': True,
            'hackathon': hackathon
        })
        
    except Exception as e:
        logger.error(f"Error fetching hackathon {hackathon_id}: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch hackathon details'
        }), 500

@app.route('/api/hackathons', methods=['POST'])
@token_required
def create_hackathon():
    """Create a new hackathon (protected route)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'event_name', 'description']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        hackathon_model = HackathonModel()
        hackathon_id = hackathon_model.create_hackathon(data)
        
        # Add technologies if provided
        if data.get('technologies'):
            for tech_name in data['technologies']:
                hackathon_model.add_technology_to_hackathon(hackathon_id, tech_name)
        
        # Add team members if provided
        if data.get('team_members'):
            for member in data['team_members']:
                hackathon_model.add_team_member(hackathon_id, member)
        
        return jsonify({
            'success': True,
            'hackathon_id': hackathon_id,
            'message': 'Hackathon created successfully'
        }), 201
        
    except Exception as e:
        logger.error(f"Error creating hackathon: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to create hackathon'
        }), 500

@app.route('/api/technologies', methods=['GET'])
def get_technologies():
    """Get all technologies"""
    try:
        tech_model = TechnologyModel()
        
        # Check if requesting popular technologies
        popular_only = request.args.get('popular', 'false').lower() == 'true'
        limit = int(request.args.get('limit', 10))
        
        if popular_only:
            technologies = tech_model.get_popular_technologies(limit)
        else:
            technologies = tech_model.get_all_technologies()
        
        return jsonify({
            'success': True,
            'technologies': technologies,
            'count': len(technologies)
        })
        
    except Exception as e:
        logger.error(f"Error fetching technologies: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch technologies'
        }), 500

@app.route('/api/hackathons/search', methods=['GET'])
def search_hackathons():
    """Search hackathons by title or technology"""
    try:
        query = request.args.get('q', '').strip()
        technology = request.args.get('tech', '').strip()
        
        if not query and not technology:
            return jsonify({
                'success': False,
                'error': 'Search query or technology filter required'
            }), 400
        
        hackathon_model = HackathonModel()
        # This would need to be implemented in the model
        # For now, return all hackathons as a placeholder
        hackathons = hackathon_model.get_all_hackathons()
        
        # Simple filtering (you can enhance this)
        if query:
            hackathons = [h for h in hackathons if query.lower() in h['title'].lower() or query.lower() in h['description'].lower()]
        
        return jsonify({
            'success': True,
            'hackathons': hackathons,
            'count': len(hackathons),
            'query': query,
            'technology': technology
        })
        
    except Exception as e:
        logger.error(f"Error searching hackathons: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Search failed'
        }), 500

# Additional Project API Routes
@app.route('/api/projects/<int:project_id>', methods=['GET'])
def get_project_detail(project_id):
    """Get detailed project information"""
    try:
        project = project_model.get_project_by_id(project_id)
        
        if not project:
            return jsonify({
                'success': False,
                'error': 'Project not found'
            }), 404
        
        return jsonify({
            'success': True,
            'project': project
        })
        
    except Exception as e:
        logger.error(f"Error fetching project {project_id}: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch project details'
        }), 500

@app.route('/api/projects/category/<category>', methods=['GET'])
def get_projects_by_category(category):
    """Get projects by category"""
    try:
        projects = project_model.get_projects_by_category(category)
        
        return jsonify({
            'success': True,
            'projects': projects,
            'count': len(projects),
            'category': category
        })
        
    except Exception as e:
        logger.error(f"Error fetching projects for category {category}: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch projects'
        }), 500

@app.route('/api/projects/featured', methods=['GET'])
def get_featured_projects():
    """Get featured projects"""
    try:
        limit = request.args.get('limit', 3, type=int)
        projects = project_model.get_featured_projects(limit)
        
        return jsonify({
            'success': True,
            'projects': projects,
            'count': len(projects)
        })
        
    except Exception as e:
        logger.error(f"Error fetching featured projects: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch featured projects'
        }), 500

# Work Experience API Routes
@app.route('/api/work-experience', methods=['GET'])
def get_work_experiences():
    """Get all work experiences"""
    try:
        work_experiences = work_experience_model.get_all_work_experiences()
        
        return jsonify({
            'success': True,
            'work_experiences': work_experiences,
            'count': len(work_experiences)
        })
        
    except Exception as e:
        logger.error(f"Error fetching work experiences: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch work experiences'
        }), 500

@app.route('/api/work-experience/<int:work_exp_id>', methods=['GET'])
def get_work_experience_detail(work_exp_id):
    """Get detailed work experience information"""
    try:
        work_exp = work_experience_model.get_work_experience_by_id(work_exp_id)
        
        if not work_exp:
            return jsonify({
                'success': False,
                'error': 'Work experience not found'
            }), 404
        
        return jsonify({
            'success': True,
            'work_experience': work_exp
        })
        
    except Exception as e:
        logger.error(f"Error fetching work experience {work_exp_id}: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch work experience details'
        }), 500

@app.route('/api/work-experience', methods=['POST'])
@token_required
def create_work_experience():
    """Create a new work experience (protected route)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['company_name', 'position', 'start_date']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        work_exp_id = work_experience_model.create_work_experience(data)
        
        return jsonify({
            'success': True,
            'work_experience_id': work_exp_id,
            'message': 'Work experience created successfully'
        }), 201
        
    except Exception as e:
        logger.error(f"Error creating work experience: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to create work experience'
        }), 500

# Education API Routes
@app.route('/api/education', methods=['GET'])
def get_education():
    """Get all education records"""
    try:
        education = education_model.get_all_education()
        
        return jsonify({
            'success': True,
            'education': education,
            'count': len(education)
        })
        
    except Exception as e:
        logger.error(f"Error fetching education: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch education records'
        }), 500

# Skills API Routes
@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Get all skills"""
    try:
        # Check if requesting categorized skills
        categorized = request.args.get('categorized', 'false').lower() == 'true'
        
        if categorized:
            skills = skill_model.get_skills_by_category()
        else:
            skills = skill_model.get_all_skills()
        
        return jsonify({
            'success': True,
            'skills': skills,
            'count': len(skills) if not categorized else sum(len(cat_skills) for cat_skills in skills.values()) if isinstance(skills, dict) else len(skills)
        })
        
    except Exception as e:
        logger.error(f"Error fetching skills: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to fetch skills'
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
