import { DiscussionArea } from "../../../components/business/DiscussionArea";
import { ResourceSidebar } from "../../../components/business/Sidebar";
import { VideoPlayer } from "../../../components/business/VideoPlayer";

type TranscriptItem = {
  time: string;
  text: string;
};

type CourseData = {
  title: string;
  videoUrl: string;
  transcript: TranscriptItem[];
  pdfUrl: string;
};

async function getCourseData(slug: string): Promise<CourseData> {
  return {
    title: "Remotion 实战：从零生成第一个视频",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    transcript: [
      { time: "00:00", text: "大家好，欢迎来到这节 Remotion 实战课。" },
      { time: "00:15", text: "今天我们要讲的是环境配置..." },
      { time: "01:20", text: "核心概念是：视频即代码。" }
    ],
    pdfUrl: "/downloads/course-notes.pdf"
  };
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const data = await getCourseData(params.slug);

  return (
    <div className="min-h-screen bg-brand-50 pb-20">
      <nav className="border-b border-brand-100 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-brand-900">{data.title}</h1>
      </nav>

      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="grid h-[85vh] grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex h-full items-center justify-center overflow-hidden rounded-xl bg-black shadow-lg">
              <VideoPlayer src={data.videoUrl} />
            </div>
          </div>
          <div className="lg:col-span-4">
            <ResourceSidebar transcript={data.transcript} pdfUrl={data.pdfUrl} />
          </div>
        </div>

        <div className="mt-12 max-w-4xl rounded-xl bg-white p-6 shadow-sm">
          <DiscussionArea topicId={`course-${params.slug}`} />
        </div>
      </main>
    </div>
  );
}
