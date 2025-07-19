import { GoogleGenAI, Type } from "@google/genai";
import type { PlanetInfo, PlanetName, QuizData } from "../types";
import { FALLBACK_PLANET_INFO, FALLBACK_QUIZ_DATA } from "../fallbackData";

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const infoResponseSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The celestial body's name." },
    description: { type: Type.STRING, description: "A brief, engaging summary of the celestial body suitable for a learning tool." },
    moons: { type: Type.STRING, description: "Information about its moons (e.g., number of moons or names of major ones). For the Sun, this can be 'Not applicable'." },
    distanceFromSun: { type: Type.STRING, description: "The average distance from the Sun. For the Sun, this can be 'Not applicable'." },
    diameter: { type: Type.STRING, description: "The celestial body's diameter." },
    funFact: { type: Type.STRING, description: "A surprising or fun fact about the celestial body." },
    nameMeaning: { type: Type.STRING, description: "The mythological or historical origin of the celestial body's name." },
  },
  required: ["name", "description", "moons", "distanceFromSun", "diameter", "funFact", "nameMeaning"],
};

const quizResponseSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING, description: "A multiple-choice question based on the provided text." },
        options: {
            type: Type.ARRAY,
            description: "An array of 4 strings representing the possible answers (one correct, three plausible but incorrect).",
            items: { type: Type.STRING }
        },
        correctAnswer: { type: Type.STRING, description: "The correct answer, which must be an exact match to one of the items in the 'options' array." }
    },
    required: ["question", "options", "correctAnswer"]
};

export const getPlanetInfo = async (planetName: PlanetName): Promise<PlanetInfo> => {
  // If no API key or AI service is not available, use fallback data
  if (!ai) {
    console.warn(`No API key found, using fallback data for ${planetName}`);
    const fallbackInfo = FALLBACK_PLANET_INFO[planetName];
    if (fallbackInfo) {
      return fallbackInfo;
    }
    throw new Error(`No fallback data available for ${planetName}`);
  }

  try {
    const prompt = `Provide a fun and engaging summary for a student about the celestial body named ${planetName}. Include its most interesting features, information on its moons, its diameter, its distance from the sun, a fun fact, and the mythological origin of its name.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: infoResponseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as PlanetInfo;
  } catch (error) {
    console.error(`Error fetching data for ${planetName}:`, error);
    console.warn(`Falling back to static data for ${planetName}`);
    
    // Use fallback data when API fails
    const fallbackInfo = FALLBACK_PLANET_INFO[planetName];
    if (fallbackInfo) {
      return fallbackInfo;
    }
    
    throw new Error(`Could not retrieve information for ${planetName} and no fallback data available.`);
  }
};

export const getPlanetQuiz = async (planetInfo: PlanetInfo): Promise<QuizData> => {
  // If no API key or AI service is not available, use fallback data
  if (!ai) {
    console.warn(`No API key found, using fallback quiz data for ${planetInfo.name}`);
    const fallbackQuizzes = FALLBACK_QUIZ_DATA[planetInfo.name];
    if (fallbackQuizzes && fallbackQuizzes.length > 0) {
      // Return a random quiz from the available fallback quizzes
      return fallbackQuizzes[Math.floor(Math.random() * fallbackQuizzes.length)];
    }
    throw new Error(`No fallback quiz data available for ${planetInfo.name}`);
  }

  try {
    const context = JSON.stringify(planetInfo);
    const prompt = `Based only on the following information about the celestial body '${planetInfo.name}', create one multiple-choice quiz question.
    Context: ${context}
    
    The question should test understanding of the provided information. Provide exactly four options: one correct answer and three plausible but incorrect answers.
    Ensure the 'correctAnswer' value is an exact match to one of the strings in the 'options' array.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: quizResponseSchema,
        },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);

    if (parsedJson.options.length !== 4 || !parsedJson.options.includes(parsedJson.correctAnswer)) {
        console.error("Generated quiz data is invalid:", parsedJson);
        throw new Error("Received invalid quiz data from API.");
    }
    return parsedJson as QuizData;
  } catch (error) {
    console.error(`Error fetching quiz for ${planetInfo.name}:`, error);
    console.warn(`Falling back to static quiz data for ${planetInfo.name}`);
    
    // Use fallback data when API fails
    const fallbackQuizzes = FALLBACK_QUIZ_DATA[planetInfo.name];
    if (fallbackQuizzes && fallbackQuizzes.length > 0) {
      // Return a random quiz from the available fallback quizzes
      return fallbackQuizzes[Math.floor(Math.random() * fallbackQuizzes.length)];
    }
    
    throw new Error(`Could not retrieve quiz for ${planetInfo.name} and no fallback data available.`);
  }
};