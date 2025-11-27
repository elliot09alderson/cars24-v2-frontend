import CarShowcase from "@/components/CarShowcase";
import HomeNavbar from "../components/HomeNavbar.jsx";
import Requirement from "./Home/Sections/Requirement.jsx";
import Footer from "../component_01/Footer.jsx";

export default function Index() {
  return (
    <div>
      <HomeNavbar />
      <CarShowcase />
      <Requirement />
      <Footer />
    </div>
  );
}
