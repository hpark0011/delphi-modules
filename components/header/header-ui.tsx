"use client";

import { cn } from "@/lib/utils";
import type React from "react";

export const HeaderContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center py-2 bg-transparent fixed top-0 w-full px-4 pl-5",
        className
      )}
    >
      {children}
    </div>
  );
};

export const HeaderLogo = () => {
  return (
    <div className='flex items-center gap-2'>
      <svg
        width={20}
        height={20}
        viewBox='0 0 30 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='text-black dark:text-white'
      >
        <path
          d='M5.86303 0H0.000171728V2.39143H5.86303C8.0916 2.39143 9.76303 2.95714 10.8773 4.08857C11.7412 4.96571 12.2702 6.1468 12.4643 7.63182L0 7.63182V10.2427L12.482 10.2427C12.3727 11.2055 12.1293 12.0341 11.7516 12.7286C11.2202 13.7057 10.4659 14.4257 9.48874 14.8886C8.5116 15.3514 7.32874 15.5829 5.94017 15.5829H0.000171728V18H6.19731C8.18589 18 9.87446 17.6314 11.263 16.8943C12.6516 16.1571 13.6973 15.1114 14.4002 13.7571C14.4992 13.5709 14.5914 13.3802 14.6768 13.1852C14.7622 13.3802 14.8545 13.5709 14.9535 13.7571C15.6563 15.1114 16.7021 16.1571 18.0906 16.8943C19.4792 17.6314 21.1678 18 23.1564 18H29.3535V15.5829H23.4135C22.0249 15.5829 20.8421 15.3514 19.8649 14.8886C18.8878 14.4257 18.1335 13.7057 17.6021 12.7286C17.2244 12.0341 16.9809 11.2055 16.8717 10.2427L29.3536 10.2427V7.63182L16.8893 7.63182C17.0835 6.1468 17.6125 4.96571 18.4764 4.08857C19.5906 2.95714 21.2621 2.39143 23.4906 2.39143H29.3535V0H23.4906C21.4678 0 19.7449 0.325714 18.3221 0.977142C16.8992 1.62857 15.8021 2.63143 15.0306 3.98571C14.902 4.20873 14.784 4.44105 14.6768 4.68267C14.5696 4.44105 14.4517 4.20873 14.323 3.98571C13.5516 2.63143 12.4545 1.62857 11.0316 0.977142C9.60874 0.325714 7.88588 0 5.86303 0Z'
          fill='currentColor'
        />
      </svg>
      <h1 className='text-[18px] font-[550] tracking-[-0.06em] text-black dark:text-white'>
        Delphi
      </h1>
    </div>
  );
};

export const HeaderMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex gap-0'>{children}</div>;
};
