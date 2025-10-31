"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import JobPostService from "@/app/services/JobPost.services";
import { useRouter } from "next/navigation";
import he from "he";
import JobPostListing from "@/app/components/JobPostListing";

interface JobPost {
  id: number;
  title: string;
  description?: string;
  created_at?: string;
  status?: string;
}

interface NotificationData {
  title: string;
  message: string;
  job_post_id: number;
}

interface Notification {
  id: number | string;
  data: NotificationData;
  created_at?: string;
  status?: string;
}

export default function ModeratorPage() {
  const router = useRouter();

  const [seenIds, setSeenIds] = useState<(string | number)[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  const fetchJobPostings = () => {
    JobPostService.getInstance()
      .getJobPosts()
      .then((response) => {
        setJobPosts(response);
      })
      .catch((error) => {
        throw error;
      });
  };

  const onHome = () => {
    router.push(`/`);
  };

  const onView = (id: number, status?: string) => {
    router.push(`/job-posts/view/${id}?status=${status}`);
  };

  const onApprove = (id: number) => {
    const payload = {
      id: id,
      status: "approved",
    };
    JobPostService.getInstance()
      .updateJobPost(payload)
      .then((response) => {
        toast.success("Job post saved successfully!");
        fetchJobPostings();
      })
      .catch((error) => {
        throw error;
        const message =
          error.response?.data?.message || "Failed to save job post.";
        toast.error(message);
      });
  };

  const onMarkAsSpam = (id: number) => {
    const payload = {
      id: id,
      status: "spam",
    };
    JobPostService.getInstance()
      .updateJobPost(payload)
      .then((response) => {
        toast.success("Job post saved successfully!");
        fetchJobPostings();
      })
      .catch((error) => {
        throw error;
        const message =
          error.response?.data?.message || "Failed to save job post.";
        toast.error(message);
      });
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/moderator-notifications`
      );

      if (Array.isArray(res.data.data)) {
        const notifications = res.data.data;
        const newNotifications = notifications.filter(
          (n: Notification) => !seenIds.includes(n.id)
        );

        newNotifications.forEach((notification: Notification) => {
          toast.custom(
            (t) => (
              <div className="bg-white shadow p-3 rounded">
                <p className="font-bold text-blue-400">
                  {notification.data.title}
                </p>
                <div
                  className="text-gray-700 text-sm prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: he.decode(notification.data.message || ""),
                  }}
                ></div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onApprove(notification.data.job_post_id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onMarkAsSpam(notification.data.job_post_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Mark as Spam
                  </button>
                </div>
              </div>
            ),
            {
              duration: 4000,
            }
          );
        });

        // setSeenIds((prev) => [...prev, ...newNotifications.map((n) => n.id)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [seenIds]);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <JobPostListing
        header_title={"Moderator Dashboard"}
        data={jobPosts}
        view={"moderator"}
        onView={onView}
        onHome={onHome}
        onApprove={onApprove}
        onMarkAsSpam={onMarkAsSpam}
      />
    </main>
  );
}
