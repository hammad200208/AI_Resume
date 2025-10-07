import Image from "next/image";
import Hero from "./components/Hero";
import TemplateSection from "./components/TemplateSection";
import CareerSection from "./components/CareerSection";
import CustomerReviewSection from "./components/CustomerReviewSection";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      <Hero />
      <TemplateSection />
      <CareerSection />
      <CustomerReviewSection />
      <Footer />
    </>
  );
}
