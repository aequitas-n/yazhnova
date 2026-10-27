import type { Metadata } from "next";
import { Playground } from "@/components/playground/playground";
export const metadata: Metadata = {
  title: "Component studies | Yazhnova",
  robots: { index: false, follow: false },
};
export default function PlaygroundPage() {
  return <Playground />;
}
