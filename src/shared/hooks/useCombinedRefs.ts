import type { Ref } from "react";

export const useCombinedRefs = (...refs: Ref<HTMLLIElement>[]) => {
  return (node: HTMLLIElement | undefined) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(node ?? null);
      } else {
        ref.current = node ?? null;
      }
    });
  };
};
