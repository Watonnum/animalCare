import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-6 mx-[5%]">
      <Navbar />
      <p className="my-96 text-3xl">Landing Page...</p>
    </div>
  );
}
