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

export const Divider = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-[3px] h-12 bg-[#EBEBE9] dark:bg-[#21201C] rounded-full",
        className
      )}
    />
  );
};

export const AnalyticsSectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-[#F6F6F5] dark:bg-[#111110] rounded-[28px] p-1",
        className
      )}
    >
      {children}
    </div>
  );
};
