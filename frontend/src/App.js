import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MainPortfolio from './MainPortfolio';
import HackathonDetail from './components/HackathonDetail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPortfolio />} />
          <Route path="/hackathon/:id" element={<HackathonDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
