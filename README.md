# AI Resume Analyzer

AI Resume Analyzer is a full-stack web application designed to help users evaluate and improve their resumes for specific job roles. The platform allows users to upload a PDF resume, enter a job description, and receive AI-powered feedback covering ATS compatibility, strengths, weaknesses, missing keywords, improvement suggestions, and an enhanced resume version.

## Key Features

- Resume upload and parsing
- Job description-based analysis
- AI-generated feedback on resume strengths and weaknesses
- Keyword matching and gap analysis
- Resume improvement suggestions
- User authentication and secure access
- Saved analysis history with view and delete functionality

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- AI Integration: OpenAI-compatible API

## Project Structure

- frontend/ — React-based user interface
- backend/ — Express server and API routes
- uploads/ — Uploaded resume files

## Installation

1. Clone the repository:
   git clone <repository-url>
2. Install frontend dependencies:
   cd frontend
   npm install
3. Install backend dependencies:
   cd backend
   npm install

## Environment Variables

Create a .env file in the backend directory with the following values:

- MONGO_URI
- JWT_SECRET
- AI_API_KEY
- AI_API_URL

## Running the Application

Start the backend:
cd backend
npm start

Start the frontend:
cd frontend
npm run dev

## Usage

1. Create an account or sign in
2. Upload your resume
3. Enter the target job description
4. Submit the analysis
5. Review the results and improve your resume

## Purpose

This project demonstrates a practical application of AI in career development tools, combining modern frontend development, backend services, and intelligent automation in a single platform.
