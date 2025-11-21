import type { JSX } from "react";

export function ProductsIcon(props: JSX.IntrinsicElements["svg"]) {
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
        d="M7.08441 3.33337L5.41774 7.50004M5.41774 7.50004H14.5844M5.41774 7.50004H3.33441M14.5844 7.50004L12.9177 3.33337M14.5844 7.50004H16.6677M17.3225 8.48246L16.2077 14.614C15.9915 15.8026 14.9562 16.6667 13.748 16.6667H6.25418C5.04596 16.6667 4.01064 15.8026 3.79451 14.614L2.6797 8.48246C2.58669 7.97092 2.97966 7.50004 3.49959 7.50004H16.5026C17.0225 7.50004 17.4155 7.97092 17.3225 8.48246Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
