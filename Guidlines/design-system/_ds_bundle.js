/* @ds-bundle: {"format":4,"namespace":"TandemclubDesignSystem_d44a9e","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"AvatarStack","sourcePath":"components/core/Avatar.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"ListRow","sourcePath":"components/core/ListRow.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Segment","sourcePath":"components/forms/Segment.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Mascot","sourcePath":"components/product/Mascot.jsx"},{"name":"PhotoFrame","sourcePath":"components/product/PhotoFrame.jsx"},{"name":"Sheet","sourcePath":"components/product/Sheet.jsx"},{"name":"StreakBar","sourcePath":"components/product/StreakBar.jsx"},{"name":"TripCard","sourcePath":"components/product/TripCard.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4b97d13dc8e0","components/core/Button.jsx":"1e0f421f86fb","components/core/Card.jsx":"330badc3e5e8","components/core/Chip.jsx":"9b29ca2422ca","components/core/ListRow.jsx":"487bb1d7cecf","components/core/Tag.jsx":"b6dd5b6cab0e","components/forms/Input.jsx":"d3a7c298f20b","components/forms/Segment.jsx":"177330877f0d","components/forms/Stepper.jsx":"67ea30b450c6","components/forms/Toggle.jsx":"22f19cb70887","components/product/Mascot.jsx":"2f9205480a7d","components/product/PhotoFrame.jsx":"2864db94b723","components/product/Sheet.jsx":"b1ea00896d41","components/product/StreakBar.jsx":"fa3987429e27","components/product/TripCard.jsx":"9642103bafd5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TandemclubDesignSystem_d44a9e = window.TandemclubDesignSystem_d44a9e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — round profile image or initials fallback with a warm
 * gradient. Use AvatarStack for overlapping "who's going" groups.
 */
function Avatar({
  src,
  name = "",
  size = 40,
  style,
  ...rest
}) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: "var(--r-pill)",
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      fontFamily: "var(--font-ui)",
      fontWeight: 700,
      fontSize: size * 0.36,
      color: "#fff",
      background: "linear-gradient(135deg, var(--sun-400), var(--clay-500))",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
function AvatarStack({
  people = [],
  size = 34,
  max = 4
}) {
  const shown = people.slice(0, max);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex"
    }
  }, shown.map((p, i) => /*#__PURE__*/React.createElement(Avatar, _extends({
    key: i
  }, typeof p === "string" ? {
    name: p
  } : p, {
    size: size,
    style: {
      marginLeft: i === 0 ? 0 : -10,
      border: "2px solid var(--surface-card)"
    }
  }))));
}
Object.assign(__ds_scope, { Avatar, AvatarStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * tandemclub Button — the primary tappable action.
 * Warm sunset-coral fill by default; ghost/subtle/apple variants
 * mirror the wireframe button set. Full-width by default (mobile).
 */
function Button({
  variant = "primary",
  size = "md",
  full = true,
  disabled = false,
  leadingIcon,
  trailingIcon,
  children,
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: full ? "100%" : "auto",
    fontFamily: "var(--font-ui)",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    border: "1px solid transparent",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? "none" : "auto",
    transition: "transform .08s ease, background .15s ease, color .15s ease",
    borderRadius: size === "sm" ? "var(--r-pill)" : "var(--r-md)"
  };
  const sizes = {
    sm: {
      padding: "10px 16px",
      fontSize: 14
    },
    md: {
      padding: "15px 18px",
      fontSize: 16
    },
    lg: {
      padding: "17px 22px",
      fontSize: 17
    }
  };
  const variants = {
    primary: {
      background: "var(--action)",
      color: "var(--text-on-action)"
    },
    ghost: {
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      borderColor: "var(--border-strong)"
    },
    subtle: {
      background: "var(--surface-raised)",
      color: "var(--text-primary)",
      borderColor: "var(--border)"
    },
    accent: {
      background: "var(--accent)",
      color: "#fff"
    },
    apple: {
      background: "#000",
      color: "#fff"
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant],
      ...style
    },
    onMouseDown: e => !disabled && (e.currentTarget.style.transform = "translateY(1px)"),
    onMouseUp: e => e.currentTarget.style.transform = "",
    onMouseLeave: e => e.currentTarget.style.transform = ""
  }, rest), leadingIcon, children, trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base warm surface: white, hairline border, soft shadow,
 * generous rounding. The building block for most content blocks.
 */
function Card({
  raised = false,
  pad = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      boxShadow: raised ? "var(--shadow-raised)" : "var(--shadow-card)",
      padding: pad ? "var(--s4)" : 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip — a pill filter/selector. `on` gives the filled (selected) state.
 * Mirrors the wireframe .chip / .pill pattern.
 */
function Chip({
  on = false,
  leadingIcon,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "8px 14px",
      borderRadius: "var(--r-pill)",
      fontFamily: "var(--font-ui)",
      fontSize: 13.5,
      fontWeight: 600,
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: "background .15s ease, color .15s ease, border-color .15s ease",
      background: on ? "var(--action)" : "var(--surface-card)",
      color: on ? "var(--text-on-action)" : "var(--text-secondary)",
      border: `1px solid ${on ? "var(--action)" : "var(--border-strong)"}`,
      ...style
    }
  }, rest), leadingIcon, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/ListRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ListRow — a tappable row inside a Card/list: leading media, title,
 * subtitle, trailing chevron/control. Hairline divider between rows.
 */
function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  last = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--s3)",
      textAlign: "left",
      width: "100%",
      padding: "13px var(--s4)",
      background: "transparent",
      border: "none",
      borderBottom: last ? "none" : "1px solid var(--border)",
      cursor: "pointer",
      fontFamily: "var(--font-ui)",
      ...style
    }
  }, rest), leading, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "var(--text-primary)"
    }
  }, title), subtitle != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      color: "var(--text-tertiary)",
      marginTop: 2,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, subtitle)), trailing);
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ListRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — a small static metadata label (difficulty, cost, activity type).
 * Non-interactive by default; smaller than a Chip.
 */
