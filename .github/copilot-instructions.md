# Repository Guidelines

ThreadHive is split into two independent npm packages. Run commands from the relevant package directory.

## Build, test, and lint

Frontend (`threadhive-frontend-oct24`):

- `npm run dev` starts Vite; `npm run build` creates the production build.
- `npm run lint` runs ESLint. To lint one file, use `npm run lint -- src/pages/Auth/Login.jsx`.
- There is no frontend test script.

Backend (`threadhive-backend-oct24`):

- `npm run dev` starts the server with nodemon; `npm start` starts it with Node.
- `npm test` runs the Vitest suite. To run one file, use `npm test -- tests/unit/services/threadService.test.js`; add `-t "test name"` to select one test.
- Tests are under `tests/unit` and `tests/integration`; Vitest uses the Node environment and integration setup in `tests/setup.js`.

The backend needs MongoDB and the environment values listed in `.env.example` (`MONGODB_URI`, `PORT`, `JWT_SECRET`, and `NODE_ENV`). The frontend API client targets `http://localhost:3000/api` by default; override it with `VITE_API_BASE_URL`. It must match the backend `PORT`.

## Architecture

- The frontend is a React 19 single-page app built with Vite and React Router. `src/App.jsx` declares routes; `src/pages` implement screens and `src/components` hold shared UI.
- Frontend API calls flow from `src/services` through `src/api/apiClient.js`; endpoint paths are centralized in `src/config/apiConfig.js`. The client attaches the stored token and unwraps the API response in each service. Authentication state and persistence are handled in `src/context/AuthContext.jsx`; protected pages use `src/components/PrivateRoute`.
- The backend starts in `main.js`, connects to MongoDB via `db.js`, and serves the Express app from `src/app.js`. Routes apply middleware and dispatch to controllers; controllers validate/request-shape and format responses, while services perform business logic and Mongoose persistence using schemas in `src/models`.
- Backend endpoints are mounted under `/api` in `src/app.js`: auth, threads, subreddits, comments, and votes. Responses follow `{ success, message, data }` on success; centralized error middleware returns `{ success: false, message }`.

## Conventions

- Keep frontend endpoint paths in `src/config/apiConfig.js`, request/error handling in `src/api/apiClient.js`, and resource-specific API operations in the matching `src/services` module.
- Keep backend HTTP concerns in routes/controllers and data/business operations in services. Use `createAppError` for errors that need an HTTP status; let the centralized `errorHandler` shape the response.
- Backend tests use Vitest and Supertest. Unit tests are grouped by the layer under test; integration tests exercise the mounted API and use the shared MongoDB test setup.
- Mongoose references connect threads, comments, subreddits, and users; populate related records in service methods when API responses need those related fields.
