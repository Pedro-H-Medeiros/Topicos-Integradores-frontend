import { Skeleton } from '../ui/skeleton'

export default function TaskCardSkeleton() {
  return (
    <main>
      <section className="rounded-2xl flex items-center h-16 px-3 transition-all cursor-pointer">
        <div className="flex gap-5 flex-1">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-[100px]" />
          <Skeleton className="h-7 w-[160px]" />
        </div>
      </section>
      <section className="rounded-2xl flex items-center h-16 px-3 transition-all cursor-pointer">
        <div className="flex gap-5 flex-1">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-[100px]" />
          <Skeleton className="h-7 w-[160px]" />
        </div>
      </section>
    </main>
  )
}
