import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function ScrollManager() {
  const [mainWrapperHeight, setMainWrapperHeight] = useState<number | undefined>(0);
  const location = useRouterState({
    select: (state) => state.location,
  });

  const mainWrapper = document.querySelector("main")
 
  useEffect(() => {
      setMainWrapperHeight(mainWrapper?.clientHeight);
  }, [mainWrapper]);

  useEffect(() => {
    if (location.hash) {
      const elementHTML = document.querySelector(`#${location.hash}`);
      if (elementHTML) {
        elementHTML.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash, mainWrapperHeight]);

  return null;
}
