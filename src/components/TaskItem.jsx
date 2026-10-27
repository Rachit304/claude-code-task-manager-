function formatDueDate(value) {
  if (!value) return "No due date";
  const date = new Date(`${value}T00:00:00`);
  return `Due ${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
}

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? " is-complete" : ""}`}>
      <input
        type="checkbox"
        className="task-check"
        checked={task.completed}
        aria-label={`Mark ${task.title} as ${task.completed ? "active" : "completed"}`}
        onChange={(event) => onToggle(task.id, event.target.checked)}
      />
      <div className="task-main">
        <span className="task-title">{task.title}</span>
        <div className="task-meta">
          <span className={`priority ${task.priority}`}>{task.priority}</span>
          <span>{formatDueDate(task.dueDate)}</span>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${task.title}`}
        onClick={() => onDelete(task.id)}
      >
        ×
      </button>
    </li>
  );
}
