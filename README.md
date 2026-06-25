# ZipTrip Tech Assignment - Full Stack Todo Application

This repository contains a small full-stack todo application built to satisfy a multi-page React/Next.js assignment. The project is split into a Next.js frontend and an Express backend that persists data to a local JSON file.

## Project Overview

The application is intentionally not a single-page app. The frontend uses the Next.js Pages Router and standard HTML anchors for page navigation so that clicking through the application triggers real page loads. Query parameters are read directly from `window.location.search` on the detail page.

The backend is a simple Node.js + Express server with a file-based data store. Todo records are saved in `backend/todos.json`, which keeps the project lightweight and easy to run without a database.

## Tech Stack

- Frontend: Next.js 16, React 19, axios
- Backend: Node.js, Express.js, cors
- Storage: Local JSON file (`backend/todos.json`)
- Styling: Inline CSS in the page components

## Repository Structure

- `backend/`
	- `server.js`: Express API server with CRUD endpoints
	- `todos.json`: File-backed todo data store
	- `package.json`: Backend dependencies and metadata
- `frontend/`
	- `pages/index.js`: Home page / todo list page
	- `pages/todo.js`: Single todo details page
	- `app/`: Remaining App Router files from the Next.js starter template
	- `package.json`: Frontend dependencies and scripts
	- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`: Next.js tooling configuration

## Application Architecture

### Frontend routing model

The user-facing routes are implemented in the Pages Router:

- `/` renders the todo list and add/delete controls.
- `/todo?id=123` renders an individual todo details page.

The detail navigation uses a plain `<a href="/todo?id=...">` link instead of `Link` or `router.push`. This keeps the interaction as a true multi-page navigation, which is part of the assignment requirement.

### Data flow

1. The list page loads todos from `GET http://localhost:5000/api/todos` when the component mounts.
2. Adding a todo submits `POST http://localhost:5000/api/todos` with `{ title }`.
3. Deleting a todo calls `DELETE http://localhost:5000/api/todos/:id`.
4. The details page reads the `id` query parameter from the URL and fetches `GET http://localhost:5000/api/todos/:id`.
5. After mutations, the list page refreshes the todos from the backend so the UI stays in sync.

### Backend storage model

Todos are stored as JSON objects in `backend/todos.json`. The current shape of a record is:

```json
{
	"id": "1782407304177",
	"title": "cds preparations",
	"completed": false,
	"description": "Added from UI"
}
```

The backend generates the `id` using `Date.now().toString()` for new records and always persists the updated array back to the JSON file.

## Frontend Pages

### Home page (`/`)

The home page is the main todo list view. It includes:

- a hero/header section with the project title
- a form for adding a new todo
- a responsive list/grid of todo items
- delete actions for each item
- a standard anchor link to the details page for each todo

The list page uses `useState` and `useEffect` to load data on mount and manage form state.

### Todo details page (`/todo?id=xxx`)

The detail page is a separate route that:

- reads the `id` from `window.location.search`
- fetches the selected todo from the backend
- shows a loading state while the request is in progress
- displays the todo title, ID, description, and completed status once loaded
- includes a plain link back to the home page

## Backend API Reference

### `GET /api/todos`

Returns the full list of todos from `todos.json`.

### `GET /api/todos/:id`

Returns a single todo by ID. If the ID does not exist, the server responds with a 404 and `{ error: "Not found" }`.

### `POST /api/todos`

Creates a new todo entry.

Request body example:

```json
{ "title": "Finish assignment" }
```

The backend stores the new record with:

- a generated string `id`
- the provided `title`
- `completed: false`
- `description: "Added from UI"`

### `PUT /api/todos/:id`

Updates an existing todo by merging the request body into the matching record.

### `DELETE /api/todos/:id`

Removes a todo from the JSON file.

## Running the Project

### 1. Start the backend

```bash
cd backend
node server.js
```

The API runs on `http://localhost:5000`.

### 2. Start the frontend

```bash
cd frontend
npm run dev
```

The web app runs on `http://localhost:3000`.

## Build and Verification

To verify the frontend production build:

```bash
cd frontend
npm run build
```

The build succeeds with the current codebase.

## Notes

- The frontend currently includes both `app/` and `pages/` directories, but the user-facing routes are implemented in `pages/` to satisfy the multi-page requirement.
- Navigation between pages is intentionally done with standard anchors to avoid SPA-style client-side routing.
- The backend uses a simple file-based store, so changes are persisted directly to `backend/todos.json`.
- If you add more todos in the UI, they will appear in the JSON file immediately after the POST request succeeds.