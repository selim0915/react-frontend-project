export const pad = n => String(n).padStart(2, '0');
export const timeFormatter = t => `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
