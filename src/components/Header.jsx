export default function Header() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short", month: "short", day: "numeric"
  });

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
        <h1>Taskflow<span>.</span></h1>
        <p className="subtitle">A little progress every day adds up.</p>
      </div>
      <div className="date-pill">{today}</div>
    </header>
  );
}
