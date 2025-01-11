import { Container } from "@mui/material";

import AboutUs from "@/components/Home/AboutUs";
import WhyMe from "@/components/Home/WhyMe";
import ConnectToMe from "@/components/Home/ConnectToMe";

const HireMePage = () => {
  return (
    <Container>
      <AboutUs />
      <WhyMe />
      <ConnectToMe />
    </Container>
  );
};

export default HireMePage;
