# Resume Builder

A web application that allows users to create, edit, preview, and download resumes using predefined templates.

## Tech Stack

Frontend
- React (Vite)
- TailwindCSS
- Axios
- React Router

Backend
- Node.js
- Express.js

Database
- MongoDB (Mongoose)

AI
- Google Gemini API

## Setup Instructions

1. Clone the repository

```
git clone https://github.com/mohammadtoufiq006/resume-builder.git
```

2. Backend setup

```
cd server
npm install
```

Create a `.env` file in the server folder:


Start the backend server

```
npm run dev
```

3. Frontend setup

```
cd client
npm install
npm run dev
```

## Features Implemented

- Create and edit resumes
- Store resume data in MongoDB
- Resume dashboard to view saved resumes
- Multiple resume templates (2 free, 1 premium)
- Template preview
- Work Experience and Education sections
- Download/print resume as PDF
- AI-generated professional summary using Gemini

## Assumptions

- Premium template upgrade is simulated without real payment integration
- AI assistance is limited to generating resume summaries
- Resume download is implemented using browser print functionality