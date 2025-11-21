import type { JSX } from "react";

export function VideoIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 6.66675C2.5 5.28604 3.61929 4.16675 5 4.16675H10C11.3807 4.16675 12.5 5.28604 12.5 6.66675V13.3334C12.5 14.7142 11.3807 15.8334 10 15.8334H5C3.61929 15.8334 2.5 14.7142 2.5 13.3334V6.66675Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinejoin="round"
      />

      <path
        d="M12.9607 8.10289L16.294 6.43622C16.8481 6.15918 17.5 6.56209 17.5 7.18157V12.8182C17.5 13.4376 16.8481 13.8405 16.294 13.5635L12.9607 11.8969C12.6783 11.7557 12.5 11.4671 12.5 11.1515V8.84821C12.5 8.53263 12.6783 8.24405 12.9607 8.10289Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinejoin="round"
      />
    </svg>
  );
}
