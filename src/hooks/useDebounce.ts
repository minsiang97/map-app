import { useCallback, useState } from 'react';

type CallbackFunction = (...args: unknown[]) => void;

export const useDebounce = (callback: CallbackFunction, delay: number) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: unknown[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const id = setTimeout(() => callback(...args), delay);
      setTimeoutId(id);
    },
    [callback, delay, timeoutId],
  );
};
