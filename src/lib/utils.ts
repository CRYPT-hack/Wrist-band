export function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function formatDate(d: Date) {
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
