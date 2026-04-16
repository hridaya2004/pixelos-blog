// oxlint-disable radix
// oxlint-disable no-use-before-define
// oxlint-disable typescript/no-non-null-assertion
"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

type PatternShape = "Checks" | "Stripes" | "Edge";

const PatternShapes: Record<PatternShape, number> = {
  Checks: 0,
  Edge: 2,
  Stripes: 1,
};

interface PresetParams {
  color1: string;
  color2: string;
  color3: string;
  rotation: number;
  proportion: number;
  scale: number;
  speed: number;
  distortion: number;
  swirl: number;
  swirlIterations: number;
  softness: number;
  offset: number;
  shape: PatternShape;
  shapeSize: number;
}

const presets: Record<PresetName, PresetParams> = {
  Lava: {
    color1: "#FF9F21",
    color2: "#FF0303",
    color3: "#000000",
    distortion: 7,
    offset: 717,
    proportion: 100,
    rotation: 114,
    scale: 0.52,
    shape: "Edge",
    shapeSize: 12,
    softness: 100,
    speed: 30,
    swirl: 18,
    swirlIterations: 20,
  },
  Mist: {
    color1: "#050505",
    color2: "#FF66B8",
    color3: "#050505",
    distortion: 4,
    offset: -235,
    proportion: 33,
    rotation: 0,
    scale: 0.48,
    shape: "Edge",
    shapeSize: 48,
    softness: 100,
    speed: 39,
    swirl: 65,
    swirlIterations: 5,
  },
  Plasma: {
    color1: "#B566FF",
    color2: "#000000",
    color3: "#000000",
    distortion: 5,
    offset: -168,
    proportion: 63,
    rotation: 0,
    scale: 0.75,
    shape: "Checks",
    shapeSize: 28,
    softness: 100,
    speed: 30,
    swirl: 61,
    swirlIterations: 5,
  },
  Prism: {
    color1: "#050505",
    color2: "#66B3FF",
    color3: "#FFFFFF",
    distortion: 0,
    offset: -299,
    proportion: 1,
    rotation: -50,
    scale: 0.01,
    shape: "Checks",
    shapeSize: 45,
    softness: 47,
    speed: 30,
    swirl: 50,
    swirlIterations: 16,
  },
  Pulse: {
    color1: "#66FF85",
    color2: "#000000",
    color3: "#000000",
    distortion: 54,
    offset: -813,
    proportion: 92,
    rotation: -167,
    scale: 0,
    shape: "Checks",
    shapeSize: 79,
    softness: 28,
    speed: 20,
    swirl: 75,
    swirlIterations: 3,
  },
  Vortex: {
    color1: "#000000",
    color2: "#FFFFFF",
    color3: "#000000",
    distortion: 0,
    offset: -744,
    proportion: 41,
    rotation: 50,
    scale: 0.4,
    shape: "Stripes",
    shapeSize: 80,
    softness: 5,
    speed: 20,
    swirl: 100,
    swirlIterations: 3,
  },
};

type PresetName = "Prism" | "Lava" | "Plasma" | "Pulse" | "Vortex" | "Mist";

interface CustomConfig {
  preset: "custom";
  color1: string;
  color2: string;
  color3: string;
  rotation?: number;
  proportion?: number;
  scale?: number;
  speed?: number;
  distortion?: number;
  swirl?: number;
  swirlIterations?: number;
  softness?: number;
  offset?: number;
  shape?: PatternShape;
  shapeSize?: number;
}

interface PresetConfig {
  preset: PresetName;
  speed?: number;
}

type GradientConfig = CustomConfig | PresetConfig;

interface NoiseConfig {
  opacity: number;
  scale?: number;
}

interface AnimatedGradientProps {
  config?: GradientConfig;
  noise?: NoiseConfig;
  radius?: string;
  style?: CSSProperties;
  className?: string;
}

