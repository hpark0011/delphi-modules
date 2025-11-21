import type { JSX } from "react";
export function PencilIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M19.2535 4.86783C18.1773 3.79157 16.4322 3.79157 15.356 4.86783L5.09509 15.1287C4.43277 15.7911 4.06067 16.6894 4.06067 17.6261V19.1777C4.06067 19.6653 4.45598 20.0606 4.94361 20.0606H6.49525C7.43193 20.0606 8.33025 19.6886 8.99258 19.0263L19.2535 8.76531C20.3298 7.68905 20.3298 5.94409 19.2535 4.86783Z"
        fill="currentColor"
      />
    </svg>
  );
}
