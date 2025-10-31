"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import JobPostService from "../services/JobPost.services";
import { toast, ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

type JobPostForm = {
  title: string;
  description: string;
  created_at: string;
};

export default function JobPostDetail() {
  const defaultValues: JobPostForm = {
    title: "",
    description: "",
    created_at: "",
  };
  const params = useParams();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<JobPostForm>({
    defaultValues,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    JobPostService.getInstance()
      .getJobPost(params.id)
      .then((response) => {
        reset(response);
      })
      .catch((error) => {
        throw error;
      });
  }, [params.id]);

  const handleSave = (data: JobPostForm) => {
    setSaving(true);
    const payload = {
      ...data,
      id: params.id,
    };
    JobPostService.getInstance()
      .updateJobPost(payload)
      .then((response) => {
        toast.success("Job post saved successfully!");
        window.history.back();
      })
      .catch((error) => {
        throw error;
        const message =
          error.response?.data?.message || "Failed to save job post.";
        toast.error(message);
      });
  };

  const handleCancel = () => {
    router.push(`/job-posts/${params.user_id}`);
  };

  return (
    <div className="container">
      <div className="card mt-10 text-left">
        <ToastContainer position="top-right" autoClose={3000} />

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Job Post
        </h2>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter job title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              placeholder="Write a detailed job description..."
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg border border-gray-200 
            hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className={`px-5 py-2.5 rounded-lg text-white font-medium transition-colors
            ${
              saving
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
