import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CharacterProvider } from './contexts/CharacterContext';
import Header from './components/Header';
import CharacterListPage from './components/CharacterListPage';
import CharacterCreator from './components/CharacterCreator';
import QuickCharacterCreator from './components/QuickCharacterCreator';

import CharacterDetail from './components/CharacterDetail';
import Homepage from './components/Homepage';
import PremiumPage from './components/PremiumPage';
import SimpleBackground from './components/ui/SimpleBackground';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CharacterProvider>
          <SimpleBackground />
          <div className="app-container min-h-screen">

            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/characters" element={
                <ProtectedRoute>
                  <Header />
                  <CharacterListPage />
                </ProtectedRoute>
              } />
              <Route path="/premium" element={
                <ProtectedRoute>
                  <Header />
                  <PremiumPage />
                </ProtectedRoute>
              } />
              <Route path="/create" element={
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-6 max-w-5xl">
                    <CharacterCreator />
                  </main>
                </>
              } />
              <Route path="/quick-create" element={
                <>
                  <Header />
                  <main className="container mx-auto px-4 py-6 max-w-7xl">
                    <QuickCharacterCreator />
                  </main>
                </>
              } />

              <Route path="/character/:id" element={
                <ProtectedRoute>
                  <Header />
                  <main className="container mx-auto px-4 py-6 max-w-5xl">
                    <CharacterDetail />
                  </main>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </CharacterProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
