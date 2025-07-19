
import React, { useState, useEffect } from 'react';
import type { PlanetData, QuizData } from '../types';

// Icons
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
    </div>
);

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  planet: PlanetData | null;
  quizData: QuizData | null;
  error: string | null;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, planet, quizData, error }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when modal opens for a new quiz
    if (isOpen) {
      setSelectedAnswer(null);
    }
  }, [isOpen, quizData]);

  if (!isOpen) return null;

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer === null) { // Only allow one selection
      setSelectedAnswer(option);
    }
  };

  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) {
      return 'bg-gray-700 hover:bg-gray-600';
    }
    if (option === quizData?.correctAnswer) {
      return 'bg-green-600 ring-2 ring-green-400 animate-pulse';
    }
    if (option === selectedAnswer && option !== quizData?.correctAnswer) {
      return 'bg-red-600';
    }
    return 'bg-gray-800 opacity-60 cursor-not-allowed';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-gray-900/75 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-white">Quiz Time: {planet?.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close quiz">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {!quizData && !error && <LoadingSpinner />}
          {error && <div className="text-center text-red-400"><h3 className="text-xl font-bold">Error</h3><p>{error}</p></div>}
          
          {planet && quizData && (
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="flex-shrink-0">
                <img
                  src={planet.imageUrl}
                  alt={planet.name}
                  className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))' }}
                />
              </div>
              <div className="w-full text-center md:text-left">
                <p className="text-xl md:text-2xl font-semibold text-gray-100 mb-6">{quizData.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-lg text-white font-semibold transition-all duration-300 text-left ${getButtonClass(option)}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
        
        {selectedAnswer && (
             <footer className="p-4 text-center flex-shrink-0">
                 <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                    Close
                </button>
            </footer>
        )}
      </div>
       <style>{`
          @keyframes fade-in-scale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.3s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default QuizModal;
