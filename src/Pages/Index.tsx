import CarShowcase from "@/components/CarShowcase";
import HomeNavbar from "../components/HomeNavbar.jsx";
import Requirement from "./Home/Sections/Requirement.jsx";
export default function Index() {
  return (
    <div>
      <HomeNavbar />
      <CarShowcase />;
      <Requirement />
    </div>
  );
}
