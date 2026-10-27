export default function Summary({ total, active, completed }) {
  const cards = [
    { label: "All tasks", value: total },
    { label: "In progress", value: active },
    { label: "Completed", value: completed }
  ];

  return (
    <section className="summary" aria-label="Task summary">
      {cards.map((card) => (
        <article className="summary-card" key={card.label}>
          <span className="summary-label">{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  );
}
