import { notFound } from "next/navigation";
import Renderer from "@/components/visuals/renderers";
import { visualPresets, type VisualKind } from "@/lib/visual-presets";
export const metadata = { robots: { index: false, follow: false } };
export default async function VisualPage({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ composition?: string }>;
}) {
  const { kind } = await params;
  const { composition } = await searchParams;
  if (!(kind in visualPresets)) notFound();
  return (
    <main
      className="visual-export"
      style={{
        width: "100vw",
        height: "100vh",
        background:
          kind === "ember" || kind === "manifesto" || kind === "hero-dither"
            ? "#F4F2EC"
            : "#0A0A0A",
      }}
    >
      <Renderer
        kind={kind as VisualKind}
        overrides={
          kind === "hero-dither" && composition === "original"
            ? { panoramicHands: false, verticalBleed: 0 }
            : undefined
        }
      />
    </main>
  );
}
