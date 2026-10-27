import { notFound } from "next/navigation";
import { serviceStories } from "@/content/site";
import { ServiceStory } from "@/components/services/service-story";
import type { StoryId } from "@/lib/service-story-canvas";
export const metadata = { robots: { index: false, follow: false } };
export default async function StoryExport({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ time?: string }>;
}) {
  const { id } = await params;
  const { time } = await searchParams;
  if (!(id in serviceStories.steps)) notFound();
  return (
    <main style={{ width: "100vw", height: "100vh", background: "#0A0A0A" }}>
      <ServiceStory
        id={id as StoryId}
        forceLive
        sampleTime={Math.min(5600, Math.max(0, Number(time ?? 5600)))}
      />
    </main>
  );
}
