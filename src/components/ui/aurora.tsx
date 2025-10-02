"use client";

import type { PropsWithChildren, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AuroraBackgroundProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    intensity?: "subtle" | "bold";
  }
>;

export function AuroraBackground({
  className,
  children,
  intensity = "bold",
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        intensity === "bold" ? "bg-aurora" : "bg-aurora-subtle",
        className
      )}
      {...props}
    >
      {/* Texture overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:radial-gradient(100%_100%_at_50%_0%,#fff_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 noise-mask" />
      {children}
    </div>
  );
}

export function ShineBorder({
  className,
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn("shine-border rounded-2xl relative", className)} {...props}>
      <div className="relative z-10 rounded-[1rem] bg-card/80 backdrop-blur-xl ring-1 ring-white/10 dark:ring-white/5">
        {children}
      </div>
    </div>
  );
}

export default AuroraBackground;


