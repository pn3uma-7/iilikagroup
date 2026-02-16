import Button from "@/components/ui/Button";
import ServicesProductsCarousel from "@/components/ServicesProductsCarousel";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  title: "Service-Based Project Delivery",
  description:
    "End-to-end project delivery across frontend, backend, mobile, cloud, and data engineering. Fixed-scope, dedicated team, and hybrid engagement models.",
};

export default function ServiceBasedProjects() {
  const techStacks = [
    { name: "Frontend", technologies: "React, Next.js, Vue, Angular, TypeScript" },
    { name: "Backend", technologies: "Node.js, Python, Java, .NET, Go" },
    { name: "Mobile", technologies: "React Native, Flutter, iOS, Android" },
    { name: "Cloud & DevOps", technologies: "AWS, Azure, GCP, Docker, Kubernetes" },
    { name: "Data & AI", technologies: "PostgreSQL, MongoDB, ML/AI, Data Engineering" },
  ];

  const engagementModels = [
    {
      title: "Fixed-Scope Projects",
      description: "Well-defined deliverables with fixed timeline and budget",
      bestFor: "Clear requirements, specific outcomes",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Time & Materials",
      description: "Flexible engagement billed on actual time and resources",
      bestFor: "Evolving requirements, ongoing development",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Retainer Model",
      description: "Dedicated team on monthly retainer for continuous delivery",
      bestFor: "Long-term partnerships, continuous improvement",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Service-Based Project Delivery",
          description:
            "End-to-end project delivery across frontend, backend, mobile, cloud, and data engineering. Fixed-scope, dedicated team, and hybrid engagement models.",
          provider: {
            "@type": "Organization",
            name: "IILIKA GROUPS",
            url: "https://iilikagroups.com",
          },
        }}
      />
      <section className="relative h-[70vh] min-h-[500px] -mt-20 overflow-hidden">
        <Image
          src="/images/project-delivery-hero.jpg"
          alt="Service-Based Project Delivery"
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
                Managed Squads &middot; Full Ownership &middot; Delivery
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] uppercase">
                Project Delivery
              </h1>
              <p className="text-base md:text-lg text-white/80 uppercase tracking-wide">
                Full project ownership with managed development squads and proven delivery excellence
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Discuss Your Project
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

      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-1 bg-[#FF000E] mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 uppercase">
                Complete Project Ownership
              </h2>
              <div className="space-y-4 text-[#333333] leading-relaxed">
                <p>
                  Like leading service providers such as TechM and Wipro, we take full ownership of your project from conception to delivery. Our managed squads work as an extension of your team.
                </p>
                <p>
                  We handle everything: requirements analysis, architecture design, development, testing, deployment, and ongoing maintenance. You get predictable outcomes without the overhead of managing individual contractors.
                </p>
              </div>
              <ul className="space-y-3 mt-6">
                {[
                  "End-to-end project management",
                  "Dedicated development squads",
                  "Agile delivery methodology",
                  "Quality assurance & testing",
                  "Post-deployment support",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-[#FF000E] mr-3 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[#333333]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/project-delivery-hero.jpg"
                alt="Project Delivery"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1a1a1a] py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase">Engagement Models</h2>
            <p className="text-white/60 max-w-3xl">
              Choose the model that best fits your project needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model, index) => (
              <div key={index} className="border border-white/10 rounded-lg p-6">
                <div className="text-[#FF000E] mb-4">{model.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3 uppercase tracking-wide">{model.title}</h3>
                <p className="text-white/60 mb-4 text-sm leading-relaxed">{model.description}</p>
                <p className="text-xs text-[#FF000E] font-medium uppercase tracking-wider">Best for: {model.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mb-12">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 uppercase">Technology Expertise</h2>
            <p className="text-[#333333] max-w-3xl">
              Full-stack capabilities across modern technology stacks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStacks.map((stack, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-black mb-2 uppercase tracking-wide">{stack.name}</h3>
                <p className="text-[#333333] text-sm leading-relaxed">{stack.technologies}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Start Your Next Project</h2>
            <p className="text-white/60 mb-8">
              Let&apos;s discuss your project requirements and how our managed squads can deliver results.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Discuss Your Project
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
