import { useState, useEffect } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const isWindow = typeof window !== "undefined";
  const [state, setState] = useState<T>(() => {
    if (isWindow) {
      const storedValue = localStorage?.getItem(key);
      return storedValue !== null
        ? (JSON.parse(storedValue) as T)
        : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    if (isWindow) {
      localStorage?.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isWindow]);

  return [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>];
}
