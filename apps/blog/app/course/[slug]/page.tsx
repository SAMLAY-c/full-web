import CourseContent from "./CourseContent";

// 静态生成参数 - 为 Netlify 部署生成静态页面
export function generateStaticParams() {
  return [
    { slug: 'remotion-basics' },
    { slug: 'video-automation' },
    { slug: 'template-engineering' },
  ];
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  return <CourseContent slug={params.slug} />;
}
