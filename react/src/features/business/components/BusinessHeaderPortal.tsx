import { useContext, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { BusinessHeaderContext } from "./businessHeaderContext";

/** Places page actions in the shared business header without lifting feature state into the shell. */
export default function BusinessHeaderPortal({ children, slot = "actions" }: { children: ReactNode; slot?: "actions" | "subtitle" | "title" }) {
  const target = useContext(BusinessHeaderContext)[slot];
  return target ? createPortal(children, target) : null;
}
