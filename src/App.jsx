import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import ValueProps from "./components/sections/ValueProps";
import MenuCatalog from "./components/sections/MenuCatalog";
import CustomBuilder from "./components/sections/CustomBuilder";
import AvailabilityCal from "./components/sections/AvailabilityCal";
import HowToOrder from "./components/sections/HowToOrder";
import Testimonials from "./components/sections/Testimonials";
import AuthWaModal from "./components/overlays/AuthWaModal";
import CartDrawer from "./components/overlays/CartDrawer";
import OrderSuccessModal from "./components/overlays/OrderSuccessModal";
import ReviewModal from "./components/overlays/ReviewModal";
import Toast from "./components/ui/Toast";
import MobileCartBar from "./components/ui/MobileCartBar";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9F7F2] text-[#1F2421]">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <ValueProps />
        <MenuCatalog />
        <CustomBuilder />
        <AvailabilityCal />
        <HowToOrder />
        <Testimonials />
      </main>

      <Footer />

      {/* Overlays & Global Feedback */}
      <AuthWaModal />
      <CartDrawer />
      <OrderSuccessModal />
      <ReviewModal />
      <MobileCartBar />
      <Toast />
    </div>
  );
}
