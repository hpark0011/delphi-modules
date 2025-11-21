import type { JSX } from "react";
export function AscendingIcon(props: JSX.IntrinsicElements["svg"]) {
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
        d="M14.3477 10.25L15.5601 7.75M15.5601 7.75L17.5 3.75L19.4333 7.75M15.5601 7.75H19.4333M19.4333 7.75L20.6416 10.25M14.75 13.75H20.25L14.75 20.25H20.25M7 3.75V20.25M7 20.25L4 17.25M7 20.25L10 17.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
