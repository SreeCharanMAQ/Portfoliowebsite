# K Sree Charan Portfolio Chatbot API

A RAG-powered chatbot API built with FastAPI and Google Gemini AI that provides intelligent responses about K Sree Charan's portfolio, including hackathons, projects, skills, and experience.

## Features

- 🤖 **RAG-based Chatbot**: Retrieval Augmented Generation using portfolio data
- 🔍 **Smart Search**: Automatically finds relevant information from portfolio
- 🖼️ **Image Integration**: Returns relevant images for hackathons and projects  
- 📊 **Swagger UI**: Interactive API documentation
- ⚡ **FastAPI**: High-performance async API framework
- 🧠 **Google Gemini AI**: Advanced language model for intelligent responses

## Quick Start

### 1. Install Dependencies

```bash
cd backend/backend
pip install -r requirements.txt
```

### 2. Set up Google API Key

1. Get your Google API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the `backend/backend` directory:

```env
GOOGLE_API_KEY=your_actual_google_api_key_here
```

### 3. Run the Server

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 4. Access the API

- **Swagger UI**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Chat Endpoint**: POST http://localhost:8000/chat

## API Usage

### Chat Endpoint

**POST** `/chat`

```json
{
  "question": "Tell me about K Sree Charan's hackathons"
}
```

**Response:**
```json
{
  "answer": "K Sree Charan has participated in several hackathons...",
  "images": ["/photo/devfest/1.jpg", "/photo/arena/main.jpg"],
  "relevant_sections": ["hackathons"]
}
```

### Sample Questions

- "What are K Sree Charan's skills?"
- "Tell me about his hackathon achievements"
- "What projects has he worked on?"
- "What is his experience at MAQ Software?"
- "Show me images from DevFest hackathon"

## Project Structure

```
backend/backend/
├── app.py                           # Main FastAPI application
├── requirements.txt                 # Python dependencies
├── .env                            # Environment variables (create this)
├── .env.template                   # Environment template
└── k_sree_charan_complete_portfolio.json  # Portfolio data
```

## Key Features

### 1. Intelligent Search
The chatbot uses keyword matching and semantic understanding to find relevant information from:
- Basic information (name, title, summary)
- Contact details
- Technical and soft skills
- Work experience
- Education
- Hackathon achievements
- Project portfolio
- Certifications

### 2. Image Integration
Automatically returns relevant images for:
- **Hackathons**: DevFest, Arena, Microsoft, Code-of-Duty, etc.
- **Projects**: Study Buddy, Health Buddy, AgriVision, etc.

### 3. Smart Folder Mapping
```python
folder_mappings = {
    'devfest': 'devfest',
    'arena': 'arena',
    'microsoft': 'microsoft',
    'study-buddy': 'study-buddy',
    'health-buddy': 'health-buddy',
    'agrivision': 'agrivision',
    # ... more mappings
}
```

## Error Handling

The API includes comprehensive error handling:
- Invalid API key detection
- Missing portfolio data fallback
- Directory mounting error recovery
- Graceful degradation when services are unavailable

## Development

### Adding New Data
Update the `k_sree_charan_complete_portfolio.json` file with new:
- Hackathons
- Projects
- Experience
- Skills
- Certifications

### Extending Functionality
- Add new search keywords in `search_portfolio_data()`
- Update folder mappings for new image categories
- Enhance the prompt engineering in `generate_response_with_gemini()`

## Production Deployment

1. Set environment variables securely
2. Use production ASGI server (e.g., Gunicorn with Uvicorn workers)
3. Configure proper CORS settings
4. Set up SSL/TLS certificates
5. Implement rate limiting and authentication if needed

## Dependencies

- **FastAPI**: Web framework
- **Uvicorn**: ASGI server
- **Google Generative AI**: LLM integration
- **Python-dotenv**: Environment variable management
- **Pydantic**: Data validation

## Troubleshooting

### Common Issues

1. **"Portfolio data not loaded"**
   - Check if `k_sree_charan_complete_portfolio.json` exists
   - Verify file permissions

2. **"API key not valid"**
   - Ensure you have a valid Google API key
   - Check `.env` file configuration

3. **"Directory does not exist"**
   - Image directories are optional
   - Server will use fallback temporary directories

## Support

For issues or questions, please check:
1. Server logs for detailed error messages
2. Health endpoint: `/health`
3. API documentation: `/docs`

## License

This project is for educational and portfolio demonstration purposes.
