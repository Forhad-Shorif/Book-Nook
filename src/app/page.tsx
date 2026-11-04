import MostReadBooks from "@/components/Books/MostReadBooks";
import HeroBanner from "@/components/shared/HeroBanner";
import Review from "@/components/shared/Review";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <MostReadBooks />
      <Review />
    </div>
  );
}
