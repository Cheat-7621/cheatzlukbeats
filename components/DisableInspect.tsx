"use client";
import { useEffect } from "react";

export default function DisableInspect() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const onContext = (e: MouseEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(k)) ||
        (e.metaKey && e.altKey && ["i", "j", "c"].includes(k)) ||
        ((e.ctrlKey || e.metaKey) && k === "u")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContext);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
