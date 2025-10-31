"use client";

import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();

  const users = [
    "Job Staff 1",
    "Job Staff 2",
    "Job Staff 3",
    "Job Hunter",
    "Job Posting Moderator",
  ];

  const onUserSelect = (index: number) => {
    switch (index) {
      case 4:
        return router.push(`/job-posts`);
        break;
      case 5:
        return router.push(`/job-posts/moderator`);
        break;
      default:
        return router.push(`/job-posts/${index}`);
        break;
    }
  };

  return (
    <div className="container">
      <div className="card mt-10 text-center">
        <h1 className="text-2xl font-bold text-white-600 mb-4">Mock Login</h1>
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          {users.map((user, index) => (
            <button
              key={user}
              className="primary"
              onClick={() => onUserSelect(index + 1)}
            >
              {user}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
