import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff, FiVolume2, FiVolumeX } from 'react-icons/fi';
import './VoiceNavigation.css';

// Navigation mapping - moved outside component to avoid dependency issues
const NAVIGATION_COMMANDS = {
  home: ['home', 'beginning', 'start', 'top'],
  about: ['about', 'about me', 'bio', 'biography', 'introduction'],
  skills: ['skills', 'technologies', 'tech stack', 'abilities', 'capabilities'],
  experience: ['experience', 'work', 'career', 'job', 'employment'],
  projects: ['projects', 'work', 'portfolio', 'creations', 'builds'],
  education: ['education', 'study', 'learning', 'school', 'university'],
  contact: ['contact', 'reach', 'email', 'message', 'get in touch']
};

const VoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  const showFeedbackMessage = useCallback((message, type = 'info') => {
    setFeedbackMessage(message);
    setShowFeedback(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  }, []);

  const speak = useCallback((text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const navigateToSection = useCallback((section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showFeedbackMessage(`Navigated to ${section.charAt(0).toUpperCase() + section.slice(1)} section`, 'success');
      speak(`Navigating to ${section} section`);
    } else {
      showFeedbackMessage(`Section "${section}" not found`, 'error');
      speak(`Section ${section} not found`);
    }
  }, [showFeedbackMessage, speak]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const processVoiceCommand = useCallback((command) => {
    let matchedSection = null;
    
    for (const [section, keywords] of Object.entries(NAVIGATION_COMMANDS)) {
      for (const keyword of keywords) {
        if (command.includes(keyword)) {
          matchedSection = section;
          break;
        }
      }
      if (matchedSection) break;
    }

    if (matchedSection) {
      navigateToSection(matchedSection);
    } else {
      if (command.includes('scroll up') || command.includes('go up')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showFeedbackMessage('Scrolled to top', 'success');
        speak('Scrolled to top');
      } else if (command.includes('scroll down') || command.includes('go down')) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        showFeedbackMessage('Scrolled to bottom', 'success');
        speak('Scrolled to bottom');
      } else {
        showFeedbackMessage(`Command "${command}" not recognized. Try saying: "Go to about", "Show projects", "Contact section"`, 'warning');
        speak('Command not recognized. Try saying go to about, show projects, or contact section');
      }
    }

    stopListening();
  }, [navigateToSection, showFeedbackMessage, speak, stopListening]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        showFeedbackMessage('Listening... Speak a command!', 'info');
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setConfidence(event.results[i][0].confidence);
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          processVoiceCommand(finalTranscript.toLowerCase().trim());
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        showFeedbackMessage(`Error: ${event.error}`, 'error');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setIsSupported(true);
    } else {
      setIsSupported(false);
      showFeedbackMessage('Voice navigation not supported in this browser', 'error');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [processVoiceCommand, showFeedbackMessage]);

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        showFeedbackMessage('Could not start voice recognition', 'error');
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="voice-navigation">
      <motion.button
        className={`voice-button ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          scale: isListening ? [1, 1.1, 1] : 1,
          boxShadow: isListening 
            ? ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 10px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0.4)']
            : '0 0 0 0 rgba(59, 130, 246, 0.4)'
        }}
        transition={{
          scale: { duration: 1, repeat: isListening ? Infinity : 0 },
          boxShadow: { duration: 1, repeat: isListening ? Infinity : 0 }
        }}
        title={isListening ? 'Stop listening' : 'Start voice navigation'}
      >
        {isListening ? <FiMicOff /> : <FiMic />}
      </motion.button>

      <motion.button
        className="voice-feedback-toggle"
        onClick={toggleVoice}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={voiceEnabled ? 'Disable voice feedback' : 'Enable voice feedback'}
      >
        {voiceEnabled ? <FiVolume2 /> : <FiVolumeX />}
      </motion.button>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className={`voice-feedback ${feedbackMessage.includes('Error') ? 'error' : 
                       feedbackMessage.includes('not recognized') ? 'warning' : 'success'}`}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {feedbackMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {isListening && transcript && (
        <motion.div
          className="voice-transcript"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="transcript-text">"{transcript}"</div>
          {confidence > 0 && (
            <div className="confidence-bar">
              <div 
                className="confidence-fill" 
                style={{ width: `${confidence * 100}%` }}
              ></div>
            </div>
          )}
        </motion.div>
      )}

      {isListening && (
        <motion.div
          className="voice-help"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="help-title">Try saying:</div>
          <div className="help-commands">
            <span>"Go to About"</span>
            <span>"Show Projects"</span>
            <span>"Contact section"</span>
            <span>"My Skills"</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VoiceNavigation;
