"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

interface Author {
  name: string;
  photo_url?: string;
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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsGrid({ insights }: { insights: Insight[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInsights = useMemo(() => {
    if (!searchQuery.trim()) return insights;
    const query = searchQuery.toLowerCase().trim();
    return insights.filter((insight) => {
      const titleMatch = insight.title.toLowerCase().includes(query);
      const excerptMatch = insight.excerpt?.toLowerCase().includes(query) ?? false;
      const tagsMatch = insight.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      ) ?? false;
      return titleMatch || excerptMatch || tagsMatch;
    });
  }, [insights, searchQuery]);

  return (
    <>
      <div className="mb-8">
        <div className="relative max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by title, topic, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF000E]/20 focus:border-[#FF000E] transition-colors text-[#333333] placeholder-gray-400"
          />
        </div>
      </div>

      {filteredInsights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full">
              {insight.cover_image_url && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={insight.cover_image_url}
                    alt={insight.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                {insight.tags && insight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {insight.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-[#333333] rounded uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-lg font-semibold text-black mb-3 line-clamp-2 uppercase tracking-wide">
                  {insight.title}
                </h2>

                {insight.excerpt && (
                  <p className="text-[#333333] text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {insight.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  {insight.author?.photo_url ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={insight.author.photo_url}
                        alt={insight.author.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {insight.author?.name?.charAt(0) || "I"}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-black">
                      {insight.author?.name || "IILIKA GROUPS"}
                    </p>
                    <p className="text-xs text-[#333333]">
                      {formatDate(insight.created_at)}
                    </p>
                  </div>
                </div>

                <Link href={`/insights/${insight.slug}`} className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Read More
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : searchQuery.trim() ? (
        <div className="py-16">
          <p className="text-xl text-[#333333] mb-4">
            No insights match &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-[#333333]">Try a different search term.</p>
        </div>
      ) : (
        <div className="py-16">
          <p className="text-xl text-[#333333] mb-4">No insights published yet.</p>
          <p className="text-[#333333]">
            Check back soon for expert articles and industry perspectives.
          </p>
        </div>
      )}
    </>
  );
}
