OTA Client (Next.js)

A modern, responsive web client built with **Next.js (React)** that interfaces with the OTA Server (Laravel 12 API).
The frontend emphasizes performance, modularity, and ease of integration with RESTful endpoints.

Tech Stack

| Component         | Technology                | Reason for Use                                                             |
| ----------------- | ------------------------- | -------------------------------------------------------------------------- |
| Framework         | **Next.js (React)**       | Offers SSR (Server-Side Rendering) and static generation for speed and SEO |
| UI Styling        | **Tailwind CSS**          | Utility-first CSS framework for fast and consistent styling                |
| State Management  | **React Query / Zustand** | Efficient caching and server state synchronization                         |
| API Communication | **Fetch/Axios**           | Simplifies HTTP requests to Laravel API                                    |
| Routing           | **Next.js Routing**       | File-based routing for simple navigation and page control                  |
| Hosting           | **Vercel**                | Optimized platform for deploying Next.js apps with zero-config CI/CD       |

System Flow

1. **User interacts** with the UI (forms, tables, dashboards).
2. **API call** via Fetch/Axios → sent to Laravel API hosted on Railway.
3. **Laravel returns JSON** responses.
4. **React Query** caches results and updates UI state reactively.
5. **Conditional rendering** based on data and user auth state.
6. **Dynamic routing** supports user-specific views and role-based access.

Key Features

- Fully responsive UI (Tailwind CSS)
- RESTful integration with backend
- Modular component and layout structure
- Hooks and utilities for reusability
- Environment-based configuration (`NEXT_PUBLIC_API_URL`)

Design Decisions (Why I Used This, Not That)

- **Next.js vs Vue/Nuxt**: Chose Next.js for its SSR and strong React ecosystem support.
- **Axios vs Fetch**: Axios provides simpler error handling and interceptors for attaching tokens.
- **Tailwind CSS vs Bootstrap**: Faster development with design consistency and less CSS bloat.
- **Vercel vs Netlify**: Native integration with Next.js, providing faster deploys and previews.
- **React Query vs Redux**: Focuses on server-state management; lighter and easier for APIs.

Deployment Flow

- `git push` to main → triggers Vercel auto-deployment.
- Environment variables configured in Vercel dashboard.
- Backend API URL is read from `NEXT_PUBLIC_API_URL`.
- Frontend automatically rebuilds and redeploys after merge.
