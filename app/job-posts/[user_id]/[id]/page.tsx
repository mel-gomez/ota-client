import JobPostDetail from "@/app/components/JobPostDetail";

export default function JobPostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <JobPostDetail id={params.id} />
    </main>
  );
}
