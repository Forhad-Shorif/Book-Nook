import MostReadBooks from "@/components/Books/MostReadBooks";
import HeroBanner from "@/components/shared/HeroBanner";
import Review from "@/components/shared/Review";
import UserGuide from "@/components/shared/UserGuide";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a1626] text-white overflow-hidden">
      
      {/* background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-1/4 w-[500px] h-[300px] bg-gradient-to-br from-indigo-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* ১. হিরো ব্যানার */}
      <section className="relative z-10">
        <HeroBanner />
      </section>

      {/* ২. user guide */}
      <section className="relative z-10 my-8 sm:my-12">
        <UserGuide />
      </section>

      {/* ৩. most read books */}
      <section className="relative z-10 my-12 sm:my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-slate-950/40 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <MostReadBooks />
        </div>
      </section>

      {/* ৪. reviews */}
      <section className="relative z-10 my-12 sm:my-16">
        <Review />
      </section>

    </main>
  );
}