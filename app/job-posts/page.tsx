"use client";

import { useEffect, useState } from "react";
import { JobPostService } from "../services/JobPost.services";
import { useRouter } from "next/navigation";
import JobPostListing from "../components/JobPostListing";

export default function JobPostList() {
  const router = useRouter();
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    JobPostService.getInstance()
      .getJobPosts({ status: "approved" })
      .then((response) => {
        setJobPosts(response);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const onHome = () => {
    router.push(`/`);
  };

  const onView = (id: number, status?: string) => {
    router.push(`/job-posts/view/${id}?status=${status}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <JobPostListing
        header_title={"Job Hunter Dashboard"}
        data={jobPosts}
        view={"job_hunter"}
        onView={onView}
        onHome={onHome}
      />
    </main>
  );
}
