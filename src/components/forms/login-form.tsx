"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginFormData } from "@/lib/validators";
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { username: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    const result = await login(data.username.toLowerCase());

    if (!result.success) {
      setError(result.error ?? "Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 size-80 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 size-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-white/10 bg-white/5 shadow-2xl shadow-purple-500/5 backdrop-blur-xl">
          <CardContent className="p-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8 flex flex-col items-center"
            >
              <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 shadow-lg shadow-purple-500/25">
                <MessageCircle className="size-8 text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
                Chat Connect
              </h1>
              <p className="max-w-xs text-center text-sm text-muted-foreground">
                Anonymous conversations. No registration. No email. Just
                choose a name and start chatting.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    {...register("username")}
                    placeholder="Choose a unique username"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="h-12 border-white/10 bg-white/5 text-base placeholder:text-muted-foreground/50 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20"
                    aria-invalid={!!errors.username}
                    aria-describedby={
                      errors.username ? "username-error" : undefined
                    }
                  />
                </div>
                <AnimatePresence>
                  {errors.username && (
                    <motion.p
                      id="username-error"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-destructive"
                      role="alert"
                    >
                      {errors.username.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
                    role="alert"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="group h-12 w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-base font-semibold shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:via-blue-500 hover:to-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" className="text-white" />
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="flex items-center justify-center gap-1.5 pt-2 text-center text-xs text-muted-foreground/60">
                <Sparkles className="size-3" />
                No account needed — just pick a name
              </p>
            </motion.form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
