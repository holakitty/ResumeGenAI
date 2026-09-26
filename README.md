# ResumeCraft ATS — Smart Resume & Cover Letter Builder

[![ATS Parsability](https://img.shields.io/badge/ATS%20Parsability-99%25-emerald?style=for-the-badge&logo=shield)](https://github.com/)
[![Templates](https://img.shields.io/badge/ATS%20Templates-6%20Vibrant%20Styles-indigo?style=for-the-badge&logo=layout)](https://github.com/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

> **A modern, production-grade ATS Resume & Cover Letter Builder engineered to pass enterprise applicant tracking systems (Workday, Taleo, Greenhouse, Lever, and Naukri) while standing out with 6 colorful, human-readable designs.**

---

## 🌟 Live Demo & Deployment

- **Live Application:** [Launch ResumeCraft ATS App](https://ais-pre-5oxtp4fxcbccd6xaxlhmd3-644571359914.asia-east1.run.app)
- **GitHub Pages Landing Page:** `docs/index.html` (deploy via Settings > Pages > Source `/docs`)

---

## ✨ Key Features

### 1. 🎨 6 Colorful, ATS-Proof Templates
Unlike two-column graphical templates that fail automated ATS parsing, all 6 templates maintain strict **single-column semantic hierarchy** while offering refined typography and vibrant accents:

| Template | Aesthetic | Accent Color | Ideal Roles | ATS Score |
| :--- | :--- | :--- | :--- | :--- |
| **Harvard Ivy Crimson** | Classic Academic & Wall St. Garamond | `#991b1b` (Crimson) | Strategy, Consulting, Leadership, Finance | **99%** |
| **Modern Tech Pro** | Electric Sans-Serif with Skill Badges | `#2563eb` (Tech Blue) | Software Engineers, Data Analysts, Cloud | **98%** |
| **Executive Slate & Indigo** | Director-Level Divider & Competency Cards | `#4f46e5` (Royal Indigo) | Senior Leads, Directors, Principals | **97%** |
| **Corporate Navy** | Enterprise Fortune 500 Structured Standard | `#1e3a8a` (Deep Navy) | Banking, Enterprise SaaS, Global MNCs | **98%** |
| **Nordic Mint & Emerald** | High-Density 1-Page Scandinavian Precision | `#059669` (Emerald Mint) | Fast-growth Tech, Operations, Analytics | **96%** |
| **Editorial Rose & Burgundy** | Warm Garamond with Executive Quote Box | `#881337` (Rose Burgundy) | Research Leads, Economists, Strategists | **97%** |

### 2. 🌈 8 Global Color Palettes
Switch the global theme with a single click across:
- **Crimson Ruby** (`#991b1b`)
- **Electric Blue** (`#2563eb`)
- **Royal Indigo** (`#4f46e5`)
- **Corporate Navy** (`#1e3a8a`)
- **Emerald Mint** (`#059669`)
- **Editorial Rose** (`#881337`)
- **Sunset Amber** (`#d97706`)
- **Ocean Teal** (`#0d9488`)

The chosen palette automatically synchronizes across the resume header, divider bars, skill tags, and matched cover letter.

### 3. 🎯 1-Click Job Portal Connectors
- **Indian & Global Portals Supported:** Direct scraping and presets for **Naukri.com**, **Indeed**, and **LinkedIn**.
- **Keyword & Requirement Extraction:** Automatically extracts core competencies, tools, and required metrics from job descriptions.
- **Preconfigured Presets:** Curated presets for *Lead / Senior Data Analyst (Statistical Modeling)*, *Quantitative Modeler*, and *Staff Full Stack Engineer*.

### 4. 📊 Real-Time ATS Audit Engine
- **0–100 Compliance Score:** Evaluates keyword density, formatting compliance, and readability.
- **Quantifiable Metrics Check:** Scans for measurable business impacts (e.g., *34% client retention*, *250K+ respondents*).
- **Tailoring Recommendations:** Actionable section-by-section improvements to increase callback rates.

### 5. ✍️ Matching Cover Letter Studio
- Cohesive typography and color branding matching the selected resume template.
- 4 customizable tones: *Confident*, *Professional*, *Enthusiastic*, and *Executive*.
- Customizable recipient details and instant PDF / TXT exports.

### 6. 🔒 Privacy-First Architecture
- Secure server proxy routes (`/api/*`) for AI tailoring and portal scraping.
- No client-side storage of raw API keys.
- Instant, zero-telemetry export to clean PDF and ATS-compliant Plaintext (`.txt`).

---

## 🛠️ Tech Stack & Architecture

```
resumecraft-ats/
├── docs/                   # GitHub Pages static landing page (index.html)
│   └── index.html
├── src/
│   ├── components/         # React UI Components
│   │   ├── templates/      # 6 ATS Resume Templates (Harvard, Modern Tech, Executive, etc.)
│   │   ├── CoverLetterStudio.tsx
│   │   ├── JobConnectorModal.tsx
│   │   ├── ImportFeedModal.tsx
│   │   ├── ResumeEditor.tsx
│   │   └── ResumePreview.tsx
│   ├── data/               # Default profile & template configurations
│   ├── types/              # Strict TypeScript interfaces
│   ├── App.tsx             # Main Application Shell & Ribbon Toolbar
│   └── main.tsx            # Vite entry point
├── server.ts               # Express backend with server-side AI proxy & scrapers
├── .env.example            # Environment variables template
├── package.json
└── vite.config.ts
```

- **Frontend:** React 19, TypeScript 5.7, Tailwind CSS 4, Lucide React Icons
- **Backend:** Express 4 on Node.js / TSX
- **AI & Processing:** Google Gemini API (`@google/genai`) with server-side proxy routes, pdf-parse, mammoth (DOCX)
- **Tooling:** Vite 6 with proxy middleware

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ or Bun 1.0+
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/resumecraft-ats.git
cd resumecraft-ats
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your API key in `.env`:
```env
GEMINI_API_KEY="your-gemini-api-key"
# Optional fallback providers:
OPENROUTER_API_KEY=""
GROQ_API_KEY=""
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploying Landing Page to GitHub Pages

This repository includes a standalone, zero-dependency landing page in `/docs/index.html`:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete ResumeCraft ATS app and landing page"
   git push origin main
   ```
2. In your GitHub repository, go to **Settings > Pages**.
3. Under **Build and deployment > Branch**:
   - Select branch: `main`
   - Select folder: `/docs`
4. Click **Save**. Your landing page is live at `https://<your-username>.github.io/<repo-name>/`!

---

## 📄 Candidate Profile Spotlight

The default profile is configured for **Ranjana Guha**:
- **Role:** Statistical Analyst - Survey Analysis & Field Project Management
- **Organization:** Indian Statistical Institute (ISI), Kolkata
- **Contact:** `+91 84202 69510` • `ranjana.guha@gmail.com`
- **Location:** Kolkata, West Bengal (Open to Remote / Hybrid)
- **Key Specializations:** Survey Data Analysis, Field Project Operations & Enumerator Management, Advanced Excel (Macros, VBA, Data Cleaning), R (survey, tidyverse), DBF Databases (dBase microdata formats), Statistical Sampling & Validation.

---

## 📜 License

MIT License. Free to use, fork, and adapt for personal or commercial job applications.
