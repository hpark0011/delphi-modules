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

export const Divider = () => {
  return (
    <div className='w-[3px] h-16 bg-[#EBEBE9] dark:bg-[#21201C] rounded-full' />
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
