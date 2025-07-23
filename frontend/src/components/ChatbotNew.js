import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import PortfolioChatbot from './PortfolioChatbot';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        className="chatbot-toggle"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? '#ff4d4f' : '#1890ff'
        }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>

      {/* Portfolio Chatbot */}
      <PortfolioChatbot isOpen={isOpen} onClose={closeChatbot} />
    </>
  );
};

export default Chatbot;
