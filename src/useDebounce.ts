import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);
    // return the "clear" method which will cancel the current
    // timer if value changes before the timout
    return () => {
        clearTimeout(timer);
    };
  }, [value, delay]);

  return debounced;
}
