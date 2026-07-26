import { Skeleton } from "@/components/ui/skeleton"

export function PageSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-24 px-6 py-16">
      <section className="flex min-h-[85svh] scroll-mt-10 flex-col justify-center gap-8">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-12 w-3/4 sm:h-14" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-full max-w-prose" />
          <Skeleton className="h-4 w-2/3 max-w-prose" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-10 w-28 rounded-none" />
          <Skeleton className="h-10 w-28 rounded-none" />
        </div>
        <Skeleton className="h-16 w-full" />
        <div className="flex items-center gap-4">
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="size-9 rounded-full" />
        </div>
      </section>

      <section className="flex min-h-[70svh] scroll-mt-10 flex-col justify-center gap-8">
        <Skeleton className="h-3 w-40" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </section>

      <section className="flex min-h-[70svh] scroll-mt-10 flex-col justify-center gap-8">
        <Skeleton className="h-3 w-40" />
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </section>
    </div>
  )
}
