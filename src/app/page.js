import Banner from "@/component/Banner";
import FeatureFacilities from "@/component/FeatureFacilities";
import Testimonials from "@/component/Testimonials";
import WhyChooseUs from "@/component/WhyChooseUs";
import Image from "next/image";



export default function Home() {
  return <div className="">
    <Banner></Banner>
    <FeatureFacilities></FeatureFacilities>
    <WhyChooseUs></WhyChooseUs>
    <Testimonials></Testimonials>
  </div>;
}
