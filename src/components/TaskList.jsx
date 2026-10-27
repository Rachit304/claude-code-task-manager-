import TaskItem from "./TaskItem.jsx";

export default function TaskList({
  tasks,
  filter,
  onFilterChange,
  progress,
  total,
  active,
  completed,
  onToggle,
  onDelete,
  onClearCompleted
}) {
  const remainingText = active === 0
    ? (total ? "Everything is complete — nice work!" : "Nothing on your list yet")
    : `${active} task${active === 1 ? "" : "s"} left to do`;

  return (
    <section className="panel list-panel">
      <div className="list-top">
        <div>
          <p className="eyebrow">MAKE TODAY COUNT</p>
          <h2>Your tasks</h2>
        </div>
        <label className="filter-wrap">
          <span className="sr-only">Filter tasks</span>
          <select value={filter} onChange={(event) => onFilterChange(event.target.value)}>
            <option value="all">All tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
      <div className="progress-area">
        <div className="progress-copy"><span>Daily progress</span><strong>{progress}%</strong></div>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <ul className="task-list" aria-live="polite">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </ul>
      {tasks.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <h3>No tasks here yet</h3>
          <p>Add a task to turn your plans into progress.</p>
        </div>
      )}
      <div className="list-footer">
        <span>{remainingText}</span>
        {completed > 0 && (
          <button className="text-button" type="button" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </div>
    </section>
  );
}
