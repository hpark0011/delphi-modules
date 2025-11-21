import type { JSX } from "react";

export function NotificationIcon(props: JSX.IntrinsicElements["svg"]) {
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
        d="M9.16659 3.33333H5.83325C4.45254 3.33333 3.33325 4.45262 3.33325 5.83333V14.1667C3.33325 15.5474 4.45254 16.6667 5.83325 16.6667H14.1666C15.5473 16.6667 16.6666 15.5474 16.6666 14.1667V10.8333M16.7677 3.23223C17.744 4.20854 17.744 5.79146 16.7677 6.76776C15.7913 7.74407 14.2085 7.74407 13.2322 6.76776C12.2558 5.79146 12.2558 4.20854 13.2322 3.23223C14.2085 2.25592 15.7913 2.25592 16.7677 3.23223Z"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
