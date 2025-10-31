"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import he from "he";
import { formatDate } from "../utility/dateFormatter";

interface JobPost {
  id: number;
  title: string;
  description?: string;
  created_at?: string;
  status?: string;
}

interface JobPostListingProps {
  header_title: string;
  data: [];
  view: "job_staff" | "moderator" | "job_hunter";
  onAdd?: () => void;
  onHome?: () => void;
  onView?: (id: number, status?: string) => void;
  onApprove?: (id: number) => void;
  onMarkAsSpam?: (id: number) => void;
}

export default function JobPostListing(props: JobPostListingProps) {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    setJobPosts(props.data);
  }, [props]);

  return (
    <div className="container">
      <div className="card mt-10 text-left">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <Toaster position="top-right" reverseOrder={false} />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              {props.header_title}
            </h1>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => props.onAdd?.()}
                hidden={props.view !== "job_staff"}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                + Add Job Post
              </button>

              <button
                onClick={() => props.onHome?.()}
                className="bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </div>

          <ul className="space-y-5">
            {jobPosts.map((job: JobPost) => (
              <li
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold !text-gray-900 mb-1">
                      {job.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3">
                      {job.created_at
                        ? formatDate(job.created_at)
                        : "Date not specified"}
                    </p>
                    <div
                      className="text-gray-700 text-sm leading-relaxed prose max-w-none line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: he.decode(job.description || ""),
                      }}
                    ></div>
                  </div>

                  <div className="flex sm:flex-col gap-2 sm:gap-3 sm:items-end">
                    <button
                      onClick={() => props.onView?.(job.id, job.status)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:bg-blue-700 transition"
                    >
                      {props.view === "job_staff" ? "Edit" : "View"}
                    </button>

                    <button
                      onClick={() => props.onApprove?.(job.id)}
                      disabled={
                        job.status === "approved" || job.status === "external"
                      }
                      hidden={props.view !== "moderator"}
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => props.onMarkAsSpam?.(job.id)}
                      disabled={
                        job.status === "spam" || job.status === "external"
                      }
                      hidden={props.view !== "moderator"}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm shadow-sm hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      Mark as Spam
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {jobPosts.length === 0 && (
            <div className="text-center mt-10">
              <span className="text-white-500 text-base">
                No job posts available.{" "}
                {props.view === "job_staff" && (
                  <>
                    Click{" "}
                    <span className="font-semibold text-white-600">
                      "Add Job Post"
                    </span>{" "}
                    to create one.
                  </>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
