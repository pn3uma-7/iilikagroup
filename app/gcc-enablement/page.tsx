import Button from "@/components/ui/Button";
import ServicesProductsCarousel from "@/components/ServicesProductsCarousel";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "GCC Enablement",
  description:
    "End-to-end Global Capability Center setup and enablement. From strategy and planning to talent acquisition and operational excellence.",
};

export default function GCCEnablement() {
  const setupProcess = [
    {
      step: "01",
      title: "Strategy & Planning",
      description: "Define GCC objectives, location, and operational model",
    },
    {
      step: "02",
      title: "Infrastructure Setup",
      description: "Establish physical and technical infrastructure with partner network",
    },
    {
      step: "03",
      title: "Talent Acquisition",
      description: "Recruit and onboard skilled professionals aligned with your needs",
    },
    {
      step: "04",
      title: "Launch & Scale",
      description: "Go-live support and scaling to meet growing demands",
    },
  ];

  const models = [
    {
      title: "Build-Operate-Transfer (BOT)",
      description: "We build and operate your GCC, then transfer full ownership to you when ready.",
    },
    {
      title: "Build-Operate-Maintain (BOM)",
      description: "We build and continue operating your GCC on an ongoing basis.",
    },
    {
      title: "Consulting & Advisory",
      description: "Strategic guidance for organizations building GCCs independently.",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "GCC Enablement",
          description:
            "End-to-end Global Capability Center setup and enablement. From strategy and planning to talent acquisition and operational excellence.",
          provider: {
            "@type": "Organization",
            name: "IILIKA GROUPS",
            url: "https://iilikagroups.com",
          },
        }}
      />
      <section className="relative h-[70vh] min-h-[500px] -mt-20 overflow-hidden">
        <Image
          src="/images/gcc-hero.jpg"
          alt="GCC Enablement"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-end pb-20 md:items-center md:pb-0">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-3xl space-y-6">
              <div className="w-12 h-1 bg-[#FF000E]" />
              <p className="text-sm md:text-base uppercase tracking-[0.2em] text-white/80 font-medium">
                Strategy &middot; Setup &middot; Scale
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] uppercase">
                GCC Enablement
              </h1>
              <p className="text-base md:text-lg text-white/80 uppercase tracking-wide">
                Complete GCC setup, talent acquisition, and scaling support for global enterprises
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Schedule a Consultation
                    <svg
                      className="w-5 h-5 ml-2 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a1a] py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Our GCC Setup Process</h2>
            <p className="text-white/60 max-w-3xl">
              A proven four-phase approach to establishing your Global Capability Center
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {setupProcess.map((phase, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-6">
                <div className="text-4xl font-bold text-[#FF000E] mb-4 opacity-30">{phase.step}</div>
                <h3 className="text-lg font-semibold text-white mb-3 uppercase tracking-wide">{phase.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase">Engagement Models</h2>
            <p className="text-[#333333] max-w-3xl">
              Flexible models to match your GCC strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {models.map((model, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-4 uppercase tracking-wide">{model.title}</h3>
                <p className="text-[#333333] text-sm leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a1a] py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Key Metrics We Deliver</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: "30-45 Days", label: "Time to First Hire" },
              { metric: "40-60%", label: "Cost Savings" },
              { metric: "100+", label: "Roles Filled per GCC" },
              { metric: "10+", label: "GCCs Enabled" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#FF000E] mb-2">{item.metric}</div>
                <div className="text-white/60 text-sm font-medium uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesProductsCarousel />

      <section className="bg-[#333333] text-white py-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Ready to Set Up Your GCC?</h2>
            <p className="text-white/60 mb-8">
              Let&apos;s discuss your GCC strategy and how we can help you establish a world-class capability center.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Schedule a Consultation
                <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
