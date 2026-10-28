"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { ContactFormView, type ContactUpgradeProps } from "./contact-form-view";
import type { ContactValues } from "@/lib/contact-schema";
import { scheduleVisualStart } from "@/lib/visual-runtime";
import { site } from "@/content/site";

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const pending = useRef(false);
  const submitting = useRef(false);
  const [upgrade, setUpgrade] = useState<
    ({ Source: ComponentType<ContactUpgradeProps> } & ContactUpgradeProps) | null
  >(null);
  // Keep the complete form in server HTML; reading search params in render
  // would replace it with the Suspense skeleton until hydration.
  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get("service") || "";
    const engagement = params.get("engagement") || "";
    const select = form.current?.elements.namedItem("service") as HTMLSelectElement | null;
    const message = form.current?.elements.namedItem("message") as HTMLTextAreaElement | null;
    if (select && site.contact.services.includes(service)) select.value = service;
    if (message && site.engage.models.some((model) => model.name === engagement))
      message.value = `${engagement}\n\n`;
  }, []);
  const load = useCallback(() => {
    if (pending.current) return;
    pending.current = true;
    void import("./validated-contact-form")
      .then(({ ContactForm: Source }) => {
        if (!form.current) return;
        const active = document.activeElement as HTMLInputElement | null;
        setUpgrade({
          Source,
          initialValues: Object.fromEntries(new FormData(form.current)) as Partial<ContactValues>,
          focus:
            active && form.current.contains(active)
              ? { id: active.id, start: active.selectionStart, end: active.selectionEnd }
              : undefined,
          autoSubmit: submitting.current,
        });
      })
      .catch(() => {
        pending.current = false;
      });
  }, []);
  useEffect(() => {
    let cancel: (() => void) | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cancel = scheduleVisualStart(load);
        observer.disconnect();
      }
    });
    if (host.current) observer.observe(host.current);
    return () => {
      observer.disconnect();
      cancel?.();
    };
  }, [load]);
  return (
    <div ref={host} onFocusCapture={load} data-validation={upgrade ? "ready" : "pending"}>
      {upgrade ? (
        <upgrade.Source
          initialValues={upgrade.initialValues}
          focus={upgrade.focus}
          autoSubmit={upgrade.autoSubmit}
        />
      ) : (
        <ContactFormView
          formRef={form}
          field={(name) => ({
            id: name,
            name,
            className: "form-input",
            disabled: false,
            defaultValue: "",
          })}
          error={() => null}
          isSubmitting={false}
          serverError=""
          onSubmit={(event) => {
            event.preventDefault();
            submitting.current = true;
            load();
          }}
        />
      )}
    </div>
  );
}