function Tag({
  tone = "neutral",
  leadingIcon,
  children,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      background: "var(--surface-sunk)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border)"
    },
    action: {
      background: "var(--action-soft)",
      color: "var(--action-hover)",
      border: "1px solid transparent"
    },
    accent: {
      background: "var(--accent-soft)",
      color: "var(--accent)",
      border: "1px solid transparent"
    },
    success: {
      background: "color-mix(in oklch, var(--success) 18%, white)",
      color: "var(--success)",
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "4px 8px",
      borderRadius: 6,
      fontFamily: "var(--font-ui)",
      fontSize: 11,
      fontWeight: 600,
      ...tones[tone],
      ...style
    }
  }, rest), leadingIcon, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field / textarea with an optional label and char count.
 * Warm surface, calm border that deepens on focus.
 */
function Input({
  label,
  multiline = false,
  maxLength,
  value,
  onChange,
  style,
  ...rest
}) {
  const [val, setVal] = React.useState(value ?? "");
  const v = value ?? val;
  const Comp = multiline ? "textarea" : "input";
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontFamily: "var(--font-ui)"
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text-secondary)",
      marginBottom: 8
    }
  }, label), /*#__PURE__*/React.createElement(Comp, _extends({
    value: v,
    maxLength: maxLength,
    onChange: e => {
      setVal(e.target.value);
      onChange && onChange(e);
    },
    style: {
      width: "100%",
      padding: "15px 16px",
      borderRadius: "var(--r-md)",
      border: "1px solid var(--border-strong)",
      background: "var(--surface-card)",
      color: "var(--text-primary)",
      fontFamily: "inherit",
      fontSize: 16,
      outline: "none",
      resize: multiline ? "none" : undefined,
      minHeight: multiline ? 120 : undefined,
      transition: "border-color .15s ease, box-shadow .15s ease",
      ...style
    },
    onFocus: e => {
      e.target.style.borderColor = "var(--action)";
      e.target.style.boxShadow = "0 0 0 3px var(--focus-ring)";
    },
    onBlur: e => {
      e.target.style.borderColor = "var(--border-strong)";
      e.target.style.boxShadow = "none";
    }
  }, rest)), maxLength != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      textAlign: "right",
      fontSize: 11.5,
      fontWeight: 600,
      color: "var(--text-tertiary)",
      marginTop: 6
    }
  }, v.length, "/", maxLength));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Segment.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Segment — segmented control (e.g. Activities / Adventures filter).
 * Selected pill floats on a warm sunk track.
 */
