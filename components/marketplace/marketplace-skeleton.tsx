import { Skeleton } from "@/components/ui/skeleton"

const ITEMS_PER_PAGE = 12

function ShimmerEffect({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
    </div>
  )
}

export function MarketplaceSkeleton() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner skeleton */}
      <div className="relative">
        <Skeleton className="h-64 md:h-80 lg:h-96 w-full rounded-3xl" />
        <ShimmerEffect className="absolute inset-0 rounded-3xl" />
      </div>

      {/* Flash Sales Section skeleton */}
      <div className="px-4 lg:px-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-40 rounded-xl" />
          </div>
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>
        
        {/* Horizontal scroll skeleton for flash sales */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-48 md:w-56 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <Skeleton className="aspect-square w-full" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-16 rounded-lg" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section skeleton */}
      <div className="px-4 lg:px-0">
        <Skeleton className="h-8 w-48 mb-6 rounded-xl" />
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i} 
              className="text-center space-y-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="relative">
                <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto" />
                <ShimmerEffect className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto left-0 right-0" />
              </div>
              <Skeleton className="h-3 w-16 mx-auto rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Items Section skeleton */}
      <div className="px-4 lg:px-0">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-40 rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div 
              key={i} 
              className="animate-fade-in-up"
              style={{ 
                animationDelay: `${i * 0.05}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Image skeleton with shimmer */}
                <div className="relative">
                  <Skeleton className="aspect-square w-full" />
                  <ShimmerEffect className="absolute inset-0" />
                  
                  {/* Badge skeleton */}
                  <Skeleton className="absolute top-3 right-3 h-6 w-14 rounded-full" />
                </div>
                
                {/* Content skeleton */}
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-3 w-2/3 rounded-lg" />
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                      <Skeleton className="h-6 w-20 rounded-lg" />
                      <Skeleton className="h-3 w-14 rounded-lg" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Sellers Section skeleton */}
      <div className="px-4 lg:px-0">
        <Skeleton className="h-8 w-32 mb-6 rounded-xl" />
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Skeleton className="w-14 h-14 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32 rounded-lg" />
                <Skeleton className="h-3 w-20 rounded-lg" />
              </div>
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
