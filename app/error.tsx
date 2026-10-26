"use client";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="error-page container">
      <h1>{site.error.title}</h1>
      <p>{site.error.description}</p>
      <Button onClick={reset}>{site.error.action}</Button>
    </main>
  );
}
