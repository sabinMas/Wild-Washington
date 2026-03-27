export default function LoadingSpeciesPage() {
  return (
    <div className="shell py-12">
      <div className="panel rounded-[2rem] p-10">
        <div className="h-8 w-40 animate-pulse rounded-full bg-mist" />
        <div className="mt-6 h-20 w-3/4 animate-pulse rounded-[1.5rem] bg-mist" />
        <div className="mt-6 h-8 w-1/2 animate-pulse rounded-full bg-mist" />
      </div>
    </div>
  );
}
