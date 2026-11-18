export interface ActionRequirement {
  id: string;
  label: string;
  reason: string;
}

// Share a visible explanation when several actions have the same prerequisite.
export const requirementId = (
  requirements: ActionRequirement[],
  id: string,
) => {
  const current = requirements.find((item) => item.id === id);
  return current?.reason
    ? requirements.find((item) => item.reason === current.reason)?.id
    : undefined;
};

export function ActionRequirements({ items }: { items: ActionRequirement[] }) {
  const groups = items.filter(
    (item, index) =>
      item.reason &&
      items.findIndex((other) => other.reason === item.reason) === index,
  );
  if (!groups.length) return null;
  return (
    <ul className="action-requirements">
      {groups.map((item) => (
        <li key={item.id} id={item.id}>
          <strong>
            {items
              .filter((other) => other.reason === item.reason)
              .map((other) => other.label)
              .join(" / ")}
          </strong>
          <span>{item.reason}</span>
        </li>
      ))}
    </ul>
  );
}
