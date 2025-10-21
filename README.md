# Crate Planner Frontend

A Vue.js application for planning and organizing crates, built with modern web technologies.

## 🚀 Features

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Modern CSS** with responsive design
- **API Integration** with Counter backend service
- **Error Handling** for robust API communication

## 📦 Tech Stack

- Vue 3
- TypeScript
- Vite
- CSS3
- Fetch API for HTTP requests

## 🛠️ Development

### Prerequisites

- Node.js (version 16 or higher)
- npm
- Backend API running on http://localhost:8000 (Counter service)

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## 📁 Project Structure

```
src/
├── App.vue              # Main Vue component with Counter demo
├── main.ts              # Application entry point
├── style.css            # Global styles
├── services/
│   └── counterApi.ts    # API service for Counter endpoints
└── config/
    └── env.ts           # Environment configuration
```

## 🔌 API Integration

The application includes a Counter API service that demonstrates integration with your backend:

- **Increment**: POST `/api/Counter/increment`
- **Decrement**: POST `/api/Counter/decrement` 
- **Reset**: POST `/api/Counter/reset`

The API service includes:
- TypeScript interfaces for type safety
- Error handling with user-friendly messages
- Loading states for better UX
- Configurable base URL via environment variables

## 🎯 Next Steps

This Vue.js application is now ready for development. You can:

1. Test the Counter API integration (make sure backend is running on localhost:8000)
2. Add new Vue components in the `src/components/` directory
3. Set up routing with Vue Router
4. Add state management with Pinia
5. Expand the API service for additional endpoints
6. Add testing with Vitest

Happy coding! 🎉
