# Music Library Micro Frontend

A modern, responsive music library application built with React and micro frontend architecture using Module Federation.

## Features

- **Micro Frontend Architecture**: Built with Module Federation for independent deployment
- **Authentication**: Role-based access control (Admin/User)
- **Music Management**: View, filter, sort, and group songs
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS

## Project Structure

```
music-library-micro-frontend/
├── main-app/             # Main application (host)
├── music-library-mf/     # Music library micro frontend (remote)
├── start-all.js          # Script to start both applications
└── package.json          # Root package.json with useful scripts
```

## Prerequisites

- Node.js (v16 or later)
- npm (v7 or later) or yarn

## Getting Started

### 1. Install Dependencies

From the root directory, run:

```bash
# Install root dependencies
npm install

# Install dependencies for both main app and micro frontend
npm run install:all
```

### 2. Start Development Servers

#### Option 1: Start both applications with a single command (recommended)

```bash
# From the root directory
npm start
```

This will start both the micro frontend and the main application with the correct configuration.

#### Option 2: Start applications separately

In separate terminal windows:

```bash
# Terminal 1 - Start the Micro Frontend
cd music-library-mf
npm run dev

# Terminal 2 - Start the Main Application
cd ../main-app
npm run dev
```

## Access the Application

- **Main Application**: http://localhost:5173
- **Micro Frontend**: http://localhost:4173 (only needed for development)

## Login Credentials

- **Admin User**:
  - Username: `admin`
  - Password: `admin123`

- **Regular User**:
  - Username: `user`
  - Password: `user123`

## Available Scripts

From the root directory:

- `npm start` - Start both applications in development mode
- `npm run build` - Build both applications for production
- `npm run preview` - Preview the production build locally
- `npm run clean` - Clean build artifacts from both applications
- `npm run install:all` - Install dependencies for all projects

## Development Notes

1. **Development Workflow**:
   - The micro frontend must be running before the main app in development
   - The main app expects the micro frontend to be available at `http://localhost:4173`
   - Any changes to the micro frontend will be hot-reloaded automatically

2. **Troubleshooting**:
   - If you see a blank page, check the browser console for errors
   - Ensure both applications are running on their respective ports
   - Clear browser cache if you encounter stale content

3. **Production Deployment**:
   - Build the micro frontend first
   - Update the main app's Vite config with the production URL of the micro frontend
   - Build the main app
   - Deploy both applications to your hosting provider

## License

MIT
