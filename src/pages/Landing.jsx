import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PricingSection from '../components/landing/PricingSection';
import DownloadSection from '../components/landing/DownloadSection';

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <DownloadSection />
    </main>
  );
}
