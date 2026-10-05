// The small graph from the GitHub banner, same coordinates and colours.
// Nodes twinkle slowly; a few light dots travel along the edges.
const edges: [number, number, number, number][] = [
  [860, 90, 960, 60], [860, 90, 920, 170], [960, 60, 1050, 110], [1050, 110, 920, 170], [920, 170, 1030, 210],
  [1030, 210, 1120, 170], [1050, 110, 1120, 170], [820, 210, 920, 170], [980, 265, 1030, 210], [1110, 70, 1050, 110],
  [1150, 250, 1120, 170], [820, 210, 980, 265], [960, 60, 1110, 70],
]
const nodes: [number, number, number, string][] = [
  [860, 90, 9, "var(--blue)"], [960, 60, 6, "var(--violet)"], [1050, 110, 11, "var(--pink)"], [920, 170, 13, "var(--violet)"],
  [1030, 210, 7, "var(--blue)"], [1120, 170, 8, "var(--green)"], [820, 210, 6, "var(--pink)"], [980, 265, 6, "var(--blue)"],
  [1110, 70, 5, "var(--blue)"], [1150, 250, 6, "var(--violet)"],
]

export default function Constellation({ className }: { className?: string }) {
  return (
    <svg viewBox="800 40 370 245" className={className} aria-hidden>
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line)" strokeWidth="1.5" />
      ))}
      {edges.slice(0, 4).map(([x1, y1, x2, y2], i) => (
        <circle key={`d${i}`} r="2.5" fill="var(--fg)" opacity="0.8">
          <animateMotion dur={`${5 + i}s`} begin={`${i * 1.3}s`} repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`} />
        </circle>
      ))}
      {nodes.map(([cx, cy, r, fill], i) => (
        <circle key={`n${i}`} cx={cx} cy={cy} r={r} fill={fill}>
          <animate attributeName="opacity" values="1;0.45;1" dur={`${3 + (i % 3)}s`} begin={`${i * 0.37}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  )
}
