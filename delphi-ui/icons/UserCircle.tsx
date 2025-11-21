import type { JSX } from "react";

export function UserCircleIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 0C8.9543 0 0 8.9543 0 20C0 25.794 2.46384 31.0126 6.40094 34.6652C9.96948 37.9758 14.7484 40 20 40C25.2516 40 30.0306 37.9758 33.599 34.6652C37.5362 31.0126 40 25.794 40 20C40 8.9543 31.0456 0 20 0ZM7.9521 31.9936C10.5984 28.348 14.8223 26 20 26C25.1778 26 29.4016 28.348 32.0478 31.9936C28.9694 35.086 24.7082 37 20 37C15.2918 37 11.0306 35.086 7.9521 31.9936ZM26 16C26 19.3138 23.3138 22 20 22C16.6862 22 14 19.3138 14 16C14 12.6863 16.6862 10 20 10C23.3138 10 26 12.6863 26 16Z"
        fill="currentColor"
      />
    </svg>
  );
}
