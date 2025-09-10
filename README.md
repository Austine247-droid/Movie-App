# 🎬 MovieMate- App - Minimum Viable Product (MVP)


## Table of Contents
1. 📖 [Project Overview](#project-overview)
2. ✨[Features](#features)
3. 🛠️ [Tech Stack](#tech-stack)
4. 📑 [Project Architecture](#project-architecture)
5. 📂 [Project Structure](#project-structure) 
6. ⚙️ [Installation & Setup](#installation-setup)
7. 🚀 [Deployment](#deployment)
8. 📊 [Workflow(How It Works)](#workflow)
9. 📸 [Screenshot/Video Demo](#screenshot/video-demo)
10. 🧑‍💻 [What I Learned](#what-I-learned)
11. 💡 [Future Improvements](#future-improvements)
12. 👨‍💻 [Author](#author)


## Project Overview
A movie discovery web app, which is a **Minimum Viable Product** built with React (Vite). It allows users to search for movies, view details fetched from the [OMDb API](https://www.omdbapi.com/)
, and manage a personalized "Watched Movies" list.



## 🛠️ Tech Stack
👉 **Frontend**: React (Vite), JSX, CSS Modules/Tailwind (your choice) <br>
👉 **Hooks**: useState, useEffect, useRef, Custom Hooks <br>
👉 **API**: OMDb API  for movie data <br>
👉 **Storage**: Browser LocalStorage <br>
👉 **Deployment**: Vercel <br>


## 📑 Project Architecture

<img src="https://github.com/Austine247-droid/Movie-App/blob/main/flowchart-1.png?raw=true"> 

## 📂 Project Structure
```
src/
│── components/       # Reusable UI components
│   ├── NavBar.jsx
│   ├── Search.jsx
│   ├── MovieList.jsx
│   ├── MovieDetails.jsx
│   ├── WatchedMovieList.jsx
│   └── ...
│
│── customHooks/      # Custom hooks (e.g., useMovies.js)
│
│── App.jsx           # Root component
│── main.jsx          # Vite entry point

```

## ⚙️ Installation & Setup
**Clone the repository and install dependencies**:
```
git clone https://github.com/your-username/movie-app.git
cd movie-app
npm install
npm run dev
```

## 🚀 Deployment
Deployed on Vercel for production:
👉 [Live Demo](https://movie-app-pied-alpha.vercel.app/)


## 📊 Workflow (How It Works)

1. User types in a search query

2. App sends request to OMDb API

3. Movies are displayed in a list view

4. User clicks a movie → fetch details by IMDb ID

5. The user can add a movie to the Watched List

6. Watched movies are stored in localStorage

7. The user can delete movies from the Watched List anytime


## 📸 Screenshots/Video Demo
<img src="https://github.com/Austine247-droid/Movie-App/blob/main/movieMate.png?raw=true"> 



https://github.com/user-attachments/assets/464a2bdf-a409-4f03-a36a-a3caa0810396



## 🧑‍💻 What I Learned

1. Building with React + Vite for modern web performance

2. Managing state effectively with useState & useEffect

3. Writing custom hooks for cleaner, reusable logic

4. Handling API calls and error states gracefully

6. Using localStorage for persistence

7. Deploying a full React app with Vercel



## 💡 Future Improvements
- 🌙 Dark mode toggle
- 👨‍💻 3D layouts
- 📱 Mobile-first responsive design
- 🔗 Integration with other APIs (e.g., TMDB)


## 👨‍💻 Author
**Ugberaese Augustine Osariemen**
**LinkedIn**: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/augustine-ugberaese/)
**GitHub**: [Github-profile](https://github.com/Austine247-droid)
