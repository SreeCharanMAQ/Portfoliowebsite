# Quick Start Guide

## 🚀 Getting Started Quickly

### Option 1: Using Setup Scripts

**Windows:**
```bash
# Run the setup script
setup.bat

# Start development servers
start-dev.bat
```

**macOS/Linux:**
```bash
# Make script executable and run setup
chmod +x setup.sh
./setup.sh

# Start development servers  
cd frontend && npm start &
cd backend && source venv/bin/activate && python app.py
```

### Option 2: Manual Setup

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

**Backend Setup:**
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux  
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env with your email settings
python app.py
```

## 📧 Email Configuration

1. Go to your Gmail settings
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Update the `.env` file in the backend folder:

```env
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

## 🎨 Customization

Replace the placeholder content in these files:
- `frontend/src/components/Hero.js` - Your name, title, social links
- `frontend/src/components/About.js` - About section content
- `frontend/src/components/Experience.js` - Work experience
- `frontend/src/components/Projects.js` - Your projects
- `frontend/src/components/Education.js` - Education info
- `frontend/src/components/Contact.js` - Contact details

## 🌐 Access

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔧 Common Issues

1. **Particle animation not working**: Clear browser cache
2. **Contact form not sending**: Check email configuration
3. **CSS not loading**: Ensure all CSS files are properly imported
4. **Build errors**: Run `npm install` again in frontend folder

## 📱 Features Working

✅ Responsive design
✅ Dark/Light theme toggle  
✅ Smooth scrolling navigation
✅ Animated components
✅ Contact form with backend
✅ Particle background effects
✅ Typing animation
✅ Professional sections layout
