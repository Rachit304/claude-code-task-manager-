# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies (Node 18+)
- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build` — production build to `dist/` (git-ignored)
- `npm run preview` — serve the production build

There is no test runner, linter, or formatter configured yet.

## Architecture

Taskflow is a React 18 + Vite single-page task manager with no backend. It was converted from a single vanilla-JS script (`src/app.js` + a static `index.html`); that version is preserved in git history at commit `21d0773`.

- **State lives only in `src/App.jsx`.** It owns `tasks` and `filter`, defines every mutation (`addTask`, `updateTask`, `deleteTask`, `clearCompleted`), and derives the counts, progress percentage, and filtered list on each render. Components under `src/components/` are presentational and receive data and callbacks as props.
- **Persistence goes through `src/api/taskStore.js` only.** `App.jsx` loads tasks once via the lazy `useState(loadTasks)` initializer and saves them in a `useEffect` on every `tasks` change. This module is the intended seam for a future backend: swap its `localStorage` calls for API calls (they would need to become async) without touching the components.
- **Task shape:** `{ id (crypto.randomUUID), title, priority: "high"|"medium"|"low", dueDate: "YYYY-MM-DD" or "", completed, createdAt (ISO) }`. New tasks are prepended. Storage key is `taskflow-tasks-v1`; change the suffix if the shape changes incompatibly.
- **Styling** is one global `src/styles.css` (class names are used directly, no CSS modules). Class names and `id="taskForm"` carried over from the original markup, so keep them in sync with the CSS.

## Known gaps

- `saveTasks` has no try/catch, and `loadTasks` doesn't validate the shape of parsed data (it only catches parse errors).
- Due dates have no validation, no year in the display, and no overdue handling.
- `npm audit` flags Vite 5's esbuild (dev-server-only); the fix is a breaking upgrade to Vite 8.

## Git

`origin` is `https://github.com/Rachit304/claude-code-task-manager-.git` (note the trailing hyphen in the repo name), branch `main`. This project is its own repo, nested inside the parent `D:\Project` repo, which has a different remote.
