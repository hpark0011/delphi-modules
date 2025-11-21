import type { JSX } from "react";
export function DragHandleIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M9 3a2 2 0 100 4 2 2 0 000-4zM15 3a2 2 0 100 4 2 2 0 000-4zM9 10a2 2 0 100 4 2 2 0 000-4zM15 10a2 2 0 100 4 2 2 0 000-4zM9 17a2 2 0 100 4 2 2 0 000-4zM15 17a2 2 0 100 4 2 2 0 000-4z"
      ></path>
    </svg>
  );
}
