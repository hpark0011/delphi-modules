import type { JSX } from "react";

export function VolumeOffIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="graphics-symbol"
      {...props}
    >
      <path
        d="M5.2759 7.99968H4C2.89543 7.99968 2 8.89511 2 9.99968V13.9997C2 15.1043 2.89543 15.9997 4 15.9997H5.2759C5.74377 15.9997 6.19684 16.1637 6.55627 16.4632L10.3598 19.6329C11.0111 20.1756 12 19.7125 12 18.8646V5.13472C12 4.28689 11.0111 3.82373 10.3598 4.3665L6.55627 7.53613C6.19684 7.83565 5.74377 7.99968 5.2759 7.99968Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21.5005 10L19.3791 12.1213M19.3791 12.1213L17.2578 14.2426M19.3791 12.1213L17.2578 10M19.3791 12.1213L21.5005 14.2426"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
