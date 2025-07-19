
export type PlanetName = 'Sun' | 'Mercury' | 'Venus' | 'Earth' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune';

export interface PlanetData {
  name: PlanetName;
  color: string;
  size: number; // relative size for rendering
  orbitRadius: number; // in pixels
  orbitDuration: string; // animation duration
  imageUrl: string;
}

export interface PlanetInfo {
  name: string;
  description: string;
  moons: string;
  distanceFromSun: string;
  diameter: string;
  funFact: string;
  nameMeaning: string;
}

export interface QuizData {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
