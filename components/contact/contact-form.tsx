"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, LockKeyhole } from "lucide-react";
import { site } from "@/content/site";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
export function ContactForm() {
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
      reset();
      setSuccess(true);
    } catch {
      setServerError(site.contact.error);
    }
  };
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
  const required = (
    <span className="required-marker" aria-hidden="true">
      *
    </span>
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
    <>
      <h2>{site.contact.formTitle}</h2>
      <p className="form-note">{site.contact.formNote}</p>
      <form onSubmit={handleSubmit(submit)} noValidate aria-label={site.contact.formTitle}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">
              {site.contact.fields.name}
              {required}
            </label>
            <input
              {...field("name")}
              autoComplete="name"
              required
              placeholder={site.contact.placeholders.name}
              maxLength={80}
            />
            {error("name")}
          </div>
          <div className="form-field">
            <label htmlFor="email">
              {site.contact.fields.email}
              {required}
            </label>
            <input
              {...field("email")}
              type="email"
              autoComplete="email"
              required
              placeholder={site.contact.placeholders.email}
              maxLength={254}
            />
            {error("email")}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="company">
            {site.contact.fields.company}
            <span className="optional">({site.contact.fields.optional})</span>
          </label>
          <input
            {...field("company")}
            autoComplete="organization"
            placeholder={site.contact.placeholders.company}
            maxLength={120}
          />
          {error("company")}
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="budget">
              {site.contact.fields.budget}
              {required}
            </label>
            <select {...field("budget")} required defaultValue="">
              <option value="" disabled>
                {site.contact.placeholders.budget}
              </option>
              {site.contact.budgets.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            {error("budget")}
          </div>
          <div className="form-field">
            <label htmlFor="service">
              {site.contact.fields.service}
              {required}
            </label>
            <select {...field("service")} required>
              <option value="" disabled>
                {site.contact.placeholders.service}
              </option>
              {site.contact.services.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            {error("service")}
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">
            {site.contact.fields.message}
            {required}
          </label>
          <textarea
            {...field("message")}
            required
            rows={5}
            maxLength={5000}
            placeholder={site.contact.placeholders.message}
          />
          {error("message")}
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="website">{site.contact.fields.website}</label>
          <input id="website" {...register("website")} autoComplete="off" tabIndex={-1} />
        </div>
        <Button variant="paper" type="submit" disabled={isSubmitting} className="form-submit">
          {isSubmitting ? site.contact.submitting : site.contact.submit}
          <ArrowUpRight size={17} />
        </Button>
        <p className="form-privacy">
          <LockKeyhole size={11} />
          {site.contact.privacy}
        </p>
        {serverError && (
          <div className="form-alert" role="alert">
            <strong>{site.contact.errorTitle}</strong>
            <p>{serverError}</p>
          </div>
        )}
      </form>
    </>
  );
}
