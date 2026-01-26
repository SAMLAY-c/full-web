type VideoPlayerProps = {
  src: string;
};

export function VideoPlayer({ src }: VideoPlayerProps) {
  return (
    <video className="h-full w-full" controls src={src} />
  );
}
