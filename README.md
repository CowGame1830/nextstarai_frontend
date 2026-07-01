# NextStarAI - Frontend

This is the frontend dashboard application for the Football Analysis Project, built with [Next.js](https://nextjs.org/) (App Router), TypeScript, and Tailwind CSS. It communicates with the Python backend to visualize player tracking, team statistics, and analysis details.

---

## Installation & Setup

Follow these steps to set up and run the frontend project locally:

### 1. Prerequisites
Ensure you have **Node.js** (v18.x or higher recommended) and **npm** (or yarn/pnpm) installed.

### 2. Install Dependencies
Navigate to the frontend directory and install the required packages:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` or `.env` file in the root of the frontend directory (or copy the example file):
```bash
cp .env.example .env
```
Inside the `.env` file, configure the backend API URL:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 4. Run the Development Server
Start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Project Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the production application.
- `npm run start`: Starts the Next.js production server after building.
- `npm run lint`: Runs ESLint to check for code quality issues.
