import React from "react";

/**
 * PhotoFrame — the painterly image surface. Given `src`, shows the
 * photo under a soft warm grade + optional bottom protection gradient
 * for overlaid text. Without `src`, shows the warm hatched placeholder.
 */
export function PhotoFrame({ src, alt = "", height = 150, rounded = false, protect = false, overlay, children, style, ...rest }) {
  return (
    <div
      style={{
        position: "relative",
        height,
        overflow: "hidden",
        borderRadius: rounded ? "var(--r-lg)" : 0,
        backgroundColor: "var(--photo-ph)",
        backgroundImage: src
          ? undefined
          : "repeating-linear-gradient(135deg, transparent 0 10px, rgba(120,80,40,.05) 10px 20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      {...rest}
    >
      {src && (
        <img src={src} alt={alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      )}
      {/* warm painterly grade */}
      {src && <span style={{ position: "absolute", inset: 0, background: "var(--photo-grade)", mixBlendMode: "multiply" }} />}
      {!src && (
        <svg viewBox="0 0 24 24" width={38} height={38} fill="none" stroke="var(--photo-ph2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.6" />
          <path d="M4 18l5-5 4 4 3-3 4 4" />
        </svg>
      )}
      {protect && (
        <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 45%, rgba(30,20,10,.66) 100%)" }} />
      )}
      {overlay && <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, color: "#fff", zIndex: 2 }}>{overlay}</div>}
      {children}
    </div>
  );
}
