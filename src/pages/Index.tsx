import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularCases from "@/components/PopularCases";
import Features from "@/components/Features";
import LiveDrops from "@/components/LiveDrops";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PopularCases />
        <Features />
        <LiveDrops />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
