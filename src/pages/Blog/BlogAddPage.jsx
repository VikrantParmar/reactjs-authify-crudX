import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Container } from "@mui/material";
import BlogFormManager from "@/components/Blog/BlogFormManager";

export default function BlogAddPage() {
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
