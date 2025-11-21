import type { JSX } from "react";
export function BuildingsIcon(props: JSX.IntrinsicElements["svg"]) {
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
        d="M4 19H14M4 19V6C4 4.89543 4.89543 4 6 4H12C13.1046 4 14 4.89543 14 6V8M4 19H2M14 19V8M14 19H20M14 8H18C19.1046 8 20 8.89543 20 10V19M20 19H22M10 9H8M8 13H10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
