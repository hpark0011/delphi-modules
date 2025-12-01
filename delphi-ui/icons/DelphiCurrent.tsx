import type { JSX } from "react";

export function DelphiCurrentIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 33 20"
      preserveAspectRatio="xMidYMid meet"
      role="graphics-symbol"
      {...props}
    >
      <path
        fill="currentColor"
        d="M32.615 0h-6.514q-3.372 0-5.743 1.086A7.9 7.9 0 0 0 16.7 4.429a8 8 0 0 0-.393.774 8 8 0 0 0-.393-.774 7.9 7.9 0 0 0-3.658-3.343Q9.887 0 6.514 0H0v2.657h6.514q3.715 0 5.572 1.886 1.44 1.462 1.763 3.937H0v2.9h13.869q-.182 1.605-.812 2.763-.885 1.629-2.514 2.4t-3.943.771H0V20h6.886q3.315 0 5.629-1.229 2.313-1.228 3.485-3.485a9 9 0 0 0 .308-.636q.142.325.307.636 1.171 2.257 3.486 3.486Q22.415 20 25.729 20h6.886v-2.686h-6.6q-2.314 0-3.943-.771-1.628-.771-2.514-2.4-.63-1.157-.812-2.762h13.87V8.48h-13.85q.324-2.476 1.763-3.937 1.858-1.886 5.572-1.886h6.514z"
      />
    </svg>
  );
}
