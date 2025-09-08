export default function AudienceLoading() {
  return (
    <div className='animate-pulse space-y-6'>
      {/* Stats Grid Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className='bg-white dark:bg-card rounded-lg p-6'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3'></div>
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2'></div>
            <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-20'></div>
          </div>
        ))}
      </div>

      {/* Chart Areas Skeleton */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-card rounded-lg p-6'>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4'></div>
          <div className='h-64 bg-gray-100 dark:bg-gray-800 rounded'></div>
        </div>
        <div className='bg-white dark:bg-card rounded-lg p-6'>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4'></div>
          <div className='h-64 bg-gray-100 dark:bg-gray-800 rounded'></div>
        </div>
      </div>
    </div>
  );
}
