export default function StatusBar({ status }) {
  if (!status?.msg) return null;

  const icons = { error: "⚠", success: "✓", "": "◎" };

  return (
    <div className={`status-bar ${status.type || ""}`}>
      <span>{icons[status.type] ?? "◎"}</span>
      {status.msg}
    </div>
  );
}