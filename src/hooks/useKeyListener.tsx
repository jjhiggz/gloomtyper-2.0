import type { KeyboardEvent } from "react";
import { useCallback, useEffect } from "react";
import { type LowercaseLetter, type UppercaseLetter } from "../types";

type ValidKey =
  | "Escape"
  | "Enter"
  | "Tab"
  | "Shift"
  | UppercaseLetter
  | LowercaseLetter;

type ModifierKeys = "metaKey" | "ctrlKey" | "altKey";

type UseKeyProps = {
  onKey?: "up" | "down" | "press";
  keys: ValidKey[];
  // any of the following modifier keys will make the event trigger
  modifierKeys?: ModifierKeys[];
  handler: (e: KeyboardEvent<Element>) => void;
  activeWhen: boolean;
};

const getKeyEvent = (
  onKey: "up" | "down" | "press"
): "keydown" | "keyup" | "keypress" => `key${onKey}`;

/**
useKeyListener lets us attatch a key listener to the dom as a component mounts, and detatch it when it unmounts. 

eg...

```tsx
  useKeyListener({
    onKey: "up",
    keys: ["Escape"],
    activeWhen: showModal,
    handler: () => {
        closeModal();
    },
  });
```
*/
export const useKeyListener = ({
  onKey = "down",
  keys,
  handler,
  activeWhen,
  modifierKeys,
}: UseKeyProps) => {
  const eventListener = useCallback(
    (e: KeyboardEvent) => {
      // console.log({ keys, key: e.key });
      if (keys.includes(e.key as ValidKey)) {
        if (!modifierKeys?.length) {
          handler(e);
        } else {
          const isModifierActive = modifierKeys.some(
            (modifierKey) => e[modifierKey]
          );
          if (isModifierActive) {
            handler(e);
          }
        }
      }
    },
    [handler, keys, modifierKeys]
  );

  useEffect(() => {
    if (activeWhen) {
      document.addEventListener(
        getKeyEvent(onKey),
        eventListener as any as EventListener
      );
    }
    if (!activeWhen) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      document.removeEventListener(getKeyEvent(onKey), eventListener as any);
    }
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      document.removeEventListener(getKeyEvent(onKey), eventListener as any);
    };
  }, [eventListener, activeWhen, onKey]);
};
