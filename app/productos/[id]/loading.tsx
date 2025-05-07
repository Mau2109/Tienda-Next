export default function Loading() {
    return (
      <div className="space-y-8">
        <div className="h-4 bg-gray-800 rounded w-1/3"></div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg h-80 animate-pulse"></div>
  
          <div className="space-y-4">
            <div className="h-8 bg-gray-800 rounded w-3/4"></div>
  
            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
  
            <div className="h-8 bg-gray-800 rounded w-1/5"></div>
  
            <div className="h-6 bg-gray-800 rounded w-1/6"></div>
  
            <div className="h-24 bg-gray-800 rounded"></div>
  
            <div className="h-12 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    )
  }
  