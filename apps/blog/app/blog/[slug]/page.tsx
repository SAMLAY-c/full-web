import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { sanityClient } from "../../../lib/sanity.client";
import { urlFor } from "../../../lib/sanity.image";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!sanityClient) {
    notFound();
  }

  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    postType,
    videoUrl,
    coverImage,
    publishedAt,
    body,
    content
  }`;

  const post = await sanityClient.fetch(query, { slug });

  if (!post) {
    notFound();
  }

  const postBody = post.body || post.content || [];
  const coverUrl = urlFor(post.coverImage)?.width(1200).height(675).url();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
          {post.title}
        </h1>
        {coverUrl ? (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl shadow-lg">
            <img alt={post.title} className="h-full w-full object-cover" src={coverUrl} />
          </div>
        ) : null}
      </header>

      <div className="prose prose-lg mx-auto text-gray-700 md:prose-xl">
        {post.postType === "video" && post.videoUrl ? (
          <div className="mb-10">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-md">
              <iframe
                allowFullScreen
                className="h-full w-full"
                src={post.videoUrl.replace("watch?v=", "embed/")}
                title="Video player"
              />
            </div>
            <p className="mt-4 rounded bg-gray-50 p-2 text-center text-sm text-gray-500">
              💡 提示：这是一个视频教程，请点击上方播放
            </p>
          </div>
        ) : null}

        {post.postType === "article" ? <PortableText value={postBody} /> : null}
      </div>
    </article>
  );
}
