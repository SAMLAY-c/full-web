"use client";

import { useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import TagFilter from "./TagFilter";

interface Post {
  _id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  tags?: string[];
  status?: string;
  source?: string;
  coverImage?: any;
  mainImage?: any;
  coverUrl?: string | null;
  isPinned?: boolean;
  pinOrder?: number;
}

interface BlogListProps {
  posts: Post[];
  allTags: string[];
}

export default function BlogList({ posts, allTags }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter posts by selected tag (posts already filtered by status at service level)
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;

    return posts.filter((post) => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  // Calculate post counts by tag
  const postsCountByTag = useMemo(() => {
    const counts: Record<string, number> = {};

    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return counts;
  }, [posts]);

  return (
    <main className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12">
          <p className="text-xs font-semibold tracking-[0.4em] text-blue-600">
            Blog
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
            Tutorials, experiments, and systems.
          </h1>
        </header>

        {/* Tag Filter */}
        <TagFilter
          allTags={allTags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
          postsCountByTag={postsCountByTag}
        />

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                publishedAt={post.publishedAt}
                tags={post.tags}
                coverUrl={post.coverUrl}
                isPinned={post.isPinned}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500">
            没有找到相关文章
          </div>
        )}
      </div>
    </main>
  );
}
