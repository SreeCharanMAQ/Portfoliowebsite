import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, Typography, Image, Spin, Row, Col, Alert, Card } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined, CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import chatService from '../services/chatService';
import './PortfolioChatbot.css';

const { Text, Paragraph, Title } = Typography;

const PortfolioChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Hi! I'm Sree Charan's AI portfolio assistant. 🤖 I can help you learn about his background, skills, projects, and achievements!`,
      timestamp: new Date(),
      suggestions: [
        "Tell me about your skills",
        "Show me your projects", 
        "What hackathons have you won?",
        "Tell me about your experience",
        "Show me your education background"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "end",
        inline: "nearest" 
      });
    }
  };

  useEffect(() => {
    // Add a small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  // Check backend connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      const isHealthy = await chatService.healthCheck();
      setIsConnected(isHealthy);
      if (!isHealthy) {
        setError("Unable to connect to backend server. Please ensure the backend is running.");
      }
    };
    
    checkConnection();
  }, []);

  const addMessage = (message) => {
    setMessages(prev => [...prev, {
      ...message,
      id: prev.length + 1,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userQuery = inputValue.trim();
    setInputValue('');
    setError(null);

    // Add user message immediately
    addMessage({
      type: 'user',
      text: userQuery
    });

    setIsTyping(true);

    try {
      // Call backend API
      const result = await chatService.sendMessage(userQuery);
      
      if (result.success) {
        // Add bot response with images if available
        addMessage({
          type: 'bot',
          text: result.data.answer,
          images: result.data.images,
          relevant_sections: result.data.relevant_sections
        });
        setIsConnected(true);
      } else {
        // Handle API error
        addMessage({
          type: 'bot',
          text: `I apologize, but I encountered an error: ${result.error}. Please try again or contact support if the issue persists.`,
          isError: true
        });
        setError(result.error);
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        type: 'bot',
        text: "I'm sorry, I'm experiencing technical difficulties. Please try again in a moment.",
        isError: true
      });
      setError("Connection error");
      setIsConnected(false);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setError(null);
    
    // Add user message
    addMessage({
      type: 'user',
      text: suggestion
    });

    setIsTyping(true);

    try {
      const result = await chatService.sendMessage(suggestion);
      
      if (result.success) {
        addMessage({
          type: 'bot',
          text: result.data.answer,
          images: result.data.images,
          relevant_sections: result.data.relevant_sections
        });
        setIsConnected(true);
      } else {
        addMessage({
          type: 'bot',
          text: `I apologize, but I encountered an error: ${result.error}`,
          isError: true
        });
        setError(result.error);
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        type: 'bot',
        text: "I'm sorry, I'm experiencing technical difficulties. Please try again in a moment.",
        isError: true
      });
      setError("Connection error");
      setIsConnected(false);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderImages = (images) => {
    if (!images || images.length === 0) return null;

    return (
      <div className="message-images" style={{ marginTop: 12 }}>
        <Text strong>Related Images:</Text>
        <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
          {images.slice(0, 6).map((imagePath, index) => (
            <Col span={8} key={index}>
              <div className="image-container">
                <Image
                  src={`http://localhost:8000${imagePath}`}
                  alt={`Portfolio image ${index + 1}`}
                  width="100%"
                  height={80}
                  style={{ objectFit: 'cover', borderRadius: 4 }}
                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN4BMYCHuFTYjNqSLhOIAlV2HhIpewMm6WSwBJFiHBhMQkPJ2P7rPyMhHRGZJsKrYl0z+2LXv7+9e++++59U4w8A==;"
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-title">
            <Avatar icon={<RobotOutlined />} size="small" />
            <Text strong style={{ marginLeft: 8 }}>
              Portfolio Assistant 
              {!isConnected && <Text type="warning" style={{ marginLeft: 8 }}>(Offline)</Text>}
            </Text>
          </div>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={onClose}
            className="close-button"
          />
        </div>

        {error && (
          <Alert
            message="Connection Error"
            description={error}
            type="warning"
            showIcon
            style={{ margin: '8px 16px' }}
          />
        )}

        <div className="chatbot-messages">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-avatar">
                <Avatar 
                  icon={message.type === 'bot' ? <RobotOutlined /> : <UserOutlined />}
                  size="small"
                />
              </div>
              <div className="message-content">
                <div className={`message-text ${message.isError ? 'error-message' : ''}`}>
                  {message.text}
                </div>
                
                {/* Render images from backend */}
                {message.images && renderImages(message.images)}
                
                {/* Render relevant sections if available */}
                {message.relevant_sections && message.relevant_sections.length > 0 && (
                  <div className="relevant-sections" style={{ marginTop: 8 }}>
                    <Text strong>Related sections:</Text>
                    <div style={{ marginTop: 4 }}>
                      {message.relevant_sections.map((section, index) => (
                        <Text key={index} type="secondary" style={{ fontSize: '11px', marginRight: 8 }}>
                          {section}
                        </Text>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Render suggestions for first message */}
                {message.suggestions && (
                  <div className="message-suggestions">
                    {message.suggestions.map((suggestion, index) => (
                      <Button 
                        key={index}
                        size="small"
                        type="default"
                        className="suggestion-button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={isTyping || !isConnected}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <Avatar icon={<RobotOutlined />} size="small" />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <Spin size="small" />
                  <Text style={{ marginLeft: 8 }}>Thinking...</Text>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Ask me anything about Sree's portfolio... 💬" : "Backend is offline..."}
            disabled={isTyping || !isConnected}
            suffix={
              <Button 
                type="primary" 
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping || !isConnected}
                loading={isTyping}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioChatbot;
