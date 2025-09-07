import { cn } from "@/lib/utils";

export const DashboardMainWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("p-7", className)}>{children}</div>;
};
