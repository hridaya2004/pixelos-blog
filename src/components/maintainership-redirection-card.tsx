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
    <div className="border relative flex items-center justify-center border-fd-border overflow-hidden rounded-3xl h-75">
      <div className="py-8 text-3xl text-center">
        <AnimatedGradient config={{ preset: "custom", ...params }} />
        <BlurReveal inView speedReveal={2}>
          Do you want to become a part of team? Check out these before applying.
        </BlurReveal>
      </div>
    </div>
  );
};
