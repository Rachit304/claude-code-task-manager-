const STORAGE_KEY = "taskflow-tasks-v1";

const taskForm = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const priorityInput = document.querySelector("#taskPriority");
const dueDateInput = document.querySelector("#taskDueDate");
const taskFilter = document.querySelector("#taskFilter");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const totalCount = document.querySelector("#totalCount");
const activeCount = document.querySelector("#activeCount");
const completedCount = document.querySelector("#completedCount");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const remainingText = document.querySelector("#remainingText");
const clearCompletedButton = document.querySelector("#clearCompleted");
const todayLabel = document.querySelector("#todayLabel");

let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not load saved tasks:", error);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(title, priority, dueDate) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    priority,
    dueDate,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function formatDueDate(value) {
  if (!value) return "No due date";
  const date = new Date(`${value}T00:00:00`);
  return `Due ${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

function renderTasks() {
  const filter = taskFilter.value;
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  taskList.replaceChildren();
  visibleTasks.forEach((task) => taskList.appendChild(buildTaskElement(task)));

  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  totalCount.textContent = tasks.length;
  activeCount.textContent = active;
  completedCount.textContent = completed;
  progressText.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;
  remainingText.textContent = active === 0
    ? (tasks.length ? "Everything is complete — nice work!" : "Nothing on your list yet")
    : `${active} task${active === 1 ? "" : "s"} left to do`;
  emptyState.hidden = visibleTasks.length > 0;
  clearCompletedButton.hidden = completed === 0;
}

function buildTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.completed ? " is-complete" : ""}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-check";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark ${task.title} as ${task.completed ? "active" : "completed"}`);
  checkbox.addEventListener("change", () => {
    updateTask(task.id, { completed: checkbox.checked });
  });

  const main = document.createElement("div");
  main.className = "task-main";
  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;

  const meta = document.createElement("div");
  meta.className = "task-meta";
  const priority = document.createElement("span");
  priority.className = `priority ${task.priority}`;
  priority.textContent = task.priority;
  const dueDate = document.createElement("span");
  dueDate.textContent = formatDueDate(task.dueDate);
  meta.append(priority, dueDate);
  main.append(title, meta);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.type = "button";
  deleteButton.textContent = "×";
  deleteButton.setAttribute("aria-label", `Delete ${task.title}`);
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  item.append(checkbox, main, deleteButton);
  return item;
}

function updateTask(id, changes) {
  tasks = tasks.map((task) => task.id === id ? { ...task, ...changes } : task);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) {
    titleInput.focus();
    return;
  }

  tasks.unshift(createTask(title, priorityInput.value, dueDateInput.value));
  saveTasks();
  renderTasks();
  taskForm.reset();
  priorityInput.value = "medium";
  titleInput.focus();
});

taskFilter.addEventListener("change", renderTasks);

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

todayLabel.textContent = new Date().toLocaleDateString(undefined, {
  weekday: "short", month: "short", day: "numeric"
});

renderTasks();
