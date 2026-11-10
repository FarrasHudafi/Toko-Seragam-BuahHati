import { useEffect, useRef, type RefObject } from "react";

const dialogStack: symbol[] = [];
let previousOverflow = "";

export default function useDialog<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
  initialFocus?: RefObject<HTMLElement | null>,
) {
  const panelRef = useRef<T>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const dialogId = Symbol("dialog");
    if (dialogStack.length === 0) previousOverflow = document.body.style.overflow;
    dialogStack.push(dialogId);
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      (initialFocus?.current ?? panelRef.current)?.focus();
    });

    const onKey = (event: KeyboardEvent) => {
      if (dialogStack.at(-1) !== dialogId) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!focusable.includes(document.activeElement as HTMLElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      const stackIndex = dialogStack.lastIndexOf(dialogId);
      if (stackIndex !== -1) dialogStack.splice(stackIndex, 1);
      if (dialogStack.length === 0) document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open, initialFocus]);

  return panelRef;
}
