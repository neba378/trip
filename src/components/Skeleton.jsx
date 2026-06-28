export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md ${className}`}
      style={{ background: 'rgba(255,255,255,0.03)' }}
      {...props}
    />
  );
}

export function TripCardSkeleton() {
  return (
    <div className="card h-[450px] flex flex-col">
      <Skeleton className="h-56 w-full rounded-t-2xl" />
      <div className="p-6 flex-1 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-1 w-full" />
        <div className="pt-6 border-t border-savanna-gold/10 flex justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function AdminTableRowSkeleton() {
  return (
    <tr className="border-b border-savanna-gold/10">
      <td className="p-4 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </td>
      <td className="p-4 space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-20" />
      </td>
      <td className="p-4 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </td>
      <td className="p-4">
        <Skeleton className="h-6 w-16 rounded-full" />
      </td>
      <td className="p-4">
        <div className="flex justify-center gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}
