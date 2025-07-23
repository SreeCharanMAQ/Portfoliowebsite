// API service for chatbot backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const chatService = {
  async sendMessage(question) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          answer: data.answer,
          images: data.images || [],
          relevant_sections: data.relevant_sections || []
        }
      };
    } catch (error) {
      console.error('Error sending message to backend:', error);
      return {
        success: false,
        error: error.message || 'Failed to communicate with server'
      };
    }
  },

  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
};

export default chatService;
