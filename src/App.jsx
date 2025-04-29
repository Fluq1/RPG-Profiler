import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CharacterProvider } from './contexts/CharacterContext';
import Header from './components/Header';
import CharacterList from './components/CharacterList';
import CharacterCreator from './components/CharacterCreator';
import CharacterDetail from './components/CharacterDetail';
import AnimatedBackground from './components/ui/AnimatedBackground';
import './App.css';

function App() {
  return (
    <Router>
      <CharacterProvider>
        <AnimatedBackground />
        <div className="app-container min-h-screen p-4 md:p-8">
          <Header />
          <main className="container mx-auto mt-8">
            <Routes>
              <Route path="/" element={<CharacterList />} />
              <Route path="/create" element={<CharacterCreator />} />
              <Route path="/character/:id" element={<CharacterDetail />} />
            </Routes>
          </main>
        </div>
      </CharacterProvider>
    </Router>
  );
}

export default App;
