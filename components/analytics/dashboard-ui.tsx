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
    <div className='w-[2px] h-16 bg-[#EBEBE9] dark:bg-[#21201C] rounded-full' />
  );
};
