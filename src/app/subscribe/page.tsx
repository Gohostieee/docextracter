import { PricingTable } from '@clerk/nextjs';
import { Navbar } from "@/components/Navbar";
import { Warp } from '@paper-design/shaders-react';

export default function SubscribePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0e0d0b]">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <Warp
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          colors={["#0e0d0b", "#b08968", "#0e0d0b", "#7f8c5a"]}
          proportion={0.45}
          softness={1.2}
          distortion={0.3}
          swirl={0.9}
          swirlIterations={12}
          shape="checks"
          shapeScale={0.08}
          speed={0.8}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="fixed inset-0 z-[1] bg-[#0e0d0b]/90 pointer-events-none" />
      <div className="fixed inset-0 z-[1] noise-mask opacity-30 pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Content - Centered with max width */}
      <div className="relative z-10 min-h-screen pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Heading */}
          <div className="mx-auto max-w-3xl text-center mb-10">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs bg-white/5 border border-white/10 text-muted-foreground mb-4">
              Member Plans
            </div>
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-card bg-black/20 border border-white/10 shadow-lg p-4 rounded-2xl">
              Choose the plan that fits
              <span className="text-accent"> your workflow</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              AI made all of this dumb filler text, there is only one plan, you have no options, party like its 1984. 👁️
            </p>
          </div>

          {/* Pricing container with subtle frame */}
          <div className="relative">
            <div className=" rounded-2xl">
              <div className="rounded-2xl bg-black border border-white/20 shadow-lg">
                <div className="p-3 md:p-6 relative z-10">
                  <PricingTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

