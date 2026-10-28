"use client";
import { useState, useLayoutEffect, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check } from "lucide-react";
import { site } from "@/content/site";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { ContactFormView, type ContactUpgradeProps } from "./contact-form-view";
export function ContactForm({ initialValues, focus, autoSubmit }: ContactUpgradeProps) {
  const params = useSearchParams();
  const service = params.get("service") || "";
  const engagement = params.get("engagement") || "";
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: "",
      service: site.contact.services.includes(service) ? service : "",
      message: site.engage.models.some((m) => m.name === engagement) ? `${engagement}\n\n` : "",
      website: "",
      ...initialValues,
    },
  });
  const submit = async (data: ContactValues) => {
    setServerError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setServerError(result.error || site.contact.error);
        return;
      }
      reset({
        name: "",
        email: "",
        company: "",
        budget: "",
        website: "",
        service: site.contact.services.includes(service) ? service : "",
        message: site.engage.models.some((model) => model.name === engagement)
          ? `${engagement}\n\n`
          : "",
      });
      setSuccess(true);
    } catch {
      setServerError(site.contact.error);
    }
  };
  useLayoutEffect(() => {
    if (!focus) return;
    const element = document.getElementById(focus.id) as HTMLInputElement | null;
    element?.focus({ preventScroll: true });
    try {
      element?.setSelectionRange(focus.start, focus.end);
    } catch {}
  }, [focus]);
  useEffect(() => {
    if (autoSubmit) void handleSubmit(submit)();
  }, []);
  const field = (name: keyof ContactValues) => ({
    id: name,
    ...register(name),
    className: "form-input",
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    disabled: isSubmitting,
  });
  const error = (name: keyof ContactValues) =>
    errors[name] && (
      <p className="field-error" id={`${name}-error`}>
        {errors[name]?.message}
      </p>
    );
  if (success)
    return (
      <div className="form-success" role="status">
        <span>
          <Check size={25} />
        </span>
        <h2>{site.contact.successTitle}</h2>
        <p>{site.contact.successMessage}</p>
        <Button variant="paper" onClick={() => setSuccess(false)}>
          {site.contact.another}
          <ArrowUpRight size={16} />
        </Button>
      </div>
    );
  return (
    <ContactFormView
      field={field}
      error={error}
      isSubmitting={isSubmitting}
      serverError={serverError}
      onSubmit={handleSubmit(submit)}
    />
  );
}
