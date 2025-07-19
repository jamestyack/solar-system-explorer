import type { PlanetInfo, QuizData } from './types';

export const FALLBACK_PLANET_INFO: Record<string, PlanetInfo> = {
  Sun: {
    name: 'Sun',
    description: 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.',
    moons: 'Not applicable',
    distanceFromSun: 'Not applicable',
    diameter: '1.39 million km',
    funFact: 'The Sun contains 99.86% of the total mass of the Solar System and could fit about 1.3 million Earths inside it!',
    nameMeaning: 'The word "Sun" comes from Old English "sunne," which is related to the Latin "sol" and Greek "helios."'
  },
  Mercury: {
    name: 'Mercury',
    description: 'Mercury is the smallest planet in our Solar System and the closest to the Sun. It has extreme temperature variations, from scorching hot to freezing cold.',
    moons: '0 moons',
    distanceFromSun: '58 million km',
    diameter: '4,879 km',
    funFact: 'A day on Mercury (one rotation) takes 59 Earth days, but a year (one orbit around the Sun) takes only 88 Earth days!',
    nameMeaning: 'Named after the Roman messenger god Mercury, known for his speed, fitting for the fastest-orbiting planet.'
  },
  Venus: {
    name: 'Venus',
    description: 'Venus is the hottest planet in our Solar System due to its thick, toxic atmosphere that traps heat. It rotates backwards compared to most planets.',
    moons: '0 moons',
    distanceFromSun: '108 million km',
    diameter: '12,104 km',
    funFact: 'Venus rotates so slowly that a day on Venus (243 Earth days) is longer than a year on Venus (225 Earth days)!',
    nameMeaning: 'Named after the Roman goddess of love and beauty, due to its brilliant appearance in the sky.'
  },
  Earth: {
    name: 'Earth',
    description: 'Earth is the only known planet with life. It has liquid water, a protective atmosphere, and the perfect distance from the Sun to support diverse ecosystems.',
    moons: '1 moon (The Moon)',
    distanceFromSun: '150 million km',
    diameter: '12,756 km',
    funFact: 'Earth is the only planet not named after a Roman or Greek god - "Earth" comes from Old English and Germanic words meaning "ground" or "soil."',
    nameMeaning: 'The name "Earth" comes from Old English "eorthe" and Germanic "erde," meaning ground or soil.'
  },
  Mars: {
    name: 'Mars',
    description: 'Mars is known as the Red Planet due to iron oxide (rust) on its surface. It has the largest volcano in the Solar System and evidence of ancient water flow.',
    moons: '2 moons (Phobos and Deimos)',
    distanceFromSun: '228 million km',
    diameter: '6,792 km',
    funFact: 'Mars has seasons like Earth, but each season lasts about twice as long because Mars takes almost twice as long to orbit the Sun!',
    nameMeaning: 'Named after the Roman god of war, due to its red color that reminded ancient observers of blood.'
  },
  Jupiter: {
    name: 'Jupiter',
    description: 'Jupiter is the largest planet in our Solar System, a gas giant with a famous Great Red Spot storm that has been raging for centuries.',
    moons: '95 known moons (including Io, Europa, Ganymede, and Callisto)',
    distanceFromSun: '778 million km',
    diameter: '142,984 km',
    funFact: 'Jupiter acts like a cosmic vacuum cleaner, protecting inner planets by attracting asteroids and comets with its massive gravity!',
    nameMeaning: 'Named after the king of the Roman gods, fitting for the largest planet in our Solar System.'
  },
  Saturn: {
    name: 'Saturn',
    description: 'Saturn is famous for its spectacular ring system made of ice and rock particles. It is less dense than water and would float if there were an ocean big enough!',
    moons: '146 known moons (including Titan and Enceladus)',
    distanceFromSun: '1.43 billion km',
    diameter: '120,536 km',
    funFact: 'Saturn is the least dense planet in our Solar System - it would actually float in water if you could find a bathtub big enough!',
    nameMeaning: 'Named after the Roman god of agriculture and time, father of Jupiter in Roman mythology.'
  },
  Uranus: {
    name: 'Uranus',
    description: 'Uranus is an ice giant that rotates on its side, making it unique among planets. It has a faint ring system and appears blue-green due to methane in its atmosphere.',
    moons: '27 known moons (including Titania, Oberon, and Miranda)',
    distanceFromSun: '2.87 billion km',
    diameter: '51,118 km',
    funFact: 'Uranus rotates on its side at a 98-degree angle, likely due to an ancient collision that knocked it over!',
    nameMeaning: 'Named after the Greek god of the sky and heavens, breaking the Roman naming tradition of other planets.'
  },
  Neptune: {
    name: 'Neptune',
    description: 'Neptune is the farthest planet from the Sun and the windiest, with storms reaching speeds of up to 2,100 km/h. It appears deep blue due to methane in its atmosphere.',
    moons: '16 known moons (including Triton)',
    distanceFromSun: '4.5 billion km',
    diameter: '49,528 km',
    funFact: 'Neptune has the fastest winds in the Solar System, reaching speeds of up to 2,100 km/h - faster than the speed of sound!',
    nameMeaning: 'Named after the Roman god of the sea, due to its deep blue color reminiscent of ocean waters.'
  }
};

