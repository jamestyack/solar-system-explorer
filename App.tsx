
import React, { useState, useEffect, useCallback } from 'react';
import type { PlanetData, PlanetInfo, PlanetName, QuizData } from './types';
import { getPlanetInfo, getPlanetQuiz } from './services/geminiService';
import StarryBackground from './components/StarryBackground';
import SolarSystem from './components/SolarSystem';
import InfoPanel from './components/InfoPanel';
import ChatIcon from './components/ChatIcon';
import ChatPanel from './components/ChatPanel';
import QuizModal from './components/QuizModal';
import QuizLoadingOverlay from './components/QuizLoadingOverlay';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [planetInfo, setPlanetInfo] = useState<PlanetInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetName | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // State for the new quiz feature
  const [quizPlanet, setQuizPlanet] = useState<PlanetData | null>(null);
  const [isQuizVisible, setIsQuizVisible] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isQuizLoading, setIsQuizLoading] = useState<boolean>(false);
  const [quizError, setQuizError] = useState<string | null>(null);


  const fetchPlanetInfo = useCallback(async (planet: PlanetData) => {
    setIsLoading(true);
    setError(null);
    setPlanetInfo(null);
    try {
      const info = await getPlanetInfo(planet.name);
      setPlanetInfo(info);
    } catch (err) {
      setError('Failed to fetch planet information. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedPlanet) {
      fetchPlanetInfo(selectedPlanet);
    }
  }, [selectedPlanet, fetchPlanetInfo]);

  const handlePlanetSelect = (planet: PlanetData) => {
    setSelectedPlanet(planet);
  };

  const handlePlanetHover = (name: PlanetName | null) => {
    setHoveredPlanet(name);
  };

  const handleClosePanel = () => {
    setSelectedPlanet(null);
    setPlanetInfo(null);
    setError(null);
  };

  const handleStartQuiz = async () => {
    if (!planetInfo || !selectedPlanet) return;

    setIsQuizLoading(true);
    setQuizError(null);
    setQuizPlanet(selectedPlanet); // Keep track of which planet the quiz is for
    handleClosePanel(); // Close info panel

    try {
      // Simulate a slightly longer delay to make the loading animation noticeable
      await new Promise(resolve => setTimeout(resolve, 1500));
      const quiz = await getPlanetQuiz(planetInfo);
      setQuizData(quiz);
      setIsQuizVisible(true);
    } catch (err) {
      setQuizError("Failed to generate a quiz. Please try again later.");
      // Optionally, show an error modal or toast
      console.error(err);
    } finally {
      setIsQuizLoading(false);
    }
  };

  const handleCloseQuiz = () => {
    setIsQuizVisible(false);
    setQuizData(null);
    setQuizPlanet(null);
    setQuizError(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <StarryBackground />

      <header className="absolute top-8 left-1/2 -translate-x-1/2 w-full px-4 text-center z-20 pointer-events-none">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 15px rgba(255,255,255,0.7), 0 0 5px rgba(255,255,255,0.5)' }}>
          TrueHumanAI: Solar System Explorer
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-1">
          Learn about our Solar System
        </p>
      </header>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <SolarSystem
          onPlanetClick={handlePlanetSelect}
          selectedPlanet={selectedPlanet}
          hoveredPlanet={hoveredPlanet}
          onPlanetHover={handlePlanetHover}
        />
      </div>

      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
        <p className="text-md md:text-lg text-gray-400 animate-pulse hidden md:block">Click on a planet to learn more</p>
      </footer>

      <InfoPanel
        planet={selectedPlanet}
        info={planetInfo}
        isLoading={isLoading}
        error={error}
        onClose={handleClosePanel}
        onStartQuiz={handleStartQuiz}
        isQuizLoading={isQuizLoading}
      />

      <QuizLoadingOverlay isLoading={isQuizLoading} />

      <QuizModal
        isOpen={isQuizVisible}
        onClose={handleCloseQuiz}
        planet={quizPlanet}
        quizData={quizData}
        error={quizError}
      />

      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(prev => !prev)} />
      <ChatIcon onClick={() => setIsChatOpen(prev => !prev)} />
    </div>
  );
};

export default App;
