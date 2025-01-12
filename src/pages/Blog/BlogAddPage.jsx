import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Container } from "@mui/material";
import BlogFormManager from "@/components/Blog/BlogFormManager";
import { useAuth } from "@/hooks/useAuth";
import config from "@/config";
import { useShowNotification } from "@/hooks/useShowNotification";
import { Navigate } from "react-router-dom";
export default function BlogAddPage() {
  const { showNotification } = useShowNotification();
  const { user } = useAuth();
  const adminRoleId = config.roles.ADMIN_ROLE_ID;
  const [isAdmin, setIsAdmin] = useState(user.role_id === adminRoleId);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      showNotification(
        "Sorry, due to data publishing restrictions, we are unable to perform Article Add, Update, or Delete operations on this platform.<br/>Please contact the site owner",
        "info"
      );
      setRedirect(true);
    }
  }, [isAdmin]);

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <Container>
      <Box>
        <Card>
          <CardContent>
            <BlogFormManager />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
