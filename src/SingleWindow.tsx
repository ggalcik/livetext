import { useEffect, useRef, useState } from "react";

interface SingleWindowProps {
  render: (isActive: boolean) => React.ReactNode;
}

export function SingleWindow({ render }: SingleWindowProps) {
  const [isActive, setIsActive] = useState(true);
  const windowId = useRef(
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  ).current;

  // Claim window on mount
  useEffect(() => {
    localStorage.setItem("activeWindow", windowId);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "activeWindow" && e.newValue !== windowId) {
        setIsActive(false);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);

      // Optional: only clear if still owner
      if (localStorage.getItem("activeWindow") === windowId) {
        localStorage.removeItem("activeWindow");
      }
    };
  }, [windowId]);

  return <>{render(isActive)}</>;
}
