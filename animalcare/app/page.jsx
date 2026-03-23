import CarePhilosophy from "@/components/carephilosophy";
import FeaturedSupplies from "@/components/FeaturedSupplies";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import ShowcardOffer from "@/components/showcardOffer";
import WhyUs from "@/components/whyUs";

export default function Home() {
  return (
    <div className={`flex flex-col items-center min-h-screen`}>
      <Landing />
      <CarePhilosophy />
      <FeaturedSupplies />
      <WhyUs />
    </div>
  );
}
