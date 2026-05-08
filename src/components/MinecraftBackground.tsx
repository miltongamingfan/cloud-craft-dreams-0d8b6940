import { useEffect, useRef } from "react";

/**
 * Animated Minecraft nature background.
 * Layers (back-to-front):
 *  - Day/night sky gradient with sun + moon
 *  - Twinkling stars
 *  - Drifting pixel clouds
 *  - Parallax mountain silhouettes
 *  - Parallax pixel trees
 *  - Floating voxel blocks (3D-ish)
 *  - Grass + dirt ground
 */
export function MinecraftBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!ref.current) return;
      ref.current.style.setProperty("--sy", `${y}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ ["--sy" as never]: "0px" }}
    >
      {/* Sky / day-night */}
      <div className="absolute inset-0 animate-day-night" />

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => {
          const top = (i * 53) % 60;
          const left = (i * 97) % 100;
          const delay = (i % 9) * 0.5;
          const size = (i % 3) + 1;
          return (
            <span
              key={i}
              className="absolute rounded-sm bg-white animate-twinkle"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                opacity: 0.6,
              }}
            />
          );
        })}
      </div>

      {/* Sun glow */}
      <div
        className="absolute rounded-full"
        style={{
          top: "12%",
          right: "10%",
          width: "180px",
          height: "180px",
          background:
            "radial-gradient(circle, oklch(0.85 0.18 80 / 0.55), transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Drifting pixel clouds */}
      <PixelCloud top="14%" duration="120s" scale={1} />
      <PixelCloud top="22%" duration="180s" scale={0.7} delay="-40s" />
      <PixelCloud top="30%" duration="150s" scale={1.3} delay="-80s" />
      <PixelCloud top="9%" duration="200s" scale={0.6} delay="-20s" />

      {/* Mountains (parallax via scroll var) */}
      <svg
        className="absolute bottom-[28%] left-0 w-[140%] opacity-50"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{
          transform: "translate3d(calc(var(--sy) * -0.05), 0, 0)",
          height: "30vh",
        }}
      >
        <polygon
          points="0,220 120,90 220,150 340,40 460,140 600,70 760,160 900,80 1060,150 1200,60 1200,220"
          fill="oklch(0.22 0.08 270)"
        />
      </svg>
      <svg
        className="absolute bottom-[26%] left-0 w-[140%] opacity-70"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{
          transform: "translate3d(calc(var(--sy) * -0.1), 0, 0)",
          height: "26vh",
        }}
      >
        <polygon
          points="0,220 100,140 240,80 380,150 520,90 680,170 820,110 980,180 1140,100 1200,140 1200,220"
          fill="oklch(0.18 0.06 270)"
        />
      </svg>

      {/* Floating voxel blocks */}
      <VoxelBlock style={{ top: "18%", left: "8%" }} face="grass" delay="0s" rot="-8deg" />
      <VoxelBlock style={{ top: "30%", left: "82%" }} face="diamond" delay="-3s" rot="12deg" />
      <VoxelBlock style={{ top: "55%", left: "5%" }} face="stone" delay="-6s" rot="6deg" />
      <VoxelBlock style={{ top: "62%", left: "88%" }} face="grass" delay="-9s" rot="-14deg" />
      <VoxelBlock style={{ top: "42%", left: "45%" }} face="diamond" delay="-2s" rot="20deg" small />

      {/* Pixel trees */}
      <div
        className="absolute bottom-[24%] left-0 right-0 flex justify-between px-[3%]"
        style={{ transform: "translate3d(calc(var(--sy) * -0.2), 0, 0)" }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <PixelTree key={i} variant={i % 2} />
        ))}
      </div>

      {/* Ground: grass + dirt */}
      <div className="absolute bottom-0 left-0 right-0 h-[24%]">
        <div
          className="absolute inset-x-0 top-0 h-[18%]"
          style={{
            background:
              "repeating-linear-gradient(90deg, oklch(0.66 0.18 142) 0 24px, oklch(0.6 0.18 142) 24px 48px)",
            boxShadow: "0 -2px 0 oklch(0.5 0.16 142) inset",
          }}
        />
        <div
          className="absolute inset-x-0 top-[18%] bottom-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, oklch(0.42 0.08 50) 0 24px, oklch(0.36 0.08 50) 24px 48px), repeating-linear-gradient(0deg, oklch(0.42 0.08 50) 0 24px, oklch(0.34 0.08 50) 24px 48px)",
            backgroundBlendMode: "multiply",
          }}
        />
      </div>

      {/* Vignette to keep content readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, oklch(0.10 0.05 270 / 0.85) 100%)",
        }}
      />
    </div>
  );
}

function PixelCloud({
  top,
  duration,
  scale = 1,
  delay = "0s",
}: {
  top: string;
  duration: string;
  scale?: number;
  delay?: string;
}) {
  return (
    <div
      className="absolute animate-drift-cloud"
      style={{
        top,
        left: 0,
        animationDuration: duration,
        animationDelay: delay,
        transform: `scale(${scale})`,
      }}
    >
      <div className="relative w-[120px] h-[40px]">
        {[
          [0, 16, 24],
          [16, 0, 32],
          [40, 8, 40],
          [72, 0, 28],
          [88, 16, 32],
        ].map(([x, y, w], i) => (
          <span
            key={i}
            className="absolute bg-white/85 rounded-sm pixelated"
            style={{ left: x, top: y, width: w, height: 24 }}
          />
        ))}
      </div>
    </div>
  );
}

function VoxelBlock({
  style,
  face,
  delay,
  rot,
  small,
}: {
  style: React.CSSProperties;
  face: "grass" | "diamond" | "stone";
  delay: string;
  rot: string;
  small?: boolean;
}) {
  const size = small ? 48 : 72;
  const colors = {
    grass: { top: "oklch(0.66 0.18 142)", left: "oklch(0.42 0.08 50)", right: "oklch(0.34 0.08 50)" },
    diamond: { top: "oklch(0.82 0.16 200)", left: "oklch(0.62 0.16 210)", right: "oklch(0.5 0.14 215)" },
    stone: { top: "oklch(0.62 0.02 270)", left: "oklch(0.45 0.02 270)", right: "oklch(0.36 0.02 270)" },
  }[face];
  return (
    <div
      className="absolute animate-float-block"
      style={{
        ...style,
        animationDelay: delay,
        ["--rot" as never]: rot,
        filter: "drop-shadow(0 20px 30px oklch(0.10 0.05 270 / 0.6))",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateX(25deg) rotateY(${rot})`,
        }}
        className="relative animate-spin-slow"
      >
        <div style={{ position: "absolute", inset: 0, background: colors.top, transform: `translateZ(${size / 2}px)`, boxShadow: "inset 0 0 0 2px oklch(1 0 0 / 0.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: colors.left, transform: `rotateY(-90deg) translateZ(${size / 2}px)` }} />
        <div style={{ position: "absolute", inset: 0, background: colors.right, transform: `rotateX(-90deg) translateZ(${size / 2}px)` }} />
      </div>
    </div>
  );
}

function PixelTree({ variant }: { variant: number }) {
  const leaf = "oklch(0.42 0.14 142)";
  const trunk = "oklch(0.32 0.06 50)";
  const h = variant ? 110 : 90;
  return (
    <div className="relative" style={{ width: 48, height: h }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: 12, height: h * 0.35, background: trunk }} />
      <div className="absolute bottom-[30%] left-0 right-0 mx-auto" style={{ width: 48, height: h * 0.55, background: leaf, boxShadow: `inset 0 -8px 0 oklch(0.32 0.12 142)` }} />
      <div className="absolute" style={{ bottom: `${h * 0.85}px`, left: 8, width: 32, height: 16, background: leaf }} />
    </div>
  );
}
