import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Skeleton,
  CardSkeleton,
  HeroSkeleton,
  StatsSkeleton,
  GridSkeleton,
  SectionSkeleton,
  TableSkeleton,
} from "@/components/ui/skeleton";

interface ContentLoaderProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

// Wrapper component that handles loading states with smooth transitions
export function ContentLoader({ 
  isLoading, 
  skeleton, 
  children,
  delay = 0 
}: ContentLoaderProps) {
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isLoading, delay]);

  return (
    <AnimatePresence mode="wait">
      {!showContent ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {skeleton}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for simulating loading states (useful for demos and lazy loading)
export function useLoadingState(initialLoading = true, loadTime = 1500) {
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => setIsLoading(false), loadTime);
      return () => clearTimeout(timer);
    }
  }, [initialLoading, loadTime]);

  return { isLoading, setIsLoading };
}

// Demo component showing all skeleton variants
export function SkeletonDemo() {
  const { isLoading } = useLoadingState(true, 3000);

  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Loading Skeletons Demo</h2>
        <p className="text-muted-foreground">
          These skeletons show while content is loading for better perceived performance.
        </p>
      </div>

      {/* Basic Skeletons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Skeletons</h3>
        <div className="flex gap-4 flex-wrap">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-12 w-24 rounded-md" />
        </div>
      </section>

      {/* Hero Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Hero Section Skeleton</h3>
        <ContentLoader
          isLoading={isLoading}
          skeleton={<HeroSkeleton />}
        >
          <div className="text-center py-12 space-y-4">
            <span className="inline-block px-4 py-1 bg-primary/10 rounded-full text-sm">
              Loaded Content
            </span>
            <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
            <p className="text-muted-foreground">
              This content appeared after the skeleton finished loading.
            </p>
          </div>
        </ContentLoader>
      </section>

      {/* Stats Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Stats Skeleton</h3>
        <StatsSkeleton count={4} />
      </section>

      {/* Card Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Card Skeleton</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </section>

      {/* Section Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Section Skeleton</h3>
        <SectionSkeleton />
      </section>

      {/* Table Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Table Skeleton</h3>
        <TableSkeleton rows={4} columns={5} />
      </section>

      {/* Grid Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Grid Skeleton (Responsive)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SkeletonDemo;
