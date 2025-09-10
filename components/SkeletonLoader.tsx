import React from 'react';

const SkeletonBar: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`bg-slate-700/30 rounded-md animate-pulse ${className}`} />
);

const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 border-b border-white/10 bg-slate-900/30 backdrop-blur-lg sticky top-0 z-10 flex justify-between items-center">
        <div>
          <SkeletonBar className="h-7 w-64 mb-2 bg-slate-700/50" />
          <SkeletonBar className="h-4 w-48" />
        </div>
        <div className="h-10 w-10 rounded-full bg-slate-700/50 animate-pulse" />
      </header>
      <main className="flex-grow flex flex-col md:flex-row p-4 gap-4">
        {/* Controls Panel Skeleton */}
        <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 flex flex-col gap-4 p-4 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl">
          <SkeletonBar className="h-48 w-full" />
          <SkeletonBar className="h-12 w-full" />
          <SkeletonBar className="h-24 w-full" />
          <div className="border-t border-white/10 pt-4 flex-grow flex flex-col gap-4">
            <SkeletonBar className="h-32 w-full" />
            <div className="grid grid-cols-2 gap-4">
                <SkeletonBar className="h-36" />
                <SkeletonBar className="h-36" />
            </div>
            <SkeletonBar className="h-12 w-full" />
            <SkeletonBar className="h-16 w-full" />
            <SkeletonBar className="h-16 w-full" />
          </div>
          <SkeletonBar className="h-12 w-full mt-auto bg-slate-700/50" />
        </aside>
        {/* Output Area Skeleton */}
        <section className="flex-grow w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-[60vh] md:h-auto bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="h-20 w-20 bg-slate-700/30 rounded-lg animate-pulse" />
                <SkeletonBar className="h-6 w-96 mt-4" />
                <SkeletonBar className="h-4 w-80 mt-2" />
            </div>
        </section>
      </main>
    </div>
  );
};

export default SkeletonLoader;
