// Source: Wireframe 0.2 — the "Dues" toggle + amount block, identical in the
// club wizard's Membership step (clubStepMembership) and Manage-a-Club Settings
// (clubSettings). Shared here so both read the same control: a quarterly-dues
// toggle that reveals a "$ per member, per quarter" number field when on.
"use client";

export function DuesSettings({
  duesOn,
  dues,
  onToggle,
  onDues,
  listMaxWidth,
}: {
  duesOn: boolean;
  dues: number;
  onToggle: () => void;
  onDues: (dues: number) => void;
  /** The Settings tab constrains the list to 640px; the wizard leaves it full. */
  listMaxWidth?: number;
}) {
  return (
    <>
      <div className="divlabel">Dues</div>
      <div
        className="list"
        style={listMaxWidth ? { maxWidth: listMaxWidth } : undefined}
      >
        <div className="togglerow">
          <span className="row__title">Collect quarterly dues</span>
          <button
            type="button"
            className={`toggle ${duesOn ? "on" : ""}`}
            role="switch"
            aria-checked={duesOn}
            aria-label="Collect quarterly dues"
            onClick={onToggle}
          >
            <span className="knob" />
          </button>
        </div>
        {duesOn ? (
          <div style={{ padding: "0 var(--tc-s4) 14px", maxWidth: 220 }}>
            <label className="label" htmlFor="dues-amount">
              $ per member, per quarter
            </label>
            <input
              id="dues-amount"
              className="field"
              type="number"
              min={0}
              value={dues}
              onChange={(e) => onDues(Number(e.target.value))}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
