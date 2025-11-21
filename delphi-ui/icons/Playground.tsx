import type { JSX } from "react";

export function PlaygroundIcon(props: JSX.IntrinsicElements["svg"]) {
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
        d="M6.24992 12.9166C7.86075 12.9166 9.16658 11.6107 9.16658 9.99992C9.16658 8.38909 7.86075 7.08325 6.24992 7.08325C4.63909 7.08325 3.33325 8.38909 3.33325 9.99992C3.33325 11.6107 4.63909 12.9166 6.24992 12.9166Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.57641 16.0252L12.1484 12.0065C12.3122 11.7504 12.6864 11.7504 12.8502 12.0065L15.4222 16.0252C15.5997 16.3025 15.4006 16.6664 15.0713 16.6664H9.92733C9.59808 16.6664 9.39891 16.3025 9.57641 16.0252Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.58325 4.84266C9.58325 4.84266 12.0833 2.58388 13.3333 3.59266C15.196 5.09594 11.2499 6.92614 11.6666 7.75933C12.0833 8.5925 14.8692 6.79514 16.2499 8.17586C17.0833 9.00917 16.555 10.1773 16.2499 11.0925"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
