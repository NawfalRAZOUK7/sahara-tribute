"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";

type Layer = {
  src: StaticImageData | string;
  depth: number; // 0=static, higher = stronger parallax
  priority?: boolean;
  alt?: string;
};

type Props = {
  id?: string;
  title: string;
  subtitle?: string;
  cta: { href: string; label: string };
  layers: Layer[]; // back → front
  align?: "center" | "left" | "right";
};

export default function ParallaxHero({
  id = "un",
  title,
  subtitle,
  cta,
  layers,
  align = "center",
}: Readonly<Props>) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Call hooks unconditionally at top-level. We derive a base motion value and
  // then use CSS variables to apply per-layer depth multipliers without calling
  // hooks inside a loop (keeps hook rules satisfied).
  const contentYTransform = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const baseLayerTransform: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -40]
  );

  // Refs for each layer DOM node so we can update transforms directly from
  // the base motion value. This avoids calling hooks inside loops and keeps
  // the hook order stable while still producing per-layer depth multipliers.
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // If the user prefers reduced motion, clear any transforms and don't
    // subscribe to motion updates.
    if (prefersReduced) {
      for (const node of layerRefs.current) {
        if (node) node.style.transform = "";
      }
      return;
    }

    // Use the supported MotionValue API: onChange returns an unsubscribe.
    const unsubscribe = (baseLayerTransform as MotionValue<number>).onChange(
      (v) => {
        for (const [i, node] of layerRefs.current.entries()) {
          const depth = layers[i]?.depth ?? 1;
          if (node) node.style.transform = `translateY(${v * depth}px)`;
        }
      }
    );

    return unsubscribe;
  }, [baseLayerTransform, layers, prefersReduced]);

  let alignClass = "items-center text-center";
  if (align === "left") alignClass = "items-start text-left";
  else if (align === "right") alignClass = "items-end text-right";

  return (
    <section
      id={id}
      ref={ref}
      aria-label={typeof title === "string" ? title : "Hero"}
      className="relative h-[92svh] w-full overflow-clip"
    >
      {/* Background layers */}
      {layers.map((l, i) => {
        const key = `${i}-${l.alt ?? ""}-${l.depth}`;
        return (
          <motion.div
            key={key}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            style={{ willChange: "transform", zIndex: i }}
            className="absolute inset-0"
            aria-hidden={!l.alt}
          >
            <Image
              src={l.src}
              alt={l.alt ?? ""}
              fill
              priority={l.priority}
              sizes="100vw"
              className="object-cover opacity-90 mix-blend-multiply"
            />
          </motion.div>
        );
      })}

      {/* Moroccan red → green film */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-morocco-red/40 via-transparent to-morocco-green/35" />

      {/* Content */}
      <motion.div
        style={{ y: prefersReduced ? 0 : contentYTransform }}
        className={`h-full grid place-items-center px-6`}
      >
        <div
          className={`max-w-3xl ${alignClass} text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.35)]`}
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-base md:text-lg opacity-95">{subtitle}</p>
          )}
          <div className="mt-6">
            <Link
              href={cta.href}
              className="inline-block rounded-2xl bg-white/90 px-6 py-3 text-sm md:text-base font-semibold text-morocco-red hover:bg-white"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-xs">
        <a href="#map" className="hover:text-white">
          ↓ تابع التمرير
        </a>
      </div>
    </section>
  );
}
