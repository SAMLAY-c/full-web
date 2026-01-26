import { notFound } from "next/navigation";
import { ArticlePostTemplate } from "../../../components/templates/ArticlePostTemplate";
import { VideoPostTemplate } from "../../../components/templates/VideoPostTemplate";
import { getPost, getPostSlugs } from "../../../lib/posts";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);

  if (!post) {
    notFound();
  }

  if (post.type === "video") {
    return (
      <VideoPostTemplate
        slug={params.slug}
        title={post.title}
        videoUrl={post.videoUrl}
        transcript={post.transcript}
        pdfUrl={post.pdfUrl}
      />
    );
  }

  if (post.type === "article") {
    return (
      <ArticlePostTemplate
        slug={params.slug}
        title={post.title}
        date={post.date}
        content={post.content}
      />
    );
  }

  return null;
}

export function generateStaticParams() {
  return getPostSlugs();
}
