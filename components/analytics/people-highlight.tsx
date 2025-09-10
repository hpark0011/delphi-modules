import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function PeopleHighlight() {
  return (
    <div className='translate-y-[15%]'>
      <div className='flex flex-col relative cursor-default transform-none gap-2 justify-center items-center w-full'>
        <div className='bg-[#E7E4E1] rounded-[24px] p-6 shadow-card-stacked flex flex-col items-center justify-center max-w-[320px] w-full z-30 gap-2'>
          <Avatar className='h-16 w-16 rounded-full m-auto overflow-hidden'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <div className='text-center text-sm'>Name</div>
            <div className='text-center text-[13px] leading-[1.2] text-[#43250E]/50'>
              Founder of Product Hunt. Investor at Weekend Fund.
            </div>
          </div>
        </div>

        <div className='bg-[#E7E4E1] rounded-[24px] p-6 shadow-card-stacked flex flex-col items-center justify-center max-w-[320px] w-full scale-90 opacity-60 z-20 absolute top-[-16px]'>
          <Avatar className='h-16 w-16 rounded-full m-auto overflow-hidden'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>Name</div>
        </div>

        <div className='bg-[#E7E4E1] rounded-[24px] p-6 shadow-card-stacked flex flex-col items-center justify-center max-w-[320px] w-full scale-80 opacity-40 top-[-32px] z-10 absolute'>
          <Avatar className='h-16 w-16 rounded-full m-auto overflow-hidden'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>Name</div>
        </div>
      </div>
    </div>
  );
}
