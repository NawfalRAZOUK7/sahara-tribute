import ParallaxHero from "@/components/ParallaxHero";

export default function Page() {
  return (
    <main>
      <ParallaxHero
        id="un"
        title="The UN supports Morocco’s Autonomy Plan"
        subtitle="قرار مجلس الأمن • 2025 — محطة دبلوماسية راسخة"
        cta={{ href: "/un-resolution", label: "اقرأ تفاصيل القرار" }}
        layers={[
          {
            src: "/images/dunes.webp",
            depth: 0.6,
            priority: true,
            alt: "Sahara dunes",
          },
          {
            src: "/images/flag-morocco.webp",
            depth: 1,
            alt: "Moroccan flag overlay",
          },
          { src: "/images/flag-un.webp", depth: 1.4, alt: "UN flag overlay" },
        ]}
      />

      {/* Anchor target for the scroll cue; Day 3 will replace this with the Map section */}
      <section id="map" className="container-narrow py-20">
        <h2 className="text-2xl font-bold text-morocco-green">
          سلسلة الأقسام القادمة
        </h2>
        <p className="mt-2 text-neutral-700">
          سيتم إضافة الخريطة والثقافة في اليوم 3.
        </p>
      </section>
    </main>
  );
}
