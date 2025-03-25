"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface SubmitToCommunityCTAProps {
  onSubmit: () => void
}

export default function SubmitToCommunityCTA({ onSubmit }: SubmitToCommunityCTAProps) {
  return (
    <div className="p-4 bg-zinc-900 border-t border-zinc-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-zinc-400" />
          <h3 className="text-xs text-zinc-400 font-bold">SHARE_WITH_COMMUNITY</h3>
        </div>
        <Button
          onClick={onSubmit}
          className="h-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
        >
          SUBMIT_TO_COMMUNITY
        </Button>
      </div>
    </div>
  )
}

