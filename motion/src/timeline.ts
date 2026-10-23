export type TimelineEntry = {from: number; duration: number; nominal: number};

export function buildTimeline(durations: readonly number[], overlap: number): TimelineEntry[] {
  if (!durations.length || !Number.isInteger(overlap) || overlap < 0 || durations.some(d => !Number.isInteger(d) || d <= overlap)) {
    throw new Error('Durações devem ser inteiras e maiores que a transição não negativa.');
  }
  let from = 0;
  return durations.map((nominal, i) => {
    const entry = {from, nominal, duration: nominal + (i < durations.length - 1 ? overlap : 0)};
    from += nominal;
    return entry;
  });
}

export function progress(frame: number, start: number, end: number): number {
  if (end <= start) throw new Error('O intervalo deve ter duração positiva.');
  return Math.max(0, Math.min(1, (frame - start) / (end - start)));
}
