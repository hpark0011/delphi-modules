import type { JSX } from "react";

export function DropboxIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 21 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.33315 3.33398L2.16667 5.95117L6.33315 8.56836L10.5004 5.95117L14.6669 8.56836L18.8333 5.95117L14.6669 3.33398L10.5004 5.95117L6.33315 3.33398Z"
        fill="#0061FE"
      />
      <path
        d="M6.33315 13.8028L2.16667 11.1856L6.33315 8.56836L10.5004 11.1856L6.33315 13.8028Z"
        fill="#0061FE"
      />
      <path
        d="M10.5004 11.1856L14.6669 8.56836L18.8333 11.1856L14.6669 13.8028L10.5004 11.1856Z"
        fill="#0061FE"
      />
      <path
        d="M10.5003 17.291L6.33313 14.6738L10.5003 12.0566L14.6668 14.6738L10.5003 17.291Z"
        fill="#0061FE"
      />
    </svg>
  );
}
