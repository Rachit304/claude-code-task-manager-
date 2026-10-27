const STORAGE_KEY = "taskflow-tasks-v1";

// All persistence lives here so a backend can replace localStorage later
// without touching the UI components.
export function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not load saved tasks:", error);
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
