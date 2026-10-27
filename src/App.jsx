import { useEffect, useState } from "react";
import { loadTasks, saveTasks } from "./api/taskStore.js";
import Header from "./components/Header.jsx";
import Summary from "./components/Summary.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

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

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title, priority, dueDate) => {
    setTasks((current) => [createTask(title, priority, dueDate), ...current]);
  };

  const updateTask = (id, changes) => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...changes } : task)));
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((current) => current.filter((task) => !task.completed));
  };

  const completed = tasks.filter((task) => task.completed).length;
  const active = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <main className="app">
      <Header />
      <Summary total={tasks.length} active={active} completed={completed} />
      <section className="workspace">
        <TaskForm onAdd={addTask} />
        <TaskList
          tasks={visibleTasks}
          filter={filter}
          onFilterChange={setFilter}
          progress={progress}
          total={tasks.length}
          active={active}
          completed={completed}
          onToggle={(id, isCompleted) => updateTask(id, { completed: isCompleted })}
          onDelete={deleteTask}
          onClearCompleted={clearCompleted}
        />
      </section>
      <footer>Taskflow <span>•</span> A starter project for learning Claude Code</footer>
    </main>
  );
}
