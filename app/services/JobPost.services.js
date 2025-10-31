import { Component } from "react";

export class JobPostService extends Component {
  static getInstance() {
    return new JobPostService();
  }

  async getJobPosts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/job-post${
        query ? `?${query}` : ""
      }`;
      const result = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const response = await result.json();

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getJobPost(id) {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-post/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const response = await result.json();

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getExternalJobPost(id) {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/external-job-post/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const response = await result.json();

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createJobPost(param) {
    try {
      let result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-post/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(param),
        }
      );

      let responseJson = await result.json();

      return responseJson;
    } catch (error) {
      throw error;
    }
  }

  async updateJobPost(param) {
    try {
      let result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job-post/${param.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(param),
        }
      );

      let responseJson = await result.json();

      return responseJson;
    } catch (error) {
      throw error;
    }
  }
}

export default JobPostService;
