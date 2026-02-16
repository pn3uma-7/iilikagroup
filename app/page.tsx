import Hero from "@/components/Hero";
import Button from "@/components/ui/Button";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  const services = [
    {
      title: "Staffing & Deployed Resources",
      description: "Onsite, hybrid, and remote engineers. Permanent and contract IT hiring tailored to your needs.",
      icon: (
        <svg className="w-8 h-8 text-[#FF000E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: "/staffing",
    },
    {
      title: "Service-Based Project Delivery",
      description: "Full project ownership with managed squads. Fixed-scope, T&M, and retainer engagement models.",
      icon: (
        <svg className="w-8 h-8 text-[#FF000E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      link: "/service-based-projects",
    },
    {
      title: "GCC Enablement",
      description: "Complete GCC setup with talent acquisition and infrastructure partners. Scale and transition support.",
      icon: (
        <svg className="w-8 h-8 text-[#FF000E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: "/gcc-enablement",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "IILIKA GROUPS",
          url: "https://iilikagroups.com",
        }}
      />
      <Hero />

      <section className="bg-[#1a1a1a] py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Our Core Services</h2>
            <p className="text-white/60 max-w-3xl">
              Three pillars of excellence powering modern enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3 uppercase tracking-wide">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{service.description}</p>
                <Link href={service.link}>
                  <Button variant="outline-light" size="sm">
                    Learn More
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a1a] border-t border-white/10 py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Why Choose IILIKA GROUPS</h2>
            <p className="text-white/60 max-w-3xl">
              Trusted partner for building high-performance teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "180+", label: "Engineers Deployed" },
              { number: "50+", label: "Enterprise Clients" },
              { number: "5+", label: "GCCs Enabled" },
              { number: "95%", label: "Client Retention" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#FF000E] mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase">Client Testimonials</h2>
            <p className="text-[#333333] max-w-3xl">
              Hear what our clients say about working with us
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="bg-[#333333] text-white py-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Ready to Build Your Team?</h2>
            <p className="text-white/60 mb-8">
              Let&apos;s discuss how we can help you with staffing, project delivery, or GCC enablement.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Get in Touch
                  <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="outline-light" size="sm">
                  Case Studies
                </Button>
              </Link>
              <Link href="/insights">
                <Button variant="outline-light" size="sm">
                  Insights
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
