"use client";

import { useEffect, useRef, useState } from "react";

export default function HtmlPostFrame({ html }: { html: string }) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const updateHeight = () => {
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      const nextHeight = Math.max(600, doc.body.scrollHeight);
      setHeight(nextHeight);
    };

    const handleLoad = () => {
      updateHeight();
      setTimeout(updateHeight, 200);
      setTimeout(updateHeight, 800);
    };

    frame.addEventListener("load", handleLoad);
    return () => frame.removeEventListener("load", handleLoad);
  }, [html]);

  return (
    <div className="w-full flex justify-center">
      <iframe
        ref={frameRef}
        title="html-post"
        srcDoc={html}
        className="w-full border-0"
        style={{ height, width: "min(1400px, 96vw)" }}
      />
    </div>
  );
}
