import { describe, expect, it, vi } from "vitest";
import { loadTasks, saveTasks } from "./taskStore.js";

const KEY = "taskflow-tasks-v1";

describe("taskStore", () => {
  it("returns an empty list when nothing is saved", () => {
    expect(loadTasks()).toEqual([]);
  });

  it("round-trips tasks through localStorage", () => {
    const tasks = [
      { id: "1", title: "Write tests", priority: "high", dueDate: "", completed: false, createdAt: "2026-01-01T00:00:00.000Z" }
    ];
    saveTasks(tasks);
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify(tasks));
    expect(loadTasks()).toEqual(tasks);
  });

  it("returns an empty list when saved data is not valid JSON", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem(KEY, "{not json");
    expect(loadTasks()).toEqual([]);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