export default function AnimatedGradient({
  config = { preset: "Prism" },
  noise,
  radius = "0px",
  style,
  className,
}: AnimatedGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIdRef = useRef<number | undefined>();
  const startTimeRef = useRef<number>(0);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const params = useMemo((): PresetParams => {
    if (config.preset === "custom") {
      return {
        color1: config.color1,
        color2: config.color2,
        color3: config.color3,
        distortion: config.distortion ?? 12,
        offset: config.offset ?? 0,
        proportion: config.proportion ?? 35,
        rotation: config.rotation ?? 0,
        scale: config.scale ?? 1,
        shape: config.shape ?? "Checks",
        shapeSize: config.shapeSize ?? 10,
        softness: config.softness ?? 100,
        speed: config.speed ?? 25,
        swirl: config.swirl ?? 80,
        swirlIterations: config.swirlIterations ?? 10,
      };
    }
    const preset = presets[config.preset] || presets.Prism;
    return {
      ...preset,
      speed: config.speed ?? preset.speed,
    };
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isMounted) {
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });
    if (!gl) {
      return;
    }

    const vertexShaderSource = `#version 300 es
    in vec4 a_position;
    void main() {
      gl_Position = a_position;
    }`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      u_color1: gl.getUniformLocation(program, "u_color1"),
      u_color2: gl.getUniformLocation(program, "u_color2"),
      u_color3: gl.getUniformLocation(program, "u_color3"),
      u_distortion: gl.getUniformLocation(program, "u_distortion"),
      u_pixelRatio: gl.getUniformLocation(program, "u_pixelRatio"),
      u_proportion: gl.getUniformLocation(program, "u_proportion"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_rotation: gl.getUniformLocation(program, "u_rotation"),
      u_scale: gl.getUniformLocation(program, "u_scale"),
      u_shape: gl.getUniformLocation(program, "u_shape"),
      u_shapeScale: gl.getUniformLocation(program, "u_shapeScale"),
      u_softness: gl.getUniformLocation(program, "u_softness"),
      u_swirl: gl.getUniformLocation(program, "u_swirl"),
      u_swirlIterations: gl.getUniformLocation(program, "u_swirlIterations"),
      u_time: gl.getUniformLocation(program, "u_time"),
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    startTimeRef.current = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTimeRef.current) / 1000;
      const speed = (params.speed / 100) * 5;

      gl.uniform1f(uniforms.u_time, elapsed * speed + params.offset * 0.01);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_pixelRatio, window.devicePixelRatio || 1);
      gl.uniform1f(uniforms.u_scale, params.scale);
      gl.uniform1f(uniforms.u_rotation, (params.rotation * Math.PI) / 180);

      const c1 = hexToRgba(params.color1);
      const c2 = hexToRgba(params.color2);
      const c3 = hexToRgba(params.color3);
      gl.uniform4f(uniforms.u_color1, c1[0], c1[1], c1[2], c1[3]);
      gl.uniform4f(uniforms.u_color2, c2[0], c2[1], c2[2], c2[3]);
      gl.uniform4f(uniforms.u_color3, c3[0], c3[1], c3[2], c3[3]);

      gl.uniform1f(uniforms.u_proportion, params.proportion / 100);
      gl.uniform1f(uniforms.u_softness, params.softness / 100);
      gl.uniform1f(uniforms.u_shape, PatternShapes[params.shape]);
      gl.uniform1f(uniforms.u_shapeScale, params.shapeSize / 100);
      gl.uniform1f(uniforms.u_distortion, params.distortion / 50);
      gl.uniform1f(uniforms.u_swirl, params.swirl / 100);
      gl.uniform1f(uniforms.u_swirlIterations, params.swirl === 0 ? 0 : params.swirlIterations);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameIdRef.current !== undefined) {
        cancelAnimationFrame(frameIdRef.current);
      }
      resizeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [isMounted, params]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        borderRadius: radius,
        inset: 0,
        overflow: "hidden",
        position: "absolute",
        zIndex: -1,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          height: "100%",
          width: "100%",
        }}
      />
      {noise && noise.opacity > 0 && (
        <div
          style={{
            backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMCCgkGBAVJOAVJAAAASklEQVQ4y2NgGAWjYBSMglEwCgY/YGRgZBQUYmJiZGQEkYwMjIyMgoKCjIyMIJKBgRFIMjIyAklGRkYGRkFBYEcwMDIyMjAOUQAA1I4HwVwZAkYAAAAASUVORK5CYII=")`,
            backgroundRepeat: "repeat",
            backgroundSize: (noise.scale ?? 1) * 200,
            inset: 0,
            opacity: noise.opacity / 2,
            pointerEvents: "none",
            position: "absolute",
          }}
        />
      )}
    </div>
  );
}

const hexToRgba = (hex: string): [number, number, number, number] => {
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 1;

  if (hex.startsWith("rgba(")) {
    const parts = hex.slice(5, -1).split(",");
    r = Number.parseInt(parts[0]) / 255;
    g = Number.parseInt(parts[1]) / 255;
    b = Number.parseInt(parts[2]) / 255;
    a = Number.parseFloat(parts[3]);
  } else if (hex.startsWith("rgb(")) {
    const parts = hex.slice(4, -1).split(",");
    r = Number.parseInt(parts[0]) / 255;
    g = Number.parseInt(parts[1]) / 255;
    b = Number.parseInt(parts[2]) / 255;
  } else if (hex.startsWith("hsla(") || hex.startsWith("hsl(")) {
    const isHsla = hex.startsWith("hsla(");
    const parts = hex.slice(isHsla ? 5 : 4, -1).split(",");
    const h = Number.parseFloat(parts[0]) / 360;
    const s = Number.parseFloat(parts[1]) / 100;
    const l = Number.parseFloat(parts[2]) / 100;
    a = isHsla ? Number.parseFloat(parts[3]) : 1;
    [r, g, b] = hslToRgb(h, s, l);
  } else if (hex.startsWith("#")) {
    const c = hex.slice(1);
    if (c.length === 3) {
      r = Number.parseInt(c[0] + c[0], 16) / 255;
      g = Number.parseInt(c[1] + c[1], 16) / 255;
      b = Number.parseInt(c[2] + c[2], 16) / 255;
    } else if (c.length >= 6) {
      r = Number.parseInt(c.slice(0, 2), 16) / 255;
      g = Number.parseInt(c.slice(2, 4), 16) / 255;
      b = Number.parseInt(c.slice(4, 6), 16) / 255;
      if (c.length === 8) {
        a = Number.parseInt(c.slice(6, 8), 16) / 255;
      }
    }
  }

  return [r, g, b, a];
};

const hue2rgb = (p: number, q: number, t: number) => {
  if (t < 0) {
    // oxlint-disable-next-line no-param-reassign
    t += 1;
  }
  if (t > 1) {
    // oxlint-disable-next-line no-param-reassign
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    // oxlint-disable-next-line no-multi-assign
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r, g, b];
};

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float t = .5 * u_time;

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);

    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;
