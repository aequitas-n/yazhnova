import { notFound } from "next/navigation";
import Renderer from "@/components/visuals/renderers";
import { visualPresets, type VisualKind } from "@/lib/visual-presets";
export const metadata = { robots: { index: false, follow: false } };
export default async function VisualPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
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
      <Renderer kind={kind as VisualKind} />
    </main>
  );
}
