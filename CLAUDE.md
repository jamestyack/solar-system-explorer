# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive Solar System Explorer built with React, TypeScript, and Vite. The application features an animated solar system with clickable planets that display information and quizzes powered by Google's Gemini AI.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Set the `GEMINI_API_KEY` environment variable in `.env.local` file for AI-powered planet information and quiz generation.

## Architecture

### Core Components
- `App.tsx` - Main application component managing global state for planet selection, info panels, and quiz modals
- `SolarSystem.tsx` - Renders the animated solar system with orbiting planets and mobile-friendly vertical list
- `InfoPanel.tsx` - Displays planet information fetched from Gemini AI
- `QuizModal.tsx` - Interactive quiz component based on planet information
- `ChatPanel.tsx` - AI chat interface for general questions

### Data Flow
- Planet data defined in `constants.ts` with visual properties (size, orbit radius, animation duration)
- AI service in `services/geminiService.ts` handles Gemini API calls with structured JSON schemas
- Type definitions in `types.ts` ensure type safety across planet data, AI responses, and UI components

### Key Features
- Responsive design: Desktop shows animated orbiting system, mobile shows vertical list
- AI Integration: Uses Google Gemini API for planet information and quiz generation
- State Management: React hooks manage planet selection, loading states, and modal visibility
- Visual Effects: CSS animations for planet orbits with hover interactions

### File Structure
```
components/     # React components
services/       # External API integrations (Gemini AI)
types.ts        # TypeScript type definitions
constants.ts    # Planet data and configuration
vite.config.ts  # Build configuration with environment variable handling
```

## AI Service Notes

The Gemini service uses structured JSON schemas to ensure consistent responses for both planet information and quiz generation. API key is configured through Vite's environment variable system.