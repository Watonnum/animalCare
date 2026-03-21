import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import ShowcardOffer from "@/components/showcardOffer";
import WhyUs from "@/components/whyUs";

export default function Home() {
  return (
    <div className={`flex flex-col items-center h-screen`}>
      <Landing />
      <WhyUs />
    </div>
  );
}
