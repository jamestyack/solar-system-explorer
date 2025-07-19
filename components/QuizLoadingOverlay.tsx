
import React from 'react';

interface QuizLoadingOverlayProps {
  isLoading: boolean;
}

const SpaceshipIcon: React.FC = () => (
    <svg className="w-24 h-24 text-white transform -rotate-45" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.01,2.5C12.01,2.5,12,2.5,12,2.5c-0.4,0-0.7,0.2-0.9,0.5l-2.4,4.2l-4-1.2c-0.4-0.1-0.9,0.1-1.1,0.5c-0.2,0.4-0.1,0.9,0.3,1.1 l3.9,3.9L2.5,14.3c-0.4,0.4-0.4,1,0,1.4C2.7,15.9,2.9,16,3.2,16s0.5-0.1,0.7-0.3l4.3-4.3l3.9,3.9c0.2,0.2,0.5,0.3,0.7,0.3 c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4l-4.3-4.3l1.2-4l4.2,2.4c0.3,0.2,0.7,0.1,1-0.1c0,0,0.1,0,0.1-0.1l4.8-4.8 c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-4.8,4.8c0,0-0.1,0-0.1,0.1C12.71,2.7,12.41,2.5,12.01,2.5z" />
      <path d="M20.8,8.5c-0.4-0.4-1-0.4-1.4,0L18,9.9l-1.4-1.4c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l1.4,1.4l-1.4,1.4c-0.4,0.4-0.4,1,0,1.4 c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4l-1.4-1.4 l1.4-1.4C21.2,9.5,21.2,8.9,20.8,8.5z" />
    </svg>
);


const QuizLoadingOverlay: React.FC<QuizLoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-40 animate-fade-in"
      aria-live="assertive"
      aria-label="Generating quiz"
    >
      <div className="animate-liftoff">
        <SpaceshipIcon />
      </div>
      <p className="mt-8 text-2xl text-white font-semibold tracking-wider animate-pulse">
        Engaging Hyperdrive...
      </p>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes liftoff {
            0% { transform: translateY(30px) scale(0.9); opacity: 0.7; }
            50% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-30px) scale(0.9); opacity: 0.7; }
        }
        .animate-liftoff { 
            animation: liftoff 2.5s ease-in-out infinite; 
        }
       `}</style>
    </div>
  );
};

export default QuizLoadingOverlay;
