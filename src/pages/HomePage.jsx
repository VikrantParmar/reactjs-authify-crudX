import { Container } from "@mui/material";

import AboutUs from "@/components/Home/AboutUs";
import Banner from "@/components/Home/Banner";
const Homepage = () => {
  return (
    <Container>
      <Banner />
      <AboutUs />
    </Container>
  );
};

export default Homepage;
