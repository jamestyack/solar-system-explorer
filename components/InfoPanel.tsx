
import React from 'react';
import type { PlanetData, PlanetInfo } from '../types';

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

const QuizButtonSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
);

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{label}</h3>
    <p className="text-lg text-gray-100">{value}</p>
  </div>
);

interface InfoPanelProps {
  planet: PlanetData | null;
  info: PlanetInfo | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onStartQuiz: () => void;
  isQuizLoading: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planet, info, isLoading, error, onClose, onStartQuiz, isQuizLoading }) => {
  const isOpen = !!planet;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-black/70 backdrop-blur-md shadow-2xl transform transition-transform duration-500 ease-in-out z-30 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-live="polite"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-40"
        aria-label="Close panel"
      >
        <CloseIcon className="w-8 h-8" />
      </button>

      <div className="p-8 h-full overflow-y-auto">
        {planet && (
          <>
            <div className="flex justify-center items-center mb-6">
              <img
                src={planet.imageUrl}
                alt={`Image of ${planet.name}`}
                className="w-48 h-48 object-contain animate-spin-slow rounded-full"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' }}
              />
            </div>
            
            {isLoading && <LoadingSpinner />}
            
            {error && (
              <div className="text-center text-red-400 mt-8">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p>{error}</p>
              </div>
            )}

            {!isLoading && !error && info && (
              <div className="flex flex-col space-y-6 text-white">
                <h2 className="text-5xl font-bold tracking-tighter text-center">{info.name}</h2>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  {info.description}
                </p>
                
                <div className="border-t border-gray-700 my-4"></div>

                <div className="grid grid-cols-2 gap-6">
                  <InfoItem label="Diameter" value={info.diameter} />
                  <InfoItem label="Distance from Sun" value={info.distanceFromSun} />
                  <InfoItem label="Moons" value={info.moons} />
                </div>

                <div className="border-t border-gray-700 my-4"></div>

                <div>
                  <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">Fun Fact</h3>
                  <p className="text-lg text-yellow-100 mt-1 italic">"{info.funFact}"</p>
                </div>

                {info.nameMeaning && (
                  <>
                    <div className="border-t border-gray-700 my-4"></div>

                    <div>
                      <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Origin of Name</h3>
                      <p className="text-lg text-gray-200 mt-1 leading-relaxed">
                        {info.nameMeaning}
                      </p>
                    </div>
                  </>
                )}

                <div className="border-t border-gray-700 my-4"></div>

                 <div className="mt-4 text-center">
                    <button
                    onClick={onStartQuiz}
                    disabled={isQuizLoading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-x-3"
                    >
                    {isQuizLoading ? (
                        <>
                        <QuizButtonSpinner />
                        <span>Generating Quiz...</span>
                        </>
                    ) : (
                        <span>Test Your Knowledge!</span>
                    )}
                    </button>
                </div>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
