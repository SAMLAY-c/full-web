import { DiscussionArea } from "../business/DiscussionArea";
import { ResourceSidebar } from "../business/Sidebar";
import { VideoPlayer } from "../business/VideoPlayer";

type TranscriptItem = {
  time: string;
  text: string;
};

type VideoPostTemplateProps = {
  title: string;
  videoUrl: string;
  transcript: TranscriptItem[];
  pdfUrl?: string;
  slug: string;
};

export function VideoPostTemplate({
  title,
  videoUrl,
  transcript,
  pdfUrl,
  slug
}: VideoPostTemplateProps) {
  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      <nav className="border-b border-brand-100 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-brand-900">🎥 课程模式：{title}</h1>
      </nav>

      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="grid h-[85vh] grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex h-full items-center justify-center overflow-hidden rounded-xl bg-black shadow-lg">
              <VideoPlayer src={videoUrl} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <ResourceSidebar transcript={transcript} pdfUrl={pdfUrl ?? ""} />
          </div>
        </div>

        <div className="mt-12 max-w-4xl rounded-xl bg-white p-6 shadow-sm">
          <DiscussionArea topicId={`post-${slug}`} />
        </div>
      </main>
    </div>
  );
}
