import Button from "@/components/ui/Button";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import Link from "next/link";
import Image from "next/image";
import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid";

// Disable caching to always fetch fresh data
export const dynamic = "force-dynamic";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client_name?: string;
  industry?: string;
  challenge: string;
  results: string[];
  technologies: string[];
  thumbnail_url?: string;
}

export const metadata = {
  title: "Case Studies",
  description:
    "Explore how IILIKA GROUPS has helped enterprises with IT staffing, GCC enablement, and project delivery.",
};

export default async function CaseStudiesPage() {
  const supabase = await createServerSupabaseClient();

  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select(`
      id,
      slug,
      title,
      client_name,
      industry,
      challenge,
      results,
      technologies,
      thumbnail_url
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] -mt-20 overflow-hidden">
        <Image
          src="/images/case-studies.jpg"
          alt="IILIKA GROUPS Case Studies"
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
                Results &middot; Partnerships &middot; Success
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] uppercase">
                Case Studies
              </h1>
              <p className="text-base md:text-lg text-white/80 uppercase tracking-wide">
                Real results from real partnerships. See how we&apos;ve helped enterprises succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <CaseStudiesGrid caseStudies={(caseStudies as CaseStudy[]) || []} />
        </div>
      </section>

      <section className="bg-[#333333] text-white py-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="w-12 h-1 bg-[#FF000E] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Ready to Be Our Next Success Story?</h2>
            <p className="text-white/60 mb-8">
              Let&apos;s discuss how we can help transform your business with the right talent and solutions.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Start the Conversation
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
