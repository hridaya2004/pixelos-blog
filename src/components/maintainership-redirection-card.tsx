import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import AnimatedGradient from "./animated-gradient";
import { BlurReveal } from "./blur-reveal";

export const MaintainershipRedirection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const params = {
    color1: "#B566FF",
    color2: isDark ? "#000000" : "#ffffff",
    color3: isDark ? "#000000" : "#ffffff",
    distortion: 5,
    offset: -168,
    proportion: 63,
    rotation: 0,
    scale: 0.75,
    shape: "Checks" as const,
    shapeSize: 28,
    softness: 100,
    speed: 30,
    swirl: 61,
    swirlIterations: 5,
  };

  return (
    <div className="border-fd-border relative flex h-75 items-center justify-center overflow-hidden rounded-3xl border">
      <div className="p-8 text-center text-3xl">
        <AnimatedGradient config={{ preset: "custom", ...params }} />
        <BlurReveal inView speedReveal={2}>
          Do you want to become a part of team?
        </BlurReveal>
        <BlurReveal as="span" className="mr-1.5" inView speedReveal={2} delay={1}>
          Check out
        </BlurReveal>
        <BlurReveal
          inView
          speedReveal={2}
          delay={1.2}
          as="a"
          href="/docs/maintainers"
          className="mr-1.5 font-bold text-blue-500"
        >
          these
        </BlurReveal>
        <BlurReveal as="span" inView speedReveal={2} delay={1.4}>
          before applying.
        </BlurReveal>
      </div>
    </div>
  );
};
