"use client";

import { useEffect, useState } from "react";
import { JobPostService } from "../../services/JobPost.services";
import { useParams, useRouter } from "next/navigation";
import JobPostListing from "@/app/components/JobPostListing";

export default function JobPostList() {
  const router = useRouter();
  const params = useParams();
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    JobPostService.getInstance()
      .getJobPosts({ user_id: params.user_id })
      .then((response) => {
        setJobPosts(response);
      })
      .catch((error) => {
        throw error;
      });
  }, [params.user_id]);

  const onAdd = () => {
    router.push(`/job-posts/${params.user_id}/new`);
  };

  const onHome = () => {
    router.push(`/`);
  };

  const onView = (id) => {
    router.push(`/job-posts/${params.user_id}/${id}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <JobPostListing
        header_title={"Job Staff Dashboard"}
        data={jobPosts}
        view={"job_staff"}
        onView={onView}
        onHome={onHome}
        onAdd={onAdd}
      />
    </main>
  );
}
