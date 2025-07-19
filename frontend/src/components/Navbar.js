import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import AuthButton from './AuthButton';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">K Sree Charan</span>
        </motion.div>

        <div className="nav-menu">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        <div className="nav-actions">
          <AuthButton />
          
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </motion.button>

          <motion.button
            className="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          x: isOpen ? '0%' : '100%' 
        }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.href);
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: isOpen ? 1 : 0, 
              x: isOpen ? 0 : 50 
            }}
            transition={{ delay: index * 0.1 }}
          >
            {item.name}
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
