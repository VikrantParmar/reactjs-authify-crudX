import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useShowNotification } from "@/hooks/useShowNotification";

export const PublicRoute = ({ children }) => <>{children}</>;

export const GuestRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : <>{children}</>;
};

export const AuthenticatedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export const PrivateRoute = ({ children, roles }) => {
  const { showNotification } = useShowNotification();
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role_id)) {
    showNotification(
      "Sorry, you’re not authorized to view this content.",
      "error"
    );
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
GuestRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.number),
};