function Segment({
  options = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const [sel, setSel] = React.useState(value ?? options[0]);
  const current = value ?? sel;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      gap: 6,
      padding: 6,
      background: "var(--surface-sunk)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-pill)",
      fontFamily: "var(--font-ui)",
      ...style
    }
  }, rest), options.map(opt => {
    const on = opt === current;
    return /*#__PURE__*/React.createElement("button", {
      key: opt,
      onClick: () => {
        setSel(opt);
        onChange && onChange(opt);
      },
      style: {
        flex: 1,
        textAlign: "center",
        padding: "8px 10px",
        borderRadius: "var(--r-pill)",
        border: "none",
        cursor: "pointer",
        fontSize: 13.5,
        fontWeight: 600,
        transition: "background .15s ease, color .15s ease, box-shadow .15s ease",
        background: on ? "var(--surface-card)" : "transparent",
        color: on ? "var(--text-primary)" : "var(--text-secondary)",
        boxShadow: on ? "var(--shadow-card)" : "none"
      }
    }, opt);
  }));
}
Object.assign(__ds_scope, { Segment });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Segment.jsx", error: String((e && e.message) || e) }); }

// components/forms/Stepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Stepper — pill +/- counter (headcount, seats, budget items). */
function Stepper({
  value: valueProp,
  defaultValue = 0,
  min = 0,
  max = 99,
  onChange,
  style,
  ...rest
}) {
  const [v, setV] = React.useState(defaultValue);
  const val = valueProp ?? v;
  const set = n => {
    const c = Math.max(min, Math.min(max, n));
    setV(c);
    onChange && onChange(c);
  };
  const btn = {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 700,
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      background: "var(--surface-sunk)",
      border: "1px solid var(--border-strong)",
      borderRadius: 999,
      padding: 3,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: () => set(val - 1)
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 40,
      textAlign: "center",
      fontSize: 14,
      fontWeight: 700,
      fontFamily: "var(--font-ui)"
    }
  }, val), /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: () => set(val + 1)
  }, "+"));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch — fills sunset-coral when on. */
function Toggle({
  on: onProp,
  defaultOn = false,
  onChange,
  style,
  ...rest
}) {
  const [on, setOn] = React.useState(defaultOn);
  const val = onProp ?? on;
  return /*#__PURE__*/React.createElement("button", _extends({
    role: "switch",
    "aria-checked": val,
    onClick: () => {
      setOn(!val);
      onChange && onChange(!val);
    },
    style: {
      width: 46,
      height: 28,
      borderRadius: 999,
      border: "none",
      cursor: "pointer",
      position: "relative",
      flex: "none",
      transition: "background .18s ease",
      background: val ? "var(--action)" : "var(--border-strong)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: 3,
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-card)",
      transition: "transform .18s ease",
      transform: val ? "translateX(18px)" : "none"
    }
  }));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/product/Mascot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mascot — the tandemclub orangutan. It "levels up" through 4 stages
 * (0 rest → 1 walk → 2 jump → 3 chill) as a member builds a streak.
 * Warm rust palette. Self-contained SVG (no asset dependency).
 */
