
import React from 'react';
import { PLANETS_DATA } from '../constants';
import type { PlanetData, PlanetName } from '../types';
import Planet from './Planet';

interface SolarSystemProps {
  onPlanetClick: (planet: PlanetData) => void;
  selectedPlanet: PlanetData | null;
  hoveredPlanet: PlanetName | null;
  onPlanetHover: (name: PlanetName | null) => void;
}

const sunDataForPanel: PlanetData = {
    name: 'Sun',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
    color: 'bg-yellow-300',
    size: 80,
    orbitRadius: 0,
    orbitDuration: '0s',
};

const SolarSystem: React.FC<SolarSystemProps> = ({ onPlanetClick, selectedPlanet, hoveredPlanet, onPlanetHover }) => {
  const maxOrbit = Math.max(...PLANETS_DATA.map(p => p.orbitRadius)) * 2 + 100;
  const isSunSelected = selectedPlanet?.name === 'Sun';

  const allCelestialBodies = [sunDataForPanel, ...PLANETS_DATA];

  return (
    <>
      {/* Desktop View: Orbiting System */}
      <div className="hidden md:flex relative items-center justify-center w-full h-full scale-[0.7] md:scale-[0.85] lg:scale-100" style={{ minWidth: `${maxOrbit}px`, minHeight: `${maxOrbit}px` }}>
        {/* Sun */}
        <div
          className="absolute w-20 h-20 rounded-full sun-glow z-10 cursor-pointer transition-transform duration-300 group"
          style={{ transform: isSunSelected ? 'scale(1.1)' : 'scale(1)' }}
          onClick={() => onPlanetClick(sunDataForPanel)}
          onMouseEnter={() => onPlanetHover(sunDataForPanel.name)}
          onMouseLeave={() => onPlanetHover(null)}
          aria-label="Select celestial body Sun"
        >
          <img src={sunDataForPanel.imageUrl} alt="The Sun" className="w-full h-full object-cover rounded-full group-hover:brightness-110 transition-all" />
           <span 
             className={`absolute inset-0 flex items-center justify-center text-white font-bold text-lg transition-opacity duration-300 ${hoveredPlanet === 'Sun' ? 'opacity-100' : 'opacity-0'}`}
             style={{textShadow: '0 0 5px black'}}
           >
            Sun
          </span>
        </div>

        {/* Planets and Orbits */}
        {PLANETS_DATA.map((planet) => (
          <div
            key={planet.name}
            className={`absolute border border-gray-500/30 rounded-full animate-spin pointer-events-none ${hoveredPlanet === planet.name ? 'animation-paused' : ''}`}
            style={{
              width: `${planet.orbitRadius * 2}px`,
              height: `${planet.orbitRadius * 2}px`,
              animationDuration: planet.orbitDuration,
              animationTimingFunction: 'linear',
            }}
          >
            <Planet
              data={planet}
              onClick={onPlanetClick}
              isSelected={selectedPlanet?.name === planet.name}
              onHover={onPlanetHover}
              isHovered={hoveredPlanet === planet.name}
            />
          </div>
        ))}
      </div>
      
      {/* Mobile View: Vertical List */}
      <div className="md:hidden flex flex-col items-center w-full h-full pt-28 pb-20 px-4 overflow-y-auto">
        <div className="flex flex-col items-stretch gap-y-4 w-full max-w-sm">
          {allCelestialBodies.map((body) => {
            const isSelected = selectedPlanet?.name === body.name;
            return (
              <div
                key={`${body.name}-mobile`}
                onClick={() => onPlanetClick(body)}
                onMouseEnter={() => onPlanetHover(body.name)}
                onMouseLeave={() => onPlanetHover(null)}
                className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out border-2 ${
                  isSelected ? 'bg-white/20 border-white' : 'bg-white/5 border-transparent hover:bg-white/10'
                }`}
                role="button"
                aria-label={`Select celestial body ${body.name}`}
                aria-pressed={isSelected}
              >
                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={body.imageUrl}
                    alt={body.name}
                    className="rounded-full object-cover"
                    style={{ width: `${body.size}px`, height: `${body.size}px` }}
                  />
                </div>
                <span className="ml-5 text-xl font-bold text-white tracking-wide">
                  {body.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SolarSystem;
