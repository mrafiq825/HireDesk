# HireDesk - AI-Powered Recruitment & Candidate Analysis Platform

![HireDesk Logo](public/logo/logo.png)

Transform your hiring process with modern AI-powered candidate analysis, resume parsing, batch candidate evaluation, and automated interview question generation.

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg?style=flat&logo=react)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.9.1-CA4245.svg?style=flat&logo=reactrouter)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.4-06B6D4.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.3.3-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18.svg?style=flat&logo=vitest)](https://vitest.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?style=flat&logo=docker)](https://www.docker.com/)

---

## Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Complete Application Flow & User Journeys](#-complete-application-flow--user-journeys)
  - [1. User Onboarding & Authentication Flow](#1-user-onboarding--authentication-flow)
  - [2. Single Resume Analysis Flow](#2-single-resume-analysis-flow)
  - [3. Batch Resume Processing Flow](#3-batch-resume-processing-flow)
  - [4. Multi-Resume Comparison Flow](#4-multi-resume-comparison-flow)
  - [5. Candidate Selection Engine Flow](#5-candidate-selection-engine-flow)
  - [6. Interactive AI HR Assistant Flow](#6-interactive-ai-hr-assistant-flow)
  - [7. User Profile & Usage Limits Flow](#7-user-profile--usage-limits-flow)
- [Project Directory Structure](#-project-directory-structure)
- [Prerequisites & Installation](#-prerequisites--installation)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [API Services & Endpoints](#-api-services--endpoints)
- [Data Persistence & State Management](#-data-persistence--state-management)
- [UI/UX Design System](#-uiux-design-system)
- [Deployment Guide](#-deployment-guide)
  - [Local Production Server](#local-production-server)
  - [Docker & Docker Hub](#docker--docker-hub)
  - [Docker Compose Profiles](#docker-compose-profiles)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Security & Production Readiness](#-security--production-readiness)
- [Contributing](#-contributing)
- [License & Support](#-license--support)

---

## Overview

**HireDesk** is an enterprise-grade, AI-driven recruitment web application built to streamline candidate screening and evaluation. By combining advanced natural language parsing with automated fit scoring, HireDesk allows recruiters, hiring managers, and HR teams to extract key candidate metadata, compare candidates side-by-side, evaluate resumes against specific job role criteria, and generate tailored, role-specific interview questions in seconds.

Designed with a modern, responsive **Glassmorphism Dark UI**, HireDesk offers real-time analysis feedback, local state persistence across sessions, and full multi-file processing capability.

---

## Key Features

- **Single Resume AI Analysis**: Detailed candidate profiling, overall fit scoring (FIT/UNFIT/PARTIAL), work experience breakdown, missing skills detection, personality insights, and career path recommendations.
- **Batch Resume Processing**: Upload and evaluate up to 5 resumes simultaneously with aggregated batch summaries, candidate ranking, and instant modal deep-dives.
- **Side-by-Side Resume Comparison**: Compare candidate qualifications in a unified comparative matrix with score rankings and relative strength analyses.
- **Candidate Selection Engine**: Fast-pass candidate screening by evaluating resumes against specific job titles and comma-separated mandatory skill keywords.
- **Interactive AI HR Assistant (EvaAI)**: Chat-based assistant for generating custom screening criteria, drafting job descriptions, formulating interview questions, and analyzing candidate matches.
- **Authentication & Access Control**: Complete user authentication system with email/password signup, email verification, password reset, JWT token storage, and protected routes.
- **Usage Tracking & Quota Limits**: Dynamic tracking of uploaded files and batch limits with automatic upgrade alerts.
- **Session Persistence**: All analysis reports, comparative outputs, and chat histories automatically persist in local storage.

---

## Architecture & Tech Stack

HireDesk is built as a single-page application (SPA) with Server-Side Rendering (SSR) support using React Router v7 and Vite.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            HireDesk React Frontend                          │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌─────────────────┐  │
│  │   React 19 + Vite 6   │  │   React Router v7     │  │  Tailwind CSS 4 │  │
│  │  Component Structure  │  │   App Routes / Pages  │  │   Dark Theme    │  │
│  └───────────┬───────────┘  └───────────┬───────────┘  └────────┬────────┘  │
│              │                          │                       │           │
│  ┌───────────┴──────────────────────────┴───────────────────────┴────────┐  │
│  │                     Contexts & State Management                      │  │
│  │       • AuthContext (JWT / User State)    • ToastContext (UI Alerts) │  │
│  └──────────────────────────────────┬───────────────────────────────────┘  │
│                                     │                                       │
│  ┌──────────────────────────────────┴───────────────────────────────────┐  │
│  │                 Axios API Service Layer & Interceptors               │  │
│  │       • Bearer Token Authentication      • Standardized Error Catch  │  │
│  └──────┬───────────────────────────┬───────────────────────────┬───────┘  │
└─────────┼───────────────────────────┼───────────────────────────┼───────────┘
          │                           │                           │
          ▼                           ▼                           ▼
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│   Auth Service   │        │   AI Analysis    │        │   AI Assistant   │
│   (User & JWT)   │        │     Engine       │        │     (EvaAI)      │
│ jobpsych-auth    │        │  hiredesk-ai     │        │    evaai-seven   │
└──────────────────┘        └──────────────────┘        └──────────────────┘
```

### Core Technologies

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.1.0` | Component-based UI engine |
| **React Router** | `^7.9.1` | Full-stack routing framework with SSR & route matching |
| **TypeScript** | `^5.8.3` | Type safety and strict data contract definitions |
| **Tailwind CSS** | `^4.1.4` | Utility-first styling with high-performance CSS engine |
| **Vite** | `^6.3.3` | Next-generation frontend build tool and dev server |
| **Axios** | `^1.12.2` | HTTP client with request/response interceptors |
| **Vitest** | `^3.2.4` | Blazing fast unit and component testing runner |
| **Docker** | `20-alpine` | Containerized production deployment pipeline |

---

## Complete Application Flow & User Journeys

### 1. User Onboarding & Authentication Flow

```
[ Visitor ] ──► Landing Page (/) ──► Click "Sign Up" / "Login"
                     │
                     ▼
             [/signup Page] ──► Submits Register Form (name, email, password, company)
                     │
                     ▼
             [Auth Service] ──► Sends Verification Email (JWT Token)
                     │
                     ▼
             [/verify-email] ──► Validates Token ──► Activates User Account
                     │
                     ▼
             [/login Page] ──► Enters Credentials ──► Receives Access Token
                     │
                     ▼
             [AuthContext] ──► Stores Token in LocalStorage ──► Navigates to [/dashboard]
```

1. **Registration**: User inputs account details on `/signup`. `authService.register()` sends registration payload to `API_AUTH_URL`.
2. **Email Verification**: User receives a verification email and completes activation via `/verify-email?token=...`.
3. **Login & Session Management**: User authenticates on `/login`. The returned JWT `accessToken` is stored in `localStorage`. `AuthContext` injects the token into all subsequent Axios HTTP requests via an Authorization header (`Bearer <token>`).
4. **Profile Management**: On `/profile`, users can view their company credentials, monitor uploaded file limits, and update their password.

---

### 2. Single Resume Analysis Flow

```
[ Dashboard / Navbar ] ──► Navigate to [/hiredesk-analyze]
                                  │
                                  ▼
                    [ Upload Resume & Job Details ]
              • File: PDF / DOC / DOCX (max 10MB)
              • Input: Target Role (e.g., Senior React Dev)
              • Input: Job Description (optional)
                                  │
                                  ▼
                        Click "Analyze Candidate"
                                  │
                                  ▼
                    [ aiService.hireDeskAnalyze() ]
              POST /hiredesk-analyze (Multipart Form Data)
                                  │
                                  ▼
                    [ Detailed Analysis Dashboard ]
       ┌──────────────────────────────────────────────────────────┐
       │ 1. Overall Fit Status (FIT / UNFIT / PARTIAL)            │
       │ 2. Match Score & AI Reasoning                            │
       │ 3. Parsed Candidate Resume Data (Skills, Experience, Edu)│
       │ 4. Smart Role Recommendations & Missing Skill Breakdown  │
       │ 5. AI Generated Technical & Behavioral Questions         │
       │ 6. Candidate Personality Insights                        │
       │ 7. Suggested Career Path Trajectory                      │
       └──────────────────────────────────────────────────────────┘
                                  │
                                  ▼
               Saved to LocalStorage (hiredesk_last_analysis)
```

1. **Input Submission**: User navigates to `/hiredesk-analyze` and uploads a candidate resume along with a target job title and job description.
2. **Processing**: The frontend transmits the file via `FormData` to `/hiredesk-analyze`.
3. **Visualization**:
   - **Fit Badge & Score**: Visual indicator showing fit level and detailed rationale.
   - **Resume Extraction**: Categorized view of candidate personal info, work experience timeline, education, and extracted skills.
   - **Interview Generator**: Tabbed list of generated Technical, Behavioral, and Scenario-Based interview questions with one-click copy functionality.
   - **Insights & Growth**: Graphs and breakdown cards for personality traits, work style, leadership score, and career trajectory.
4. **Persistence**: Analysis results remain stored in `localStorage` under `hiredesk_last_analysis`, allowing users to revisit results without re-uploading.

---

### 3. Batch Resume Processing Flow

```
[/batch-analyze Page] ──► Upload 2 to 5 Resumes (Drag & Drop)
                              │
                              ▼
                Set Target Role & Job Description
                              │
                              ▼
                Click "Run Batch Analysis"
                              │
                              ▼
                  [ aiService.batchAnalyze() ]
                  POST /batch-analyze
                              │
                              ▼
                ┌─────────────────────────────┐
                │    Batch Summary Bar        │
                │  Total | Success | Failed   │
                └──────────────┬──────────────┘
                               │
                               ▼
            ┌───────────────────────────────────┐
            │     Candidate Cards Grid          │
            │ Candidate A | Candidate B | ...   │
            └──────────────────┬────────────────┘
                               │
                               ▼
            Click "View Full Analysis" on Candidate
                               │
                               ▼
                 [ Candidate Detail Modal ]
        Full score breakdown, recommendations & questions
```

1. **Multi-File Upload**: User selects 2-5 candidate files on `/batch-analyze`.
2. **Batch Execution**: Files are sent in a single multipart request to `/batch-analyze`.
3. **Summary & Cards**: The system renders high-level statistics (successful parses, failure rate, score averages) and candidate summary cards with individual fit status labels.
4. **Modal Deep Dive**: Clicking any candidate card launches a comprehensive `BatchDetailModal` containing full candidate metrics.

---

### 4. Multi-Resume Comparison Flow

```
[/compare-resumes Page] ──► Upload 2 to 5 Resumes
                               │
                               ▼
                 Click "Compare Candidates"
                               │
                               ▼
                 [ aiService.compareResumes() ]
                 POST /compare-resumes
                               │
                               ▼
               ┌──────────────────────────────┐
               │    Ranked Leaderboard        │
               │  #1 Candidate A (92% Score)  │
               │  #2 Candidate B (84% Score)  │
               └───────────────┬──────────────┘
                               │
                               ▼
             ┌──────────────────────────────────┐
             │   Side-by-Side Comparison Matrix │
             │ Technical Skills | Experience    │
             │ Education        | Strengths     │
             └──────────────────────────────────┘
```

1. **Upload Candidates**: User submits candidate files for head-to-head comparison.
2. **Ranking Engine**: The API returns candidate scores, comparative strengths, weaknesses, and a recommended winner.
3. **Side-by-Side Matrix**: Displays a structured comparison table allowing hiring managers to evaluate candidates against identical parameters simultaneously.

---

### 5. Candidate Selection Engine Flow

```
[/selection-candidates Page] ──► Upload Candidate Resumes (1-5 Files)
                                       │
                                       ▼
                       Specify Job Title & Skill Keywords
                    (e.g., "React Developer", "TypeScript, GraphQL, Node.js")
                                       │
                                       ▼
                       Click "Evaluate Candidates"
                                       │
                                       ▼
                       [ aiService.selectCandidates() ]
                       POST /selection-candidate
                                       │
                                       ▼
                     ┌───────────────────────────────────┐
                     │     Candidate Selection Results   │
                     │ Candidate 1: FIT   - Reason...    │
                     │ Candidate 2: REJECT- Reason...    │
                     └───────────────────────────────────┘
```

1. **Filtering Setup**: Recruiter provides candidate files and defines strict filtering parameters (Job Title + Mandatory Skill Keywords).
2. **Automated Filtering**: The API evaluates every resume against the keywords and returns an instant `FIT` or `REJECT` decision accompanied by justification.

---

### 6. Interactive AI HR Assistant Flow

```
[/hiredesk-chat Page] ──► Select Query Type & Context
        ┌───────────────────────────────────────────────────────────┐
        │ Types: Candidate Screening | Interview Questions |        │
        │        Job Posting Draft   | Candidate Match Query        │
        └─────────────────────────────┬─────────────────────────────┘
                                      │
                                      ▼
                        Type Message or Click Quick Prompt
                                      │
                                      ▼
                       [ assistantService.query() ]
                       POST /hiredesk/query
                                      │
                                      ▼
                        Real-time AI Chat Response
                    Formatted markdown response with context
```

1. **Assistant Setup**: Hiring manager opens `/hiredesk-chat` and checks real-time operational status of EvaAI (`assistantService.getStatus()`).
2. **Query Execution**: User selects query category (Screening, Interview Questions, Job Posting, Candidate Match) and enters custom prompts or selects quick prompt shortcuts.
3. **Conversational Insights**: AI outputs structured HR recommendations, complete job description drafts, or interview scoring rubrics.

---

### 7. User Profile & Usage Limits Flow

```
[/profile Page] ──► View User Details & Subscription Quota
                          │
                          ▼
            ┌─────────────────────────────┐
            │ Total Files Uploaded: 18    │
            │ Limit: 25 Files             │
            │ Approaching Limit Alert!    │
            └─────────────┬───────────────┘
                          │
                          ▼
             Update Password / Account Credentials
                          │
                          ▼
                [ UpgradeModal Trigger ]
          Prompted when upload quota limit is reached
```

---

## 📁 Project Directory Structure

```bash
frontend/
├── app/                              # Core React Application Source Code
│   ├── app.css                       # Global CSS & Tailwind Custom Styling Rules
│   ├── root.tsx                      # Root Application Layout & HTML Shell
│   ├── routes.ts                     # React Router v7 Route Mapping Manifest
│   ├── components/                   # Modular UI Component Tree
│   │   ├── analysis/                 # Resume analysis visualizers (Score, Personality, Trajectory)
│   │   ├── assistant/                # AI HR Chat components (ChatWindow, Messages, Prompts)
│   │   ├── auth/                     # Authentication components (AuthCard, LoginForm, SignupForm)
│   │   ├── batch/                    # Batch processing UI (BatchUploader, Cards, Summary)
│   │   ├── comparison/               # Resume comparison UI (ComparisonMatrix, Leaderboard)
│   │   ├── layout/                   # Layout wrappers (Navbar, Footer, UserMenu, PageContainer)
│   │   ├── modals/                   # System modals (UpgradeModal, TermsModal, LimitWarning)
│   │   ├── resume/                   # Single resume UI (FileUploader, Questions, SkillsMatch)
│   │   ├── toast/                    # Notification alert system (ToastContainer, ToastItem)
│   │   └── ui/                       # Reusable UI Primitives (Button, Card, Badge, Modal, Input)
│   ├── contexts/                     # Application State Context Providers
│   │   ├── AuthContext.tsx           # Authentication, User State & JWT Token Lifecycle
│   │   └── ToastContext.tsx          # Global Toast Notification State Provider
│   ├── data/                         # Static Data & Promotional Content
│   │   ├── BatchFeatures.tsx         # Features & Specs for Batch Processing
│   │   └── features.tsx              # Platform Feature Highlights Data
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useForm.ts                # Generic Form Handler Hook with Validation
│   │   └── useToastHelpers.ts        # Helper Hook for Dispatching Toast Notifications
│   ├── routes/                       # React Router Page Route Components
│   │   ├── 404.tsx                   # Page Not Found Route
│   │   ├── about.tsx                 # About HireDesk Page
│   │   ├── batch-analyze.tsx         # Batch Resume Analysis Route
│   │   ├── compare-resumes.tsx       # Resume Comparison Matrix Route
│   │   ├── contact.tsx               # Contact & Support Route
│   │   ├── dashboard.tsx             # Main User Control Center
│   │   ├── forgot-password.tsx       # Password Reset Request Route
│   │   ├── hiredesk-analyze.tsx      # Single Resume AI Analysis Route
│   │   ├── hiredesk-chat.tsx         # AI HR Assistant Chat Route
│   │   ├── home.tsx                  # Public Landing Page Route
│   │   ├── login.tsx                 # User Login Route
│   │   ├── profile.tsx               # User Account & Quota Settings
│   │   ├── resend-verification.tsx   # Resend Email Verification Route
│   │   ├── reset-password.tsx        # Password Reset Token Confirmation
│   │   ├── selection-candidates.tsx  # Candidate Selection & Filtering Engine
│   │   ├── signup.tsx                # User Registration Route
│   │   └── verify-email.tsx          # Email Verification Handler Route
│   ├── services/                     # External API Integration Services
│   │   ├── aiService.ts              # Resume Analysis, Batch, Compare & Selection API Calls
│   │   ├── assistantService.ts       # EvaAI HR Chat & Status API Calls
│   │   ├── authService.ts            # Authentication, Signup, Reset & Profile API Calls
│   │   └── fileService.ts            # File Upload Logging & Quota Tracker API Calls
│   └── utils/                        # System Utility Functions & Interceptors
│       ├── api.ts                    # Backend Service Base URLs Configuration
│       └── errorHandler.ts           # Standardized API Error Parser
├── build/                            # Production Build Output (Server & Client)
├── public/                           # Static Assets (Logos, Icons, Images)
├── types/                            # Centralized TypeScript Declarations
│   ├── index.ts                      # Core Data Contracts & API Payload Specifications
│   └── components.ts                 # React Component Prop Interfaces
├── .dockerignore                     # Docker Build Exclusions File
├── .env.example                      # Environment Variables Blueprint
├── .gitignore                        # Git Source Control Exclusions
├── AGENTS.md                         # Security Audit & Pre-Production Checklist
├── Dockerfile                        # Multi-Stage Production Docker Build File
├── Makefile                          # Convenient Docker & Local Automation Commands
├── nginx/                            # Production Nginx Reverse Proxy Configuration
├── package.json                      # NPM Dependencies & Project Scripts
├── react-router.config.ts            # React Router v7 Configuration
├── tsconfig.json                     # Strict TypeScript Compiler Options
└── vite.config.ts                    # Vite Build Tool Configuration
```

---

## Prerequisites & Installation

### Prerequisites

Ensure your system satisfies the following software requirements:

- **Node.js**: `v20.0.0` or higher
- **NPM**: `v10.0.0` or higher (or Yarn / PNPM)
- **Git**: `v2.30.0` or higher

### Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrafiqdot825/HireDesk.git
   cd HireDesk
   ```

2. **Install project dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Launch the development server**
   ```bash
   npm run dev
   ```
   Access the application locally at `http://localhost:5173` (or the URL assigned by Vite).

---

## Environment Configuration

HireDesk relies on client environment variables for backend API routing. Create a `.env` file in the root directory based on `.env.example`:

```env
# Application Information
VITE_APP_NAME=HireDesk
VITE_APP_VERSION=1.0.0

# Base API URL
VITE_API_URL=https://hiredesk-ai.vercel.app/api

# Microservice API Endpoints
VITE_AI_API=https://hiredesk-ai.vercel.app/api
VITE_AI_ASSISTANT_API=https://evaai-seven.vercel.app/api/ai
VITE_API_AUTH_URL=https://jobpsych-auth.vercel.app/api
```

> **Security Note**: Never expose private API secret keys in frontend environment variables. Variables prefixed with `VITE_` are bundled directly into browser JavaScript.

---

## Available Scripts

Run the following commands using `npm run <command>`:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Builds the client and server assets for production using React Router |
| `npm run start` | Launches the production SSR server using `@react-router/serve` |
| `npm run typecheck` | Executes React Router typegen and TypeScript strict type checking |
| `npm run test` | Runs unit and component tests with Vitest |
| `npm run test:run` | Runs all Vitest tests once without watch mode |
| `npm run test:coverage` | Generates code coverage reports via `@vitest/coverage-v8` |
| `npm run test:ui` | Opens the interactive Vitest UI runner in the browser |

---

## API Services & Endpoints

HireDesk connects to microservices via structured Axios modules located in `app/services/`:

### 1. Resume Analysis API (`aiService.ts`)
* **Endpoint**: `/hiredesk-analyze` (`POST`) - Analyzes single resume file + role + job description.
* **Endpoint**: `/batch-analyze` (`POST`) - Analyzes 2-5 resumes simultaneously.
* **Endpoint**: `/compare-resumes` (`POST`) - Ranks and compares 2-5 candidate resumes.
* **Endpoint**: `/selection-candidate` (`POST`) - Evaluates candidate FIT/REJECT status based on job title and skill keywords.

### 2. AI Assistant API (`assistantService.ts`)
* **Endpoint**: `/hiredesk/query` (`POST`) - Sends custom queries to EvaAI HR Assistant.
* **Endpoint**: `/status` (`GET`) - Returns real-time health status of the AI assistant service.

### 3. Auth API (`authService.ts`)
* **Endpoint**: `/auth/register` (`POST`) - Registers new user account.
* **Endpoint**: `/auth/login` (`POST`) - Authenticates user and issues JWT.
* **Endpoint**: `/auth/profile` (`GET`, `PUT`) - Fetches/updates authenticated user profile.
* **Endpoint**: `/auth/verify-email` (`POST`) - Confirms email verification token.
* **Endpoint**: `/auth/forgot-password` (`POST`) - Triggers password reset email.
* **Endpoint**: `/auth/reset-password` (`POST`) - Updates user password via reset token.

---

## Data Persistence & State Management

HireDesk uses a hybrid state management model combining React Context and browser LocalStorage:

- **`AuthContext`**: Handles token lifecycle and user profile state across all routes. Automatically re-authenticates users on refresh if a valid token exists.
- **`ToastContext`**: Provides non-blocking global alert notifications.
- **Local Storage Caching**:
  - `accessToken`: JWT authorization bearer token.
  - `user`: Serialized user profile summary.
  - `hiredesk_last_analysis`: Single resume analysis results cache.
  - `hiredesk_batch_analysis`: Batch processing results cache.
  - `hiredesk_comparison_analysis`: Multi-resume comparison cache.
  - `hiredesk_selection_analysis`: Candidate selection output cache.
  - `hiredesk_chat_history`: EvaAI chat message history cache.

---

## UI/UX Design System

HireDesk uses a sleek, modern **Glassmorphism Dark Theme** configured in `app/app.css` and Tailwind CSS:

* **Typography**:
  * **Sans-Serif**: `Inter` (UI elements, body text, buttons)
  * **Serif**: `Tinos` (Headings, titles, hero section)
  * **Monospace**: `JetBrains Mono` (Code blocks, JSON specs, token outputs)
* **Color Palette**:
  * **Background**: Deep Navy (`#0b1220`)
  * **Card Surface**: Glassmorphism semi-transparent slate (`rgba(30, 41, 59, 0.7)`) with backdrop blur (`backdrop-blur-md`)
  * **Primary Accent**: Electric Blue (`#2563eb`) to Purple (`#7c3aed`) gradient buttons
  * **Status Colors**: Green (`#10b981` FIT), Red (`#ef4444` REJECT), Yellow (`#f59e0b` PARTIAL)

---

## Deployment Guide

### Local Production Server

```bash
# 1. Build production bundle
npm run build

# 2. Test production build locally
npm run start
```

---

### Docker & Docker Hub

HireDesk is pre-packaged as a Docker image published on Docker Hub.

#### Pull & Run Official Image

```bash
# Pull latest image from Docker Hub
docker pull rafiq9323/hiredesk:latest

# Run container on port 3000
docker run -d \
  --name hiredesk-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  rafiq9323/hiredesk:latest
```

#### Build Docker Image Locally

```bash
docker build -t hiredesk:local .
docker run -d -p 3000:3000 hiredesk:local
```

---

### Docker Compose Profiles

HireDesk includes a multi-profile `docker-compose.yml` for different environments:

#### 1. Production Profile (App + Nginx Proxy)
```bash
docker compose --profile prod up -d
```

#### 2. Development Profile (Hot Reload + Mock Backend)
```bash
docker compose --profile dev up -d
```

#### 3. Full Environment Profile (App + Nginx + Redis + Postgres)
```bash
docker compose --profile full up -d
```

---

## Testing & Quality Assurance

HireDesk includes unit and component tests using Vitest and React Testing Library:

```bash
# Run type check
npm run typecheck

# Run tests in watch mode
npm run test

# Run tests once with coverage report
npm run test:coverage
```

Test files are organized in `__tests__/` and cover key services, context providers, and UI components.

---

## Security & Production Readiness

HireDesk adheres to the **Pre-Production Security Checklist** outlined in `AGENTS.md`:

1. **Secrets Isolation**: No sensitive keys are hardcoded in source code; all API URLs are loaded via environment variables.
2. **PII Data Protection**: Sensitive authentication data (passwords, tokens) are never outputted in `console.log` statements.
3. **Session Safety**: Authorization headers are dynamically injected; invalid tokens trigger controlled authentication recovery.
4. **Input Handling**: Uploaded resume files are checked client-side for file extension, MIME type, and size limits (max 10MB).
5. **Clean Error Handling**: Errors are intercepted and transformed into user-friendly notifications without leaking internal server stack traces.

---

## Contributing

We welcome community contributions! Please follow these guidelines:

1. **Fork the Repository**
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes using Conventional Commits**:
   ```bash
   git commit -m "feat: add multi-role candidate selection filter"
   ```
4. **Verify TypeScript & Tests**:
   ```bash
   npm run typecheck
   npm run test:run
   ```
5. **Push to Branch & Open a Pull Request**:
   ```bash
   git push origin feature/amazing-feature
   ```

---

<p align="center">
  Built with ❤️ using <b>React 19</b>, <b>TypeScript</b>, <b>React Router v7</b>, and <b>AI</b>
</p>
