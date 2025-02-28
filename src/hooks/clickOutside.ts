import { useEffect } from "react";

export function clickOutside(handleClickOutside: (event: MouseEvent) => void) {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
}
