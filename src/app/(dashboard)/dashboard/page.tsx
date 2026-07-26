"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MessageCircle,
  Plus,
  Globe,
  Users,
  Zap,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Chat",
    description: "Start conversations instantly with zero setup.",
  },
  {
    icon: Shield,
    title: "Anonymous",
    description: "No personal data required. Just a username.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join public rooms or create your own.",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex h-full flex-1 flex-col overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border bg-card/30 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Welcome back, <span className="text-purple-400">{user?.username}</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Ready to chat? Choose what you&apos;d like to do.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl space-y-8"
        >
          {/* Hero */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto mb-6 flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-indigo-500/20 ring-1 ring-purple-500/10"
            >
              <MessageCircle className="size-10 text-purple-400" />
            </motion.div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Welcome to Chat Connect
            </h2>
            <p className="text-muted-foreground">
              Create a room or join one to begin chatting anonymously.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 shadow-lg shadow-purple-500/20 hover:from-purple-500 hover:to-blue-500 sm:w-auto"
            >
              <Plus className="mr-2 size-4" />
              Create Room
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white/10 bg-white/5 hover:bg-white/10 sm:w-auto"
            >
              <Globe className="mr-2 size-4" />
              Browse Rooms
            </Button>
          </div>

          <Separator className="bg-white/5" />

          {/* Feature cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Card className="border-white/5 bg-white/[0.02] transition-colors hover:bg-white/[0.04]">
                  <CardContent className="flex flex-col items-center gap-3 p-5 text-center">
                    <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-2.5">
                      <feature.icon className="size-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
