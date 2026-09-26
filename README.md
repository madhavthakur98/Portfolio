# Madhav Thakur - Portfolio

A futuristic, interactive, single-page portfolio built with React and Vite. It features a dark engineering design, 3D canvas micro-interactions, and a fully functional embedded terminal.

## ✨ Features

- **Interactive Terminal:** A working web-based shell at the `#terminal` section. Features include:
  - Clickable command chips and full keyboard support (arrow-key history, tab completion).
  - Commands to fetch profile data: `about`, `skills`, `projects`, `experience`, `education`, `contact`.
  - Easter eggs: `sudo hire madhav`, `theme light`, `ls`, `whoami`, `exit`.
  - Resume download via the `resume` command.
- **Futuristic Hero Section:** 
  - **VectorField:** A 3D canvas point cloud visualizing the tech stack with nearest-neighbor edges, synapse pulses, and cursor parallax.
  - **Text Glitch Effects:** Name resolves from scrambled glyphs.
  - **Magnetic Buttons:** Call-to-action buttons that organically lean toward the cursor.
- **Modern UI/UX:** Responsive layout with dark mode defaults, clean typography (Space Grotesk & JetBrains Mono), and smooth scroll progression.

## 🚀 Getting Started

This project is built with [Vite](https://vitejs.dev/) and React 19.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/madhavthakur98/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:
```bash
npm run build
```
The optimized files will be generated in the `dist` directory.

## 🚢 Deployment (Vercel)

This project is optimized for zero-config deployment on Vercel:
1. Push your code to GitHub.
2. Import the project in Vercel.
3. Vercel will automatically detect the **Vite** framework and configure the build settings (`npm run build` and output directory `dist`).
4. Click **Deploy**.

## 📄 License

This project is for personal portfolio use.
