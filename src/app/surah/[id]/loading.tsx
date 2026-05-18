// app/surah/[id]/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-8 space-y-6">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}