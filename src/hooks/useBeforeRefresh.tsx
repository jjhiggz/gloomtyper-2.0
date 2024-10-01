import { useEffect } from "react";

export const useBeforeRefresh = (handler: () => void) => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      handler();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handler]);
};
