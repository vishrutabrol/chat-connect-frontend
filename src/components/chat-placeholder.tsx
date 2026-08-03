"use client";

import { MessageCircle } from "lucide-react";

export function ChatPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="relative">
        <div className="absolute inset-0 scale-125 rounded-full bg-purple-500/10 blur-2xl" />
        <div className="relative flex size-20 items-center justify-center rounded-full border border-border bg-muted/40 shadow-inner">
          <MessageCircle className="size-9 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-foreground">
          No messages yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Start the conversation.
        </p>
      </div>
    </div>
  );
}
