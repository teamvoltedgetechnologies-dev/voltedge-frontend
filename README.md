# Voltedge React

A modern, high-performance React application for the Voltedge platform, built with [Vite](https://vitejs.dev/) for fast development and optimized production builds.

## Overview

Voltedge React is a full-featured frontend application for managing and showcasing electrical products and services. The application includes comprehensive routing, responsive design, and seamless integration with the Voltedge backend API.

## Features

- ⚡ **Lightning-Fast Development** - Powered by Vite with Hot Module Replacement (HMR)
- 🎯 **Client-Side Routing** - Navigate seamlessly with React Router v7
- 📱 **Responsive Design** - Mobile-first UI components
- 🔌 **API Integration** - Configured proxy for backend communication
- ✅ **Code Quality** - ESLint configured for code consistency
- 🏗️ **Modular Architecture** - Organized component and page structure

## Tech Stack

- **Frontend Framework:** React 19.2.4
- **Build Tool:** Vite 8.0.1
- **Routing:** React Router DOM 7.13.2
- **Linting:** ESLint 9.39.4
- **Development Server:** Vite Dev Server with HMR

## Project Structure

```
voltedge-react/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── Contact.jsx
│   │   ├── AdminAuth.jsx
│   │   └── AdminDashboard.jsx
│   ├── assets/              # Static assets
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Application entry point
│   ├── App.css              # Global styles
│   └── index.css            # Base styles
├── public/                  # Static files
├── dist/                    # Production build output
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── eslint.config.js         # ESLint configuration
```

## Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd voltedge-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` with Hot Module Replacement enabled for instant code updates.

### Run Linter

Check code quality and style compliance:

```bash
npm run lint
```

## Production Build

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

## API Integration

The application is configured with a proxy to communicate with the Voltedge backend API:

- **API Base URL:** `http://localhost:3000` (development)
- **Proxy Path:** `/api`

Requests to `/api/*` are automatically forwarded to the backend API. Configure the target in [vite.config.js](vite.config.js) as needed for different environments.

## Pages & Components

### Pages
- **Home** - Landing page with product showcase
- **About** - Company information and mission
- **Products** - Product catalog
- **Contact** - Contact form and information
- **Admin Auth** - Admin authentication portal
- **Admin Dashboard** - Administrative management interface

### Components
- **Navbar** - Navigation header
- **Footer** - Site footer

## Performance Metrics

Production build sizes (gzipped):
- CSS: 2.40 kB
- JavaScript: 80.76 kB
- HTML: 0.43 kB

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint code quality checks |

## Browser Support

Works with all modern browsers supporting ES2020+.

## Environment Configuration

To configure different environments, update the proxy target in `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'YOUR_API_URL',
    changeOrigin: true
  }
}
```

## Deployment

### Deploy to Popular Platforms

- **Netlify:** Connect your Git repository and select `npm run build` as build command
- **Vercel:** Similar process; automatically detects Vite
- **GitHub Pages:** Use the `dist/` folder as your static content

## Contributing

Contributions are welcome. Please ensure all code passes linting:

```bash
npm run lint
```

## License

This project is part of the Voltedge platform.

## Support

For issues, questions, or contributions, please contact the development team or create an issue in the project repository.
