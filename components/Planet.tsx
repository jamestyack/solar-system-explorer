import React, { CSSProperties } from 'react';
import type { PlanetData, PlanetName } from '../types';

interface PlanetProps {
  data: PlanetData;
  onClick: (planet: PlanetData) => void;
  isSelected: boolean;
  onHover: (name: PlanetName | null) => void;
  isHovered: boolean;
}

const Planet: React.FC<PlanetProps> = ({ data, onClick, isSelected, onHover, isHovered }) => {
  const ringStyle: CSSProperties = data.name === 'Saturn' ? {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '180%',
    height: '180%',
    border: '2px solid rgba(251, 230, 179, 0.7)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) rotateX(70deg)',
  } : {};

  const scale = isSelected ? 1.8 : isHovered ? 1.5 : 1;
  
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 cursor-pointer group p-3 pointer-events-auto animate-spin-reverse ${isHovered ? 'animation-paused' : ''}`}
      style={{
        left: `-${data.size / 2 + 12}px`,
        animationDuration: data.orbitDuration,
      }}
      onClick={() => onClick(data)}
      onMouseEnter={() => onHover(data.name)}
      onMouseLeave={() => onHover(null)}
      aria-label={`Select planet ${data.name}`}
    >
      <div
        className="relative transition-all duration-300 ease-in-out"
        style={{
          width: `${data.size}px`,
          height: `${data.size}px`,
          transform: `scale(${scale})`,
        }}
      >
        <img
          src={data.imageUrl}
          alt={data.name}
          className={`w-full h-full object-cover rounded-full planet-glow ${!isSelected && !isHovered ? 'animate-pulse-glow' : ''}`}
          style={{
            boxShadow: isSelected ? '0 0 15px 5px rgba(255, 255, 255, 0.7)' : 'none',
          }}
        />
        {data.name === 'Saturn' && <div style={ringStyle}></div>}
      </div>
      <span className="absolute left-1/2 -translate-x-1/2 mt-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {data.name}
      </span>
    </div>
  );
};

export default Planet;