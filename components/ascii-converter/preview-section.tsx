"use client"

import { useAsciiConverterStore } from "@/lib/store/ascii-converter-store"

export default function PreviewSection() {
  const { frames, currentFrame, fontSize, invert } = useAsciiConverterStore()

  return (
    <div className="p-4 bg-zinc-900">
      <div className="overflow-auto bg-black p-0 min-h-[400px] max-h-[70vh] flex items-center justify-center">
        {frames.length > 0 ? (
          <pre
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 1,
              whiteSpace: "pre",
              fontFamily: "monospace",
              color: invert ? "#000" : "#fff",
              backgroundColor: invert ? "#fff" : "transparent",
              padding: "8px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {frames[currentFrame]}
          </pre>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-zinc-500">
            <div className="text-center mb-2 font-bold">SYSTEM_WAITING_FOR_INPUT</div>
            <div className="text-xs border border-zinc-800 p-2">UPLOAD A GIF FILE TO CONTINUE</div>
          </div>
        )}
      </div>
    </div>
  )
}

