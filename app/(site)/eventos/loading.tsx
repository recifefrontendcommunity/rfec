export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 pt-28 pb-12 md:pb-16">
      <div className="mb-8 space-y-3">
        <div className="bg-muted h-9 w-48 animate-pulse rounded-md" />
        <div className="bg-muted h-5 w-full max-w-2xl animate-pulse rounded-md" />
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <li
            key={index}
            className="border-border overflow-hidden rounded-3xl border"
          >
            <div className="bg-muted aspect-video animate-pulse" />
            <div className="space-y-2 p-4">
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
              <div className="bg-muted h-5 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
