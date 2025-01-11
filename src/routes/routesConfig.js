import React from "react";
import config from "@/config";
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const HireMePage = React.lazy(() => import("@/pages/HireMePage"));
const LoginPage = React.lazy(() => import("@/pages/Auth/LoginPage"));
const RegisterPage = React.lazy(() => import("@/pages/Auth/RegisterPage"));
const ProfilePage = React.lazy(() => import("@/pages/Profile/ProfilePage"));
const NotFoundPage = React.lazy(() => import("@/pages/ErrorPages/Page404"));
//const AdminPanel = React.lazy(() => import("@/pages/Admin/AdminPanel"));
// Category-related imports
const CategoryListPage = React.lazy(() => import("@/pages/Category/"));
const BlogListPublic = React.lazy(() => import("@/pages/Blog/BlogListPublic"));
const BlogDetailPage = React.lazy(() => import("@/pages/Blog/"));
const BlogPage = React.lazy(() => import("@/pages/Blog/"));
const BlogAddPage = React.lazy(() => import("@/pages/Blog/BlogAddPage"));

const adminRoleId = config.roles.ADMIN_ROLE_ID;

const routes = [
  { path: "/", element: HomePage, isPublic: true },
  { path: "/hire-me", element: HireMePage, isPublic: true },
  { path: "/login", element: LoginPage, guestOnly: true },
  { path: "/register", element: RegisterPage, guestOnly: true },
  { path: "/my-profile", element: ProfilePage, authRequired: true },
  { path: "/update-password", element: ProfilePage, authRequired: true },
  //{ path: "/dashboard", element: ProfilePage, authRequired: true },
  //{ path: "/admin", element: AdminPanel, roles: [adminRoleId] },

  // Category-related routes
  { path: "/categories", element: CategoryListPage, roles: [adminRoleId] },

  // Article-related routes
  { path: "/my-articles", element: BlogPage, authRequired: true },
  { path: "/article-post", element: BlogAddPage, authRequired: true },
  { path: "/article-post/:id", element: BlogAddPage, authRequired: true },

  // Article-related Public routes
  { path: "/articles", element: BlogListPublic, isPublic: true },
  { path: "/article/:id", element: BlogDetailPage, isPublic: true },

  /* 
  //Category Seprate Routes
  {
    path: "/categories/:id/update",
    element: CategoryUpdatePage,
    roles: [adminRoleId],
  },
  {
    path: "/categories/:id",
    element: CategoryDetailsPage,
    roles: [adminRoleId],
  }, */
  { path: "*", element: NotFoundPage, isPublic: true },
];

export default routes;
