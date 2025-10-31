"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobPostService } from "@/app/services/JobPost.services";
import { toast } from "react-toastify";

export default function NewJobPostPage() {
  const router = useRouter();
  const params = useParams();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    created_at: "",
    user_id: "",
  });

  const onCancel = () => {
    return router.push(`/job-posts/${params.user_id}`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await JobPostService.getInstance().createJobPost({
        ...formData,
        user_id: params.user_id,
      });
      toast.success("Job post created successfully!");
      window.history.back();
    } catch (error) {
      toast.error("Failed to create job post.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container">
        <div className="card mt-10 text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 !text-center">
            Create Job Post
          </h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white-900 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition"
                placeholder="Enter job title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white-900 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 transition"
                placeholder="Write a detailed job description..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className={`px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition ${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
