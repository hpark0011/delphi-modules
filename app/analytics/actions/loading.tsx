export default function ActionsLoading() {
  return (
    <div className='animate-pulse space-y-6'>
      {/* Actions Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='bg-white dark:bg-card rounded-lg p-6'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3'></div>
            <div className='h-10 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2'></div>
            <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-28'></div>
          </div>
        ))}
      </div>

      {/* Actions Table Skeleton */}
      <div className='bg-white dark:bg-card rounded-lg p-6'>
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6'></div>

        {/* Table Header */}
        <div className='border-b border-gray-200 dark:border-gray-700 pb-3 mb-3'>
          <div className='grid grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className='h-4 bg-gray-200 dark:bg-gray-700 rounded'
              ></div>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className='py-3 border-b border-gray-100 dark:border-gray-800'
          >
            <div className='grid grid-cols-4 gap-4'>
              {[1, 2, 3, 4].map((col) => (
                <div
                  key={col}
                  className='h-4 bg-gray-100 dark:bg-gray-800 rounded'
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
