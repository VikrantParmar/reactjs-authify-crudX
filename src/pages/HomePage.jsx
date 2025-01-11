import { Container } from "@mui/material";

import AboutUs from "@/components/Home/AboutUs";
import Banner from "@/components/Home/Banner";
import AboutApp from "@/components/Home/AboutApp";
const HomePage = () => {
  return (
    <Container>
      <Banner />
      <AboutUs />
      <AboutApp />
    </Container>
  );
};

export default HomePage;
