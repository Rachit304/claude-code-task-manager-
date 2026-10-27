# Taskflow — Claude Code Practice Project

A small, dependency-free task manager built with HTML, CSS, and vanilla JavaScript. It is intentionally simple so you can practice asking Claude Code to understand, test, improve, and refactor an existing codebase.

## Features included

- Create tasks with a priority and optional due date
- Mark tasks complete or active
- Delete individual tasks
- Filter all, active, and completed tasks
- See summary counts and completion progress
- Save tasks in browser `localStorage`
- Responsive layout for mobile and desktop

## Run it locally

No package installation or build step is required.

1. Extract this folder.
2. Open `index.html` in a browser.

For a local development server, if Python is installed, run this command from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Start Claude Code

Open a terminal in this folder and run:

```bash
claude
```

If this is your first time using Claude Code, authenticate when prompted. Once inside, try `/init` to create a project-specific `CLAUDE.md`.

## Learning roadmap

Try these tasks one at a time. Ask Claude to explain its plan before making changes, review the diff, and run the app after each change.

1. **Understand the codebase:** "Explain how this app works. Trace what happens when I add a task, and identify the main functions."
2. **Add tests:** "Propose a lightweight testing setup for the task logic. Explain the trade-offs before changing files."
3. **Add editing:** "Let users edit a task title and due date. Keep the UI accessible and add tests."
4. **Improve validation:** "Prevent invalid due dates and handle corrupted localStorage safely. Add tests for edge cases."
5. **Sort and search:** "Add a search box and sorting by priority or due date."
6. **Refactor:** "Identify one maintainability issue and propose a small refactor. Do not change behavior."
7. **Add dark mode:** "Add a theme toggle and persist the selected theme."
8. **Review quality:** "Review this project for bugs, accessibility, and security concerns. Report findings before fixing anything."
9. **Create project guidance:** Run `/init`, then review the generated `CLAUDE.md` and correct anything inaccurate.

## Good habits while learning

- Give Claude one focused task at a time.
- Start larger tasks in plan mode and review the plan.
- Ask which files it intends to change and why.
- Read the diff before accepting changes.
- Ask Claude to run tests and explain any failures.
- Use Git commits so you can compare versions or revert changes.

## Current limitations to explore

- Tasks are stored only in the current browser's local storage.
- There is no backend, login, or sync between devices.
- The app has no automated test suite yet.
- Task dates and sorting behavior could use more explicit rules.
