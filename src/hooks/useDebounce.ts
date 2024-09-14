import { useCallback, useRef } from 'react';

type CallbackFunction = (...args: unknown[]) => void;

export const useDebounce = (callback: CallbackFunction, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: unknown[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear the previous timeout
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args); // Call the debounced function
      }, delay);
    },
    [callback, delay],
  );
};
