import { FiLoader } from 'react-icons/fi';

export function Loader({ fullPage = false, text = 'Loading...' }) {
  if (fullPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center animate-pulse-glow">
            <FiLoader className="text-white text-xl animate-spin" />
          </div>
          <p className="text-sm text-dark-muted font-medium">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <FiLoader className="text-primary text-2xl animate-spin" />
        <p className="text-sm text-dark-muted">{text}</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-4 animate-fade-in">
      {/* Badge skeleton */}
      <div className="skeleton h-6 w-24 rounded-full" />

      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="skeleton h-5 w-full" />
        <div className="skeleton h-5 w-3/4" />
      </div>

      {/* Description skeleton */}
      <div className="space-y-2">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
      </div>

      {/* Meta skeleton */}
      <div className="flex justify-between">
        <div className="skeleton h-4 w-20" />
        <div className="skeleton h-4 w-16" />
      </div>

      {/* Button skeleton */}
      <div className="skeleton h-10 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
