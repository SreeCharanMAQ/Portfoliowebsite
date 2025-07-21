# Portfolio Website
df 
A modern, responsive portfolio website built with React frontend and Python Flask backend. Features beautiful animations, dark/light theme toggle, and a professional design.

## 🚀 Features

- **Modern Design**: Clean, professional layout with beautiful animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Single Page Application**: Smooth scrolling navigation between sections
- **Interactive Animations**: Framer Motion animations throughout
- **Contact Form**: Working contact form with backend integration
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Tech Stack

### Frontend
- React 18
- Framer Motion (animations)
- React Icons
- CSS3 with custom properties
- Responsive design

### Backend
- Python Flask
- Flask-Mail (contact form)
- Flask-CORS
- Environment configuration

## 📁 Project Structure

```
Portfoliowebsite/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Hero.js
│   │   │   ├── About.js
│   │   │   ├── Skills.js
│   │   │   ├── Experience.js
│   │   │   ├── Projects.js
│   │   │   ├── Education.js
│   │   │   ├── Contact.js
│   │   │   └── ...
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.7 or higher)
- Git

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create environment file:
```bash
cp .env.example .env
```

6. Update the `.env` file with your email configuration

7. Start the Flask server:
```bash
python app.py
```

The backend will be available at `http://localhost:5000`

## 📧 Email Configuration

To enable the contact form, configure your email settings in the `.env` file:

1. Use Gmail SMTP settings
2. Generate an App Password for your Gmail account
3. Update the environment variables with your credentials

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `frontend/src/components/Hero.js` - Name, title, description
- `frontend/src/components/About.js` - About section content
- `frontend/src/components/Experience.js` - Work experience
- `frontend/src/components/Projects.js` - Your projects
- `frontend/src/components/Education.js` - Education and certifications
- `frontend/src/components/Contact.js` - Contact information

### Styling
- Global styles: `frontend/src/App.css`
- Component styles: Individual CSS files for each component
- Theme colors: CSS custom properties in `App.css`

### Images
Replace placeholder images with your actual photos:
- Professional photo in Hero and About sections
- Project screenshots in Projects section

## 🌐 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting platform

### Backend (Heroku/Railway)
1. Add a `Procfile` with: `web: gunicorn app:app`
2. Deploy to your cloud platform
3. Update frontend API URLs to point to your backend

## 📱 Sections Included

1. **Hero/Landing**: Introduction with animated background
2. **About**: Personal information and highlights
3. **Skills**: Technical skills with progress bars
4. **Experience**: Work experience timeline
5. **Projects**: Portfolio projects showcase
6. **Education**: Education and certifications
7. **Contact**: Contact form and information

## 🔧 Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend
- `python app.py` - Start Flask development server
- `pip install -r requirements.txt` - Install dependencies

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

K Sree Charan - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/SreeCharanMAQ/Portfoliowebsite](https://github.com/SreeCharanMAQ/Portfoliowebsite)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [Flask](https://flask.palletsprojects.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Font: [Poppins](https://fonts.google.com/specimen/Poppins)