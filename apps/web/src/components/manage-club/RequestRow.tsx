// Source: Wireframe 0.2 — a request row in clubRequests() (studio.js). Someone
// asking to join: avatar, name, and Approve / Deny. Approving adds them to the
// roster as a member; denying drops the request.
"use client";

export function RequestRow({
  name,
  onApprove,
  onDeny,
}: {
  name: string;
  onApprove: () => void;
  onDeny: () => void;
}) {
  return (
    <div className="row">
      <div className="avatar avatar--sm">{name[0]}</div>
      <span className="row__body">
        <span className="row__title">{name}</span>
        <span className="row__sub">Requested this week</span>
      </span>
      <button type="button" className="btn btn--sm" onClick={onApprove}>
        Approve
      </button>
      <button type="button" className="btn btn--ghost btn--sm" onClick={onDeny}>
        Deny
      </button>
    </div>
  );
}
