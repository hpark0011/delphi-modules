import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export function PeopleHighlight() {
  return (
    <div className='translate-y-[15%] relative'>
      <button className='absolute top-1/2 left-[16px] -translate-y-1/2 rounded-full bg-light p-1 z-10'>
        <Icon name='ArrowBackwardIcon' className='size-5' />
      </button>
      <button className='absolute top-1/2 right-[16px] -translate-y-1/2 rounded-full bg-light p-1 z-10'>
        <Icon name='ArrowForwardIcon' className='size-5' />
      </button>
      <div className='flex flex-col relative cursor-default transform-none gap-2 justify-center items-center w-full'>
        <div className='bg-[#E7E4E1] rounded-[24px] p-6 shadow-card-stacked flex flex-col items-center justify-center max-w-[320px] w-full z-30 gap-2'>
          <Avatar className='h-16 w-16 rounded-full m-auto overflow-hidden'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-1'>
            <div className='text-center text-[16px]'>Name</div>
            <div className='text-center text-sm leading-[1.2] text-[#43250E]/50'>
              Founder of Product Hunt. Investor at Weekend Fund.
            </div>
          </div>
          <div>
            <Button size='sm' className='rounded-full px-3 h-7'>
              Message
            </Button>
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
