from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import logging
from datetime import datetime

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
    """Get portfolio projects"""
    projects = [
        {
            'id': 1,
            'title': 'E-Commerce Platform',
            'description': 'A full-stack e-commerce application with React frontend and Python Flask backend.',
            'technologies': ['React', 'Flask', 'MongoDB', 'Stripe API', 'JWT'],
            'github': 'https://github.com/example/ecommerce',
            'live': 'https://example-ecommerce.com',
            'category': 'Full Stack',
            'featured': True
        },
        {
            'id': 2,
            'title': 'Task Management App',
            'description': 'A collaborative task management application with real-time updates.',
            'technologies': ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redux'],
            'github': 'https://github.com/example/taskmanager',
            'live': 'https://example-tasks.com',
            'category': 'Web App',
            'featured': True
        },
        # Add more projects as needed
    ]
    
    return jsonify({
        'success': True,
        'projects': projects
    })

@app.route('/api/resume')
def get_resume():
    """Get resume data"""
    resume_data = {
        'personal_info': {
            'name': 'K Sree Charan',
            'title': 'Full Stack Developer',
            'email': 'sreecharan@example.com',
            'phone': '+91 12345 67890',
            'location': 'Hyderabad, India',
            'linkedin': 'https://linkedin.com/in/sreecharan',
            'github': 'https://github.com/SreeCharanMAQ'
        },
        'summary': 'Passionate Full Stack Developer with 2+ years of experience in building modern web applications using React, Python, and cloud technologies.',
        'skills': {
            'frontend': ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
            'backend': ['Python', 'Flask', 'Node.js', 'Express.js', 'REST APIs'],
            'database': ['MongoDB', 'PostgreSQL', 'MySQL'],
            'tools': ['Git', 'Docker', 'AWS', 'Firebase', 'Jest']
        },
        'experience': [
            {
                'title': 'Full Stack Developer',
                'company': 'MAQ Software',
                'location': 'Hyderabad, India',
                'duration': '2023 - Present',
                'responsibilities': [
                    'Developed and maintained React-based web applications',
                    'Built scalable backend APIs using Python Flask',
                    'Collaborated with cross-functional teams',
                    'Optimized application performance'
                ]
            }
        ],
        'education': [
            {
                'degree': 'Bachelor of Technology',
                'field': 'Computer Science Engineering',
                'institution': 'Your University',
                'year': '2023',
                'gpa': '8.5/10'
            }
        ]
    }
    
    return jsonify({
        'success': True,
        'resume': resume_data
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
