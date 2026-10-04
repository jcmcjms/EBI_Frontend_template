const PLACEHOLDER_PANEL_COUNT = 6

export function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: PLACEHOLDER_PANEL_COUNT }, (_, index) => (
        <div key={index} className="h-72 bg-muted" aria-hidden="true" />
      ))}
      <div className="h-72 bg-muted md:col-span-2 xl:col-span-full" aria-hidden="true" />
    </div>
  )
}