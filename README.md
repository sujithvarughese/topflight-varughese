# Topflight Apps- Sujith Varughese Project

A modern web application built with Next.js, React, and TypeScript, integrating a comprehensive suite of tools for fast, scalable, and maintainable development. This project leverages popular libraries and follows best practices for styling, state management, authentication, and theming.

---

## Features

- **React 19** with **TypeScript**
- **Next.js 15** for SSR and routing
- **Radix UI** and **Lucide Icons** for modern, accessible components
- **Redux Toolkit** for state management
- **NextAuth** for authentication
- **Tailwind CSS** for utility-first styling
- **Theming support** via next-themes
- **Strict linting & formatting** with ESLint
- **Fast animations** with tw-animate-css

---

## Quick Start

### Requirements

- **Node.js** (v18 or newer)
- **npm**

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd topflight-varughese
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Duplicate `.env.local.example` (if provided) as `.env.local` and add the required keys.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app should be running at http://localhost:3000

---

## Running a Production Build

To build and run the application in production mode:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```
   By default, the production server will run on [http://localhost:3000](http://localhost:3000).

If you wish to run the server on a different port, set the `PORT` environment variable before starting: