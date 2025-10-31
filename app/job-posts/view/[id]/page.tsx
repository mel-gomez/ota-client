import JobPostView from "@/app/components/JobPostView";

export default function JobPostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <JobPostView id={params.id} />
    </main>
  );
}
