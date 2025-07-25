import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import MainPortfolio from './MainPortfolio';
import HackathonDetail from './components/HackathonDetail';
import ProjectDetail from './components/ProjectDetail';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPortfolio />} />
            <Route path="/hackathon/:id" element={<HackathonDetail />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
