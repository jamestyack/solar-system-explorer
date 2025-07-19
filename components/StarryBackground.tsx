
import React from 'react';

const StarryBackground: React.FC = () => {
  const stars = Array.from({ length: 150 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 5 + 5}s`,
    };
    return (
      <div
        key={i}
        className="absolute bg-white rounded-full opacity-70 animate-pulse"
        style={style}
      ></div>
    );
  });

  return <div className="absolute inset-0 bg-black">{stars}</div>;
};

export default StarryBackground;
