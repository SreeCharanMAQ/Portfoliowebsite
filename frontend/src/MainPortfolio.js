import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import confetti from 'canvas-confetti';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Hackathons from './components/Hackathons';
import Contact from './components/Contact';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import Chatbot from './components/Chatbot';
import VoiceNavigation from './components/VoiceNavigation';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef();

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      // Trigger welcome confetti after loading
      setTimeout(() => {
        triggerWelcomeConfetti();
      }, 1000);
    }, 3000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  const triggerWelcomeConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const triggerCelebrationConfetti = () => {
    // Birthday-style confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <AuthProvider>
      <div className="App">
        <AnimatePresence>
          {loading && <LoadingScreen />}
        </AnimatePresence>
        
        {!loading && (
          <>
            <ParticleBackground />
            <Navbar />
            
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Hero triggerConfetti={triggerCelebrationConfetti} />
              <About />
              <Skills />
              <Experience triggerConfetti={triggerCelebrationConfetti} />
              <Education />
              <Hackathons triggerConfetti={triggerCelebrationConfetti} />
              <Contact triggerConfetti={triggerCelebrationConfetti} />
            </motion.main>
            
            <ScrollToTop />
            <Chatbot />
            <VoiceNavigation />
          </>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