const STAGES = [
// 0 — resting
`<ellipse cx="50" cy="87" rx="30" ry="7" fill="#e6dccb"/><path d="M28 82c-3-20 6-34 22-34s25 14 22 34c-1 6-9 9-22 9s-21-3-22-9z" fill="#a8623a"/><path d="M34 66q-10 6-16 16" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M66 66q9 5 11 12" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="36" cy="28" r="6.5" fill="#a8623a"/><circle cx="64" cy="28" r="6.5" fill="#a8623a"/><circle cx="50" cy="40" r="18" fill="#a8623a"/><ellipse cx="50" cy="44" rx="11" ry="9" fill="#f2e4d0"/><circle cx="45.5" cy="42" r="1.8" fill="#3a2a1c"/><circle cx="54.5" cy="42" r="1.8" fill="#3a2a1c"/><path d="M45 48q5 4 10 0" stroke="#3a2a1c" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="17" cy="83" r="5" fill="#caa06a"/><circle cx="26" cy="87" r="3.5" fill="#caa06a"/>`,
// 1 — walking
`<path d="M42 70q-7 13-11 21" stroke="#a8623a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M58 70q8 9 6 23" stroke="#a8623a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M38 50q-13 4-17 16" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M62 50q11 1 15-7" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M38 46c0-10 5-16 12-16s12 6 12 16v18c0 5-5 8-12 8s-12-3-12-8V46z" fill="#a8623a"/><circle cx="38" cy="14" r="5.5" fill="#a8623a"/><circle cx="62" cy="14" r="5.5" fill="#a8623a"/><circle cx="50" cy="24" r="16" fill="#a8623a"/><ellipse cx="50" cy="27" rx="9.5" ry="7.5" fill="#f2e4d0"/><circle cx="46" cy="26" r="1.6" fill="#3a2a1c"/><circle cx="54" cy="26" r="1.6" fill="#3a2a1c"/><path d="M46 31q4 3 8 0" stroke="#3a2a1c" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
// 2 — jumping
`<path d="M30 90q20 7 40 0" stroke="#caa06a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M42 68q-5 10 1 17" stroke="#a8623a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M58 68q5 10-1 17" stroke="#a8623a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M37 46q-11-14-5-25" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M63 46q11-14 5-25" stroke="#a8623a" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M38 44c0-10 5-16 12-16s12 6 12 16v14c0 5-5 8-12 8s-12-3-12-8V44z" fill="#a8623a"/><circle cx="38" cy="14" r="5.5" fill="#a8623a"/><circle cx="62" cy="14" r="5.5" fill="#a8623a"/><circle cx="50" cy="23" r="16" fill="#a8623a"/><ellipse cx="50" cy="26" rx="9.5" ry="7.5" fill="#f2e4d0"/><circle cx="46" cy="25" r="2.1" fill="#3a2a1c"/><circle cx="54" cy="25" r="2.1" fill="#3a2a1c"/><circle cx="50" cy="30" r="2.2" fill="#3a2a1c"/>`,
// 3 — chilling with guitar
`<ellipse cx="50" cy="87" rx="30" ry="7" fill="#e6dccb"/><path d="M26 82c-4-18 8-30 24-30s28 12 24 30c-2 6-46 6-48 0z" fill="#a8623a"/><rect x="62" y="44" width="3.4" height="21" rx="1.5" fill="#caa06a"/><ellipse cx="59" cy="68" rx="10" ry="13" fill="#caa06a"/><circle cx="59" cy="66" r="3.2" fill="#a8623a"/><path d="M40 68q9 3 13-4" stroke="#a8623a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M67 70q6-3 7-11" stroke="#a8623a" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="36" cy="28" r="6.5" fill="#a8623a"/><circle cx="64" cy="28" r="6.5" fill="#a8623a"/><circle cx="50" cy="40" r="18" fill="#a8623a"/><ellipse cx="50" cy="44" rx="11" ry="9" fill="#f2e4d0"/><path d="M44 41q2-2.4 4 0" stroke="#3a2a1c" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M52 41q2-2.4 4 0" stroke="#3a2a1c" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M44 48q6 5 12 0" stroke="#3a2a1c" stroke-width="1.6" fill="none" stroke-linecap="round"/>`];
function Mascot({
  stage = 0,
  size = 56,
  style,
  ...rest
}) {
  const s = Math.max(0, Math.min(STAGES.length - 1, stage | 0));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "none",
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: `<svg viewBox="0 0 100 100" width="100%" height="100%">${STAGES[s]}</svg>`
    }
  }, rest));
}
Object.assign(__ds_scope, { Mascot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/Mascot.jsx", error: String((e && e.message) || e) }); }

// components/product/PhotoFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PhotoFrame — the painterly image surface. Given `src`, shows the
 * photo under a soft warm grade + optional bottom protection gradient
 * for overlaid text. Without `src`, shows the warm hatched placeholder.
 */
function PhotoFrame({
  src,
  alt = "",
  height = 150,
  rounded = false,
  protect = false,
  overlay,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      height,
      overflow: "hidden",
      borderRadius: rounded ? "var(--r-lg)" : 0,
      backgroundColor: "var(--photo-ph)",
      backgroundImage: src ? undefined : "repeating-linear-gradient(135deg, transparent 0 10px, rgba(120,80,40,.05) 10px 20px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style
    }
  }, rest), src && /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), src && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--photo-grade)",
      mixBlendMode: "multiply"
    }
  }), !src && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: 38,
    height: 38,
    fill: "none",
    stroke: "var(--photo-ph2)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "9.5",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 18l5-5 4 4 3-3 4 4"
  })), protect && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, transparent 45%, rgba(30,20,10,.66) 100%)"
    }
  }), overlay && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 12,
      color: "#fff",
      zIndex: 2
    }
  }, overlay), children);
}
Object.assign(__ds_scope, { PhotoFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/PhotoFrame.jsx", error: String((e && e.message) || e) }); }

// components/product/Sheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Sheet — bottom sheet / action drawer. Renders an overlay + a rounded
 * top panel with a grip. `open` controls visibility.
 */
function Sheet({
  open = true,
  title,
  onClose,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "rgba(40,28,15,.42)",
      display: "flex",
      alignItems: "flex-end",
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      background: "var(--surface-card)",
      borderRadius: "var(--r-xl) var(--r-xl) 0 0",
      padding: "10px var(--s4) calc(var(--s4) + env(safe-area-inset-bottom,0))",
      boxShadow: "var(--shadow-sheet)",
      maxHeight: "88%",
      overflowY: "auto",
      fontFamily: "var(--font-ui)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 5,
      borderRadius: 3,
      background: "var(--border-strong)",
      margin: "4px auto 14px"
    }
  }), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      marginBottom: 8
    }
  }, title), children));
}
Object.assign(__ds_scope, { Sheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/Sheet.jsx", error: String((e && e.message) || e) }); }

// components/product/StreakBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StreakBar — the "weeks outside" streak row on My Trips / Profile.
 * The mascot on the left evolves with the streak count.
 */
function StreakBar({
  weeks = 0,
  label = "Weeks outside",
  message,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      borderRadius: 16,
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-card)",
      fontFamily: "var(--font-ui)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Mascot, {
    stage: Math.min(3, weeks),
    size: 52
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: ".04em",
      textTransform: "uppercase",
      color: "var(--text-tertiary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 23,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      lineHeight: 1.3
    }
  }, weeks, " ", weeks === 1 ? "week" : "weeks"), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, message)));
}
Object.assign(__ds_scope, { StreakBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/StreakBar.jsx", error: String((e && e.message) || e) }); }

// components/product/TripCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TripCard — the core discovery unit: a photo, title, club line, and
 * the crew going. Used in horizontal shelves and 2-up grids.
 */
function TripCard({
  trip = {},
  width = 260,
  grid = false,
  style,
  ...rest
}) {
  const {
    title,
    club,
    kind,
    when,
    cost,
    photo,
    going = [],
    goingN
  } = trip;
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      width: grid ? "100%" : width,
      flex: grid ? undefined : "none",
      textAlign: "left",
      background: "var(--surface-card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-card)",
      cursor: "pointer",
      fontFamily: "var(--font-ui)",
      padding: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.PhotoFrame, {
    src: photo,
    height: grid ? 120 : 150
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "11px 12px 13px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 8
    }
  }, kind && /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    tone: kind === "Adventure" ? "accent" : "action"
  }, kind), cost && /*#__PURE__*/React.createElement(__ds_scope.Tag, null, cost)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15.5,
      fontWeight: 700,
      letterSpacing: "-0.01em",
      color: "var(--text-primary)",
      lineHeight: 1.25
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 8
    }
  }, going.length > 0 && /*#__PURE__*/React.createElement(__ds_scope.AvatarStack, {
    people: going,
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-tertiary)"
    }
  }, club, when ? ` · ${when}` : ""))));
}
Object.assign(__ds_scope, { TripCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/TripCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarStack = __ds_scope.AvatarStack;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Segment = __ds_scope.Segment;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Mascot = __ds_scope.Mascot;

__ds_ns.PhotoFrame = __ds_scope.PhotoFrame;

__ds_ns.Sheet = __ds_scope.Sheet;

__ds_ns.StreakBar = __ds_scope.StreakBar;

__ds_ns.TripCard = __ds_scope.TripCard;

})();
