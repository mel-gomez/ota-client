"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import JobPostService from "../services/JobPost.services";
import "react-datepicker/dist/react-datepicker.css";
import he from "he";
import { formatDate } from "../utility/dateFormatter";

interface JobPost {
  id: number;
  title: string;
  description?: string;
  created_at?: string;
  status?: string;
}

interface JobPostViewProps {
  id: string;
}

export default function JobPostView({ id }: JobPostViewProps) {
  const params = useParams();
  const [jobPost, setJobPost] = useState<JobPost | null>(null);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status !== "external") {
      JobPostService.getInstance()
        .getJobPost(params.id)
        .then((response) => {
          setJobPost(response);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      JobPostService.getInstance()
        .getExternalJobPost(params.id)
        .then((response) => {
          setJobPost(response);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [params.id]);

  return (
    <div className="container">
      <div className="card mt-10 text-left">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            View Job Post
          </h1>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.history.back()}
              className="bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              ← Back
            </button>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h1 className="text-2xl font-bold !text-gray-900 mb-2">
            {jobPost?.title}
          </h1>

          <p className="!text-gray-600 mb-6">
            Posted on{" "}
            <span className="font-medium">
              {jobPost?.created_at ? formatDate(jobPost.created_at) : "N/A"}
            </span>
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold !text-gray-800 mb-2">
                Description
              </h2>
              <div
                className="text-gray-700 text-sm prose max-w-none"
                style={{ overflow: "hidden" }}
                dangerouslySetInnerHTML={{
                  __html: he.decode(jobPost?.description || "<p>N/A</p>"),
                }}
              ></div>
            </div>

            <div>
              <h2 className="text-lg font-semibold !text-gray-800 mb-2">
                Status
              </h2>
              <p
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  jobPost?.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : jobPost?.status === "spam"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {jobPost?.status || "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
