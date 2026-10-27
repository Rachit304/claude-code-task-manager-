import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

async function addTask(user, title) {
  await user.type(screen.getByLabelText("Task name"), title);
  await user.click(screen.getByRole("button", { name: "+ Add task" }));
}

describe("App", () => {
  it("adds a task and clears the form", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "Read 10 pages");

    expect(screen.getByText("Read 10 pages")).toBeInTheDocument();
    expect(screen.getByLabelText("Task name")).toHaveValue("");
  });

  it("ignores a whitespace-only title", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "   ");

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("prepends new tasks", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "First");
    await addTask(user, "Second");

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Second");
    expect(items[1]).toHaveTextContent("First");
  });

  it("completes and deletes a task", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addTask(user, "Ship it");

    await user.click(screen.getByRole("checkbox", { name: "Mark Ship it as completed" }));
    expect(screen.getByRole("checkbox", { name: "Mark Ship it as active" })).toBeChecked();

    await user.click(screen.getByRole("button", { name: "Delete Ship it" }));
    expect(screen.queryByText("Ship it")).not.toBeInTheDocument();
  });

  it("persists tasks across renders", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await addTask(user, "Remember me");
    unmount();

    render(<App />);
    expect(screen.getByText("Remember me")).toBeInTheDocument();
  });
});
