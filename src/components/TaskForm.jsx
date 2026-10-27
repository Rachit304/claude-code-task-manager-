import { useRef, useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const titleRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      titleRef.current.focus();
      return;
    }

    onAdd(title, priority, dueDate);
    setTitle("");
    setPriority("medium");
    setDueDate("");
    titleRef.current.focus();
  };

  return (
    <section className="panel create-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">GET IT OUT OF YOUR HEAD</p>
          <h2>Add a task</h2>
        </div>
      </div>
      <form id="taskForm" onSubmit={handleSubmit}>
        <label htmlFor="taskTitle">Task name</label>
        <input
          id="taskTitle"
          name="title"
          ref={titleRef}
          placeholder="e.g. Read 10 pages"
          maxLength={100}
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className="form-row">
          <div className="field">
            <label htmlFor="taskPriority">Priority</label>
            <select
              id="taskPriority"
              name="priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="taskDueDate">Due date</label>
            <input
              id="taskDueDate"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>
        </div>
        <button className="primary-button" type="submit">+ Add task</button>
        <p className="form-hint">Keep it small. Make it doable.</p>
      </form>
    </section>
  );
}
