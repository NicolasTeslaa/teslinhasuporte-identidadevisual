import React from 'react';
type Name = 'chart' | 'users' | 'bolt' | 'grid' | 'check' | 'arrow' | 'message' | 'link' | 'clock' | 'search' | 'plus';
const paths: Record<Name, React.ReactNode> = {
  chart: <><path d="M4 4v16h17M8 15v-4m5 4V7m5 8v-6"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5"/></>,
  bolt: <path d="m14 2-9 12h7l-2 8 9-12h-7z"/>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  check: <path d="m5 12 4 4L20 5"/>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>,
  message: <path d="M21 15a3 3 0 0 1-3 3H8l-5 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3zM7 8h10M7 12h6"/>,
  link: <><path d="m9 15 6-6M7 13l-2 2a3 3 0 0 0 4 4l4-4m-2-6 4-4a3 3 0 0 1 4 4l-2 2"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
  search: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></>,
  plus: <path d="M12 4v16M4 12h16"/>,
};
export function Icon({name, size = 32, color = 'currentColor'}: {name: Name; size?: number; color?: string}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
