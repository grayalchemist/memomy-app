"use client";

import * as React from "react";

type ThemePreference = "light" | "dark" | "system";
type Resolved = Exclude<ThemePreference, "system">;
type ThemeSnapshot = `${ThemePreference}:${Resolved}`;

interface ThemeContextValue {
  preference: ThemePreference;
  resolved: Resolved;
  setTheme: (t: ThemePreference) => void;
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "memomy-theme";
const CHANGE_EVENT = "memomy-theme-change";

// ponytail: hand-rolled theme provider (no next-themes dependency).
// useSyncExternalStore is the React-blessed read pattern for an external
// store (localStorage + matchMedia) — no setState-in-effect, no cascades.
function getPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" || stored === "system"
    ? stored
    : "system";
}

function getSnapshot(): ThemeSnapshot {
  const preference = getPreference();
  const resolved =
    preference === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;
  return `${preference}:${resolved}`;
}

function getServerSnapshot(): ThemeSnapshot {
  return "system:light";
}

function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    mq.removeEventListener("change", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [preference, resolved] = snapshot.split(":") as [
    ThemePreference,
    Resolved,
  ];

  // Sync the DOM class — external system mutation, not React state.
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [resolved]);

  const setTheme = React.useCallback((t: ThemePreference) => {
    try {
      if (t === "system") {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, t);
      }
    } catch {
      // non-blocking
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const toggle = React.useCallback(
    () => setTheme(resolved === "dark" ? "light" : "dark"),
    [resolved, setTheme],
  );

  const value = React.useMemo(
    () => ({ preference, resolved, setTheme, toggle }),
    [preference, resolved, setTheme, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/**
 * Inline blocking script — runs before paint to set the initial `dark` class
 * from localStorage / system preference, preventing a flash of the wrong theme.
 */
export const themeInitScript = `(function(){try{var k='memomy-theme';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=s==='dark'||(s!=='light'&&m);if(d){document.documentElement.classList.add('dark');}}catch(e){}})();`;
