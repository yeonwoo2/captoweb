import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import DownloadSection from '@/components/landing/DownloadSection';
import FAQSection from '@/components/landing/FAQSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <HowItWorksSection />
      <DownloadSection />
      <FAQSection />
    </main>
  );
}
