import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import ShowcardOffer from "@/components/showcardOffer";

export default function Home() {
  return (
    <div
      className={`flex flex-col items-center mt-6 mx-[5%] bg-[url('/pug_croped.jpg')] bg-contain bg-no-repeat bg-top-right h-screen group relative`}
    >
      <Navbar />
      <Landing />
      <ShowcardOffer />
    </div>
  );
}
