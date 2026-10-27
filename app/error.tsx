"use client";
import { site } from "@/content/site";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main-content" className="container error-page">
      <h1>{site.error.title}</h1>
      <p>{site.error.description}</p>
      <button className="button button-paper" onClick={reset}>
        {site.error.action}
      </button>
    </main>
  );
}
