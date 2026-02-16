import { createServerSupabaseClient } from "@/lib/supabase-server";
import InsightsGrid from "@/components/insights/InsightsGrid";
import Image from "next/image";

// Disable caching to always fetch fresh data
export const dynamic = "force-dynamic";

interface Author {
  name: string;
  photo_url?: string;
}

interface InsightRaw {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  cover_image_url?: string;
  created_at: string;
  author: Author[] | null;
}

interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  tags: string[];
  cover_image_url?: string;
  created_at: string;
  author: Author | null;
}

export const metadata = {
  title: "Insights",
  description:
    "Expert insights on IT staffing, GCC enablement, and technology trends from IILIKA GROUPS.",
};

export default async function InsightsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: rawInsights } = await supabase
    .from("insights")
    .select(`
      id,
      slug,
      title,
      excerpt,
      tags,
      cover_image_url,
      created_at,
      author:team_members(name, photo_url)
    `)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  // Transform the data to flatten the author array
  const insights: Insight[] = rawInsights?.map((item: InsightRaw) => ({
    ...item,
    author: Array.isArray(item.author) && item.author.length > 0 ? item.author[0] : null,
  })) || [];

  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] -mt-20 overflow-hidden">
        <Image
          src="/images/insights-hero.jpg"
          alt="IILIKA GROUPS Insights"
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
                Perspectives &middot; Trends &middot; Technology
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] uppercase">
                Insights
              </h1>
              <p className="text-base md:text-lg text-white/80 uppercase tracking-wide">
                Expert perspectives on IT staffing, GCC enablement, and technology trends
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <InsightsGrid insights={insights} />
        </div>
      </section>
    </>
  );
}
