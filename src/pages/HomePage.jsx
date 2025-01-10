import { Container } from "@mui/material";

import AboutUs from "@/components/Home/AboutUs";
import Banner from "@/components/Home/Banner";
import AboutApp from "@/components/Home/AboutApp";
import WhyMe from "@/components/Home/WhyMe";
const Homepage = () => {
  return (
    <Container>
      <Banner />
      <AboutUs />
      <AboutApp />
      <WhyMe />
    </Container>
  );
};

export default Homepage;
