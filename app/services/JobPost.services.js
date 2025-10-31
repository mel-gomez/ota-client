import { Component } from "react";

export class JobPostService extends Component {
  static getInstance() {
    return new JobPostService();
  }

  async getJobPosts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      console.log("query: ", query);
      const url = `http://localhost:8000/api/job-post${
        query ? `?${query}` : ""
      }`;
      console.log("url: ", url);
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
      const result = await fetch("http://localhost:8000/api/job-post/" + id, {
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

  async getExternalJobPost(id) {
    try {
      const result = await fetch(
        "http://localhost:8000/api/external-job-post/" + id,
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
      let result = await fetch("http://localhost:8000/api/job-post/", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(param),
      });

      let responseJson = await result.json();

      return responseJson;
    } catch (error) {
      throw error;
    }
  }

  async updateJobPost(param) {
    // console.log("params: ", param);
    try {
      let result = await fetch(
        "http://localhost:8000/api/job-post/" + param.id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
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
