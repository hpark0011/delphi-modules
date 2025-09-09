export default function BroadcastsLoading() {
  return (
    <div className='animate-pulse space-y-6'>
      {/* Broadcast Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='bg-white dark:bg-card rounded-lg p-6'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3'></div>
            <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2'></div>
            <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-24'></div>
          </div>
        ))}
      </div>

      {/* Recent Broadcasts List */}
      <div className='bg-white dark:bg-card rounded-lg p-6'>
        <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-6'></div>

        <div className='space-y-4'>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className='border border-gray-200 dark:border-gray-700 rounded-lg p-4'
            >
              <div className='flex justify-between items-start mb-3'>
                <div className='space-y-2'>
                  <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-48'></div>
                  <div className='h-3 bg-gray-100 dark:bg-gray-800 rounded w-64'></div>
                </div>
                <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-20'></div>
              </div>
              <div className='flex gap-4 mt-4'>
                <div className='h-3 bg-gray-100 dark:bg-gray-800 rounded w-24'></div>
                <div className='h-3 bg-gray-100 dark:bg-gray-800 rounded w-24'></div>
                <div className='h-3 bg-gray-100 dark:bg-gray-800 rounded w-24'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
