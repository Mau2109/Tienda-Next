export default function Loading() {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 bg-gray-800 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2"></div>
        </div>
  
        <div className="flex flex-wrap gap-2 pb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-8 bg-gray-800 rounded-full w-24"></div>
          ))}
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950/50 animate-pulse">
              <div className="h-48 bg-gray-800"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded"></div>
                <div className="h-6 bg-gray-800 rounded w-1/4 mt-2"></div>
                <div className="h-10 bg-gray-800 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  