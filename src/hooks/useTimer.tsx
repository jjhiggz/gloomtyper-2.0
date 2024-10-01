import { useEffect, useRef } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

const useTimer = (initialTime = 0) => {
  const [time, setTime] = useLocalStorageState("time", initialTime);
  const [isRunning, setIsRunning] = useLocalStorageState("isRunning", false);
  const timerRef = useRef(null);

  // Start the timer
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // Pause the timer
  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  // Reset the timer
  const reset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  useEffect(() => {
    // Handle the timer running and pausing
    if (isRunning) {
      // @ts-expect-error fuck off
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Cleanup function to clear the interval when component is unmounted or when isRunning changes
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  return { time, isRunning, start, pause, reset };
};

export default useTimer;