export const FALLBACK_QUIZ_DATA: Record<string, QuizData[]> = {
  Sun: [
    {
      question: 'What percentage of the Solar System\'s total mass does the Sun contain?',
      options: ['99.86%', '95.2%', '87.4%', '78.9%'],
      correctAnswer: '99.86%'
    }
  ],
  Mercury: [
    {
      question: 'How long does one day (rotation) on Mercury last?',
      options: ['59 Earth days', '24 Earth hours', '88 Earth days', '15 Earth hours'],
      correctAnswer: '59 Earth days'
    }
  ],
  Venus: [
    {
      question: 'Why is a day on Venus longer than a year on Venus?',
      options: ['Venus rotates very slowly', 'Venus orbits very quickly', 'Venus has no rotation', 'Venus rotates backwards only'],
      correctAnswer: 'Venus rotates very slowly'
    }
  ],
  Earth: [
    {
      question: 'What makes Earth unique among planets in our Solar System?',
      options: ['It has liquid water and life', 'It has the most moons', 'It is the largest planet', 'It has the fastest rotation'],
      correctAnswer: 'It has liquid water and life'
    }
  ],
  Mars: [
    {
      question: 'Why is Mars called the Red Planet?',
      options: ['Iron oxide (rust) on its surface', 'Red clouds in its atmosphere', 'Red ice caps', 'Reflection from its moons'],
      correctAnswer: 'Iron oxide (rust) on its surface'
    }
  ],
  Jupiter: [
    {
      question: 'What role does Jupiter play in protecting the inner planets?',
      options: ['Acts like a cosmic vacuum cleaner attracting asteroids', 'Blocks solar radiation', 'Creates a magnetic shield', 'Provides gravitational stability only'],
      correctAnswer: 'Acts like a cosmic vacuum cleaner attracting asteroids'
    }
  ],
  Saturn: [
    {
      question: 'What unique property does Saturn have regarding water?',
      options: ['It would float in water', 'It contains more water than Earth', 'It has liquid water oceans', 'It rains water on its surface'],
      correctAnswer: 'It would float in water'
    }
  ],
  Uranus: [
    {
      question: 'What makes Uranus unique in its rotation?',
      options: ['It rotates on its side at a 98-degree angle', 'It rotates backwards', 'It doesn\'t rotate at all', 'It rotates twice as fast as Earth'],
      correctAnswer: 'It rotates on its side at a 98-degree angle'
    }
  ],
  Neptune: [
    {
      question: 'What is remarkable about Neptune\'s wind speeds?',
      options: ['They reach up to 2,100 km/h - faster than sound', 'They are completely calm', 'They only blow at the poles', 'They change direction every hour'],
      correctAnswer: 'They reach up to 2,100 km/h - faster than sound'
    }
  ]
};