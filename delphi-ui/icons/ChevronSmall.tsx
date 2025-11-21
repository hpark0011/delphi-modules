import { cn } from "@delphi/classes";

type Direction = "up" | "down" | "left" | "right";

const orientation: Record<Direction, `${string}rotate-${string}`> = {
  up: "rotate-0",
  down: "rotate-180",
  left: "-rotate-90",
  right: "rotate-90",
};

interface ChevronSmallProps extends React.SVGProps<SVGSVGElement> {
  direction?: Direction;
}

export function ChevronSmallIcon({
  direction = "up",
  className,
  ...props
}: ChevronSmallProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        "duration-1000 will-change-transform motion-safe:transition-all",
        orientation[direction],
        className,
      )}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.3536 11.7678C12.1583 11.5725 11.8417 11.5725 11.6464 11.7678L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.2322 10.3536C11.2085 9.37726 12.7915 9.37726 13.7678 10.3536L16.7071 13.2929C17.0976 13.6834 17.0976 14.3166 16.7071 14.7071C16.3166 15.0976 15.6834 15.0976 15.2929 14.7071L12.3536 11.7678Z"
        fill="currentColor"
      />
    </svg>
  );
}
