import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import './AuthButton.css';

const AuthButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  if (isAuthenticated && user) {
    return (
      <div className="auth-button-container">
        <motion.button
          className="user-menu-trigger"
          onClick={() => setShowUserMenu(!showUserMenu)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="user-name">{user.name}</span>
        </motion.button>

        {showUserMenu && (
          <motion.div
            className="user-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="user-info">
              <div className="user-avatar-large">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="user-display-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <button className="dropdown-item">
              <FiSettings />
              Settings
            </button>
            
            <button className="dropdown-item logout-item" onClick={handleLogout}>
              <FiLogOut />
              Sign Out
            </button>
          </motion.div>
        )}

        {/* Click outside to close */}
        {showUserMenu && (
          <div 
            className="dropdown-backdrop" 
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <motion.button
        className="auth-login-btn"
        onClick={handleLoginClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiUser />
        Sign In
      </motion.button>

      <AuthModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default AuthButton;
