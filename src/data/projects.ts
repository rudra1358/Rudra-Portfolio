import {
  ChartBar,
  Clapperboard,
  CloudSun,
  GraduationCap,
  HeartPulse,
  MessageSquareText,
  Plane,
  ShieldExclamationPoint,
} from "lucide-react";
import type { Project } from "./types";

/**
 * ─────────────────────────────────────────────────────────────
 *  ADD A NEW PROJECT: append one object to this array. That's it.
 *  The card, the category filter and the details modal update automatically.
 *  Optional fields: github, live, image, icon, highlights, featured.
 * ─────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    id: "whatsapp-chat-analyzer",
    title: "WhatsApp Chat Analyzer",
    summary:
      "Processes exported WhatsApp chats and turns them into statistics and visualisations about who talks, when, and about what.",
    description: [
      "A Streamlit application that takes an exported WhatsApp chat (.txt, without media), parses it into a structured DataFrame and produces an interactive report for the whole group or a single participant.",
      "The parsing and analysis logic is split into separate preprocessing and helper modules, so the Streamlit layer only handles uploading, user selection and charts.",
    ],
    highlights: [
      "Total messages and words for the whole chat or a single user",
      "Most active participants in a group",
      "Most frequent words, with a custom Hinglish stop-word list",
      "Word cloud and emoji usage analysis",
      "Charts of message activity and trends over time",
    ],
    technologies: ["Python", "Streamlit", "Pandas", "Matplotlib", "Seaborn", "WordCloud"],
    category: "Data Science",
    github: "https://github.com/rudra1358/whatsapp-chat-analyzer",
    live: "https://whatsapp-chat-analyzer-ftq2.onrender.com",
    icon: MessageSquareText,
    featured: true,
  },
  {
    id: "wanderlust",
    title: "Wanderlust",
    summary:
      "A full-stack travel accommodation platform where users can browse, create and interact with property listings.",
    description: [
      "Wanderlust is a full-stack web application for travel stays, inspired by accommodation marketplaces. Visitors can explore listings, while signed-up users can add listings of their own.",
      "It is built as a server-rendered Node.js and Express application backed by MongoDB, with Cloudinary for listing images and Mapbox for showing where a property is located.",
    ],
    highlights: [
      "Browse all listings and open individual property pages",
      "User sign-up and login",
      "Create new listings with images hosted on Cloudinary",
      "Location maps powered by Mapbox",
      "Responsive Bootstrap interface",
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "Bootstrap", "Cloudinary", "Mapbox"],
    category: "Full Stack",
    github: "https://github.com/rudra1358/Wanderlust",
    live: "https://wanderlust-kifa.onrender.com/listings",
    icon: Plane,
    featured: true,
  },
  {
    id: "student-marks-analysis",
    title: "Student Marks Analysis",
    summary:
      "An end-to-end data analysis and machine learning project that explores student performance data and predicts results.",
    description: [
      "This project starts with exploratory data analysis of a student performance dataset in Jupyter, then turns the work into a modular, production-style Python package.",
      "Separate components handle data ingestion, data transformation and model training. Several regression models are trained and compared on R² score, and the best one is served through a small Flask web app for predictions.",
    ],
    highlights: [
      "EDA and visualisation of student performance data",
      "Modular pipeline: ingestion → transformation → training → prediction",
      "Compares Linear Regression, Decision Tree, Random Forest, Gradient Boosting, AdaBoost, KNN, XGBoost and CatBoost",
      "Custom logging and exception handling",
      "Flask front end for entering inputs and getting a prediction",
    ],
    technologies: ["Python", "Pandas", "Scikit-learn", "XGBoost", "CatBoost", "Flask", "Jupyter"],
    category: "Machine Learning",
    github: "https://github.com/rudra1358/mlproject",
    icon: GraduationCap,
  },
  {
    id: "healthcare-diabetes",
    title: "Healthcare Diabetes Prediction",
    summary:
      "A healthcare-oriented machine learning project that predicts diabetes risk from patient-related features with a trained classifier.",
    description: [
      "GlucoGuide is a diabetes education and risk-screening dashboard built on top of a Jupyter notebook analysis of a 100,000-row patient dataset.",
      "The notebook covers cleaning, outlier handling for BMI, glucose and HbA1c, and training a CatBoost classification pipeline. A Flask app then exposes interactive data insights and a screening form that applies the same preprocessing rules before calling the saved model.",
      "The app is clear that its output is an educational model estimate — not a diagnosis or medical advice.",
    ],
    highlights: [
      "Exploratory analysis: distributions, outlier checks, correlation heatmap, pair plots",
      "CatBoost classification pipeline with reported evaluation metrics",
      "Interactive Plotly charts in the browser",
      "Risk-screening form that mirrors the notebook's preprocessing",
    ],
    technologies: ["Python", "Pandas", "Scikit-learn", "CatBoost", "Flask", "Plotly", "Jupyter"],
    category: "Machine Learning",
    github: "https://github.com/rudra1358/HealthCare-Diabetes",
    icon: HeartPulse,
    featured: true,
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection System",
    summary:
      "A classification system that flags potentially fraudulent transactions using preprocessing, feature engineering and model evaluation.",
    description: [
      "Built on the PaySim synthetic financial transactions dataset from Kaggle, this project tackles a heavily imbalanced classification problem: spotting the small share of fraudulent transfers.",
      "The notebook compares Logistic Regression, Random Forest and LightGBM, using class weighting for imbalance and ROC-AUC and average precision for evaluation. The final model is served by a Flask REST API, with a separate JavaScript front end that only talks to the API.",
    ],
    highlights: [
      "Data preprocessing and feature engineering on transaction records",
      "Imbalance handling with class weights",
      "Model comparison using ROC-AUC and average precision",
      "Flask API: /api/health and /api/predict returning a fraud probability",
      "Standalone front end with no model logic in the browser",
    ],
    technologies: ["Python", "Pandas", "Scikit-learn", "LightGBM", "Flask", "REST API", "JavaScript"],
    category: "Machine Learning",
    github: "https://github.com/rudra1358/Fraud-Detection-System",
    icon: ShieldExclamationPoint,
    featured: true,
  },
  {
    id: "movie-recommendation",
    title: "Movie Recommendation System",
    summary:
      "Recommends movies similar to the one you pick, using recommendation logic served through a small API.",
    description: [
      "Pick a movie you like and the app returns five similar titles with their posters.",
      "The front end offers type-ahead suggestions from the list of available movies and calls a recommendation API, handling loading and error states along the way.",
    ],
    highlights: [
      "Autocomplete search across the available movie titles",
      "Five similar movies returned per query, with posters",
      "API endpoints for the movie list and recommendations",
      "Deployed on Cloudflare Pages",
    ],
    technologies: ["Recommendation System", "JavaScript", "REST API", "Cloudflare Pages"],
    category: "Machine Learning",
    github: "https://github.com/rudra1358/Movie-Recommendation-System",
    live: "https://10aaabac.movie-recommender-2ru.pages.dev/",
    icon: Clapperboard,
  },
  {
    id: "weather-app",
    title: "Weather App",
    summary: "A React weather app for looking up current conditions in any city through a clean, interactive interface.",
    description: [
      "A React and Material UI front end where users search for a city and see its current weather.",
      "Requests go through a Cloudflare Worker that calls the OpenWeather API, so the API key stays on the server instead of being shipped to the browser.",
    ],
    highlights: [
      "City search with validation and error messages",
      "Material UI components",
      "Serverless API proxy on Cloudflare Workers keeps the API key secret",
    ],
    technologies: ["React", "Vite", "Material UI", "Cloudflare Workers", "OpenWeather API"],
    category: "Frontend",
    github: "https://github.com/rudra1358/Weather",
    live: "https://mini-project-react-weather.rudra1358.workers.dev/",
    icon: CloudSun,
  },
];

/** Accent hue per category for the generated card covers. Unknown categories fall back to the default. */
export const categoryColors: Record<string, string> = {
  "Machine Learning": "#3B82F6",
  "Data Science": "#0EA5E9",
  "Full Stack": "#6366F1",
  Frontend: "#14B8A6",
  default: "#64748B",
};

export const fallbackProjectIcon = ChartBar;
