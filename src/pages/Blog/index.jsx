import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import MyBlog from "@/components/Blog/MyBlog";

export default function Blog() {
  return (
    <Container>
      <MyBlog />
    </Container>
  );
}
