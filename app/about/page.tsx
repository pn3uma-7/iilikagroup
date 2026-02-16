import Card from "@/components/ui/Card";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "About Us",
  description:
    "Learn about IILIKA GROUPS — our mission, leadership team, and the partners who help us deliver IT staffing, GCC enablement, and project delivery solutions.",
};

// Disable caching to always fetch fresh data
export const dynamic = "force-dynamic";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department?: string;
  bio?: string;
  photo_url?: string;
  linkedin_url?: string;
}

interface PartnerLogo {
  id: string;
  company_name: string;
  logo_url: string;
  website_url?: string;
  type: string;
}

export default async function About() {
  let teamMembers: TeamMember[] | null = null;
  let partnerLogos: PartnerLogo[] | null = null;

  try {
    const supabase = await createServerSupabaseClient();

    // Fetch team members
    const { data: teamData } = await supabase
      .from("team_members")
      .select("id, name, position, department, bio, photo_url, linkedin_url")
      .eq("status", "active")
      .order("display_order");
    teamMembers = teamData;

    // Fetch partner logos
    const { data: logoData } = await supabase
      .from("partner_logos")
      .select("id, company_name, logo_url, website_url, type")
      .eq("status", "active")
      .order("display_order");
    partnerLogos = logoData;
  } catch {
    // Supabase unavailable — page will render without dynamic data
  }

  const values = [
    {
      title: "Excellence",
      description: "Delivering top-tier talent and solutions that exceed expectations.",
      icon: "⭐",
    },
    {
      title: "Integrity",
      description: "Building trust through transparent and honest partnerships.",
      icon: "🤝",
    },
    {
      title: "Innovation",
      description: "Embracing modern technologies and methodologies.",
      icon: "💡",
    },
    {
      title: "Commitment",
      description: "Dedicated to long-term success of our clients and teams.",
      icon: "🎯",
    },
  ];

  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] -mt-20 overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="About IILIKA GROUPS"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-end pb-20 md:items-center md:pb-0">
          <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="max-w-3xl space-y-6">
              <div className="w-12 h-1 bg-[#FF000E]" />
              <p className="text-sm md:text-base uppercase tracking-[0.2em] text-white/80 font-medium">
                Our Story &middot; Our Values &middot; Our Team
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] uppercase">
                About IILIKA GROUPS
              </h1>
              <p className="text-base md:text-lg text-white/80 uppercase tracking-wide">
                Your trusted partner for IT staffing, GCC enablement, and service-based project delivery
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Get in Touch
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
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Our Story</h2>
              <div className="space-y-4 text-[#333333] leading-relaxed">
                <p>
                  IILIKA GROUPS was founded with a vision to bridge the gap between enterprise talent needs and skilled IT professionals. Based in Pune, Maharashtra, we've grown into a comprehensive technology services provider.
                </p>
                <p>
                  We specialize in three core areas: IT staffing and deployed resources, GCC (Global Capability Center) enablement, and service-based project delivery. Our approach combines deep technical expertise with a commitment to understanding our clients' unique business challenges.
                </p>
                <p>
                  Today, we serve 50+ enterprise clients across industries, having deployed over 500 engineers and enabled multiple GCC setups. Our 95% client retention rate speaks to the quality and reliability of our services.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/about-hero.jpg"
                alt="About IILIKA GROUPS"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-lg text-[#333333] max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-3">{value.title}</h3>
                <p className="text-[#333333] leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      {teamMembers && teamMembers.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Team</h2>
              <p className="text-lg text-[#333333] max-w-3xl mx-auto">
                Meet the people driving our success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member: TeamMember) => (
                <Card key={member.id} className="text-center">
                  {member.photo_url ? (
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.photo_url}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF000E] to-[#9E0008] flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-black mb-1">{member.name}</h3>
                  <p className="text-[#FF000E] font-medium mb-2">{member.position}</p>
                  {member.department && (
                    <p className="text-sm text-[#333333] mb-3">{member.department}</p>
                  )}
                  {member.bio && (
                    <p className="text-[#333333] text-sm leading-relaxed mb-4">{member.bio}</p>
                  )}
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#0077B5] hover:underline text-sm"
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner Logos Section */}
      {partnerLogos && partnerLogos.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Partners & Clients</h2>
              <p className="text-lg text-[#333333] max-w-3xl mx-auto">
                Trusted by leading organizations
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {partnerLogos.map((logo: PartnerLogo) => (
                <div key={logo.id} className="group">
                  {logo.website_url ? (
                    <a
                      href={logo.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      title={logo.company_name}
                    >
                      <Image
                        src={logo.logo_url}
                        alt={logo.company_name}
                        width={120}
                        height={60}
                        className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                      />
                    </a>
                  ) : (
                    <Image
                      src={logo.logo_url}
                      alt={logo.company_name}
                      width={120}
                      height={60}
                      className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                      title={logo.company_name}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Presence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card className="text-center">
              <div className="text-4xl mb-4">
                <svg className="w-10 h-10 mx-auto text-[#FF000E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Pune, Maharashtra</h3>
              <p className="text-[#333333] text-sm">Headquarters</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">
                <svg className="w-10 h-10 mx-auto text-[#FF000E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Nashik, Maharashtra</h3>
              <p className="text-[#333333] text-sm">Regional Office</p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
