import React from "react";
import config from "@/config";
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const AboutPage = React.lazy(() => import("@/pages/AboutPage"));
const LoginPage = React.lazy(() => import("@/pages/Auth/LoginPage"));
const RegisterPage = React.lazy(() => import("@/pages/Auth/RegisterPage"));
const ProfilePage = React.lazy(() => import("@/pages/Profile/ProfilePage"));
const NotFoundPage = React.lazy(() => import("@/pages/ErrorPages/Page404"));
//const AdminPanel = React.lazy(() => import("@/pages/Admin/AdminPanel"));
// Category-related imports
const CategoryListPage = React.lazy(() => import("@/pages/Category/"));
const adminRoleId = config.roles.ADMIN_ROLE_ID;

const routes = [
  { path: "/", element: HomePage, isPublic: true },
  { path: "/about", element: AboutPage, isPublic: true },
  { path: "/login", element: LoginPage, guestOnly: true },
  { path: "/register", element: RegisterPage, guestOnly: true },
  { path: "/my-profile", element: ProfilePage, authRequired: true },
  { path: "/update-password", element: ProfilePage, authRequired: true },
  //{ path: "/dashboard", element: ProfilePage, authRequired: true },
  //{ path: "/admin", element: AdminPanel, roles: [adminRoleId] },

  // Category-related routes
  { path: "/categories", element: CategoryListPage, roles: [adminRoleId] },
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
