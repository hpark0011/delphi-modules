export default function EngagementLoading() {
  return (
    <div className='animate-pulse space-y-6'>
      {/* KPI Cards Skeleton */}
      <div className='bg-[#F6F6F5] dark:bg-[#111110] rounded-[28px] p-1'>
        <div className='flex w-full gap-1 justify-between'>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className='flex-1'>
              <div className='bg-white dark:bg-card rounded-[24px] p-6'>
                <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3'></div>
                <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2'></div>
                <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-20'></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className='bg-white dark:bg-card rounded-[24px] p-6'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6'></div>
        <div className='h-[452px] bg-gray-100 dark:bg-gray-800 rounded'></div>
      </div>
    </div>
  );
}
