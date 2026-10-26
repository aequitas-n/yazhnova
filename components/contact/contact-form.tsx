"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Check, LoaderCircle, LockKeyhole } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const params = useSearchParams();
  const selectedService = params.get("service") || "";
  const engagement = params.get("engagement");
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
      service: site.contact.services.includes(selectedService) ? selectedService : "",
      message:
        engagement && site.engage.models.some((model) => model.title === engagement)
          ? `${engagement}\n\n`
          : "",
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
      const body = await response.json();
      if (!response.ok) {
        setServerError(body.error || site.contact.errorMessage);
        return;
      }
      reset();
      setSuccess(true);
    } catch {
      setServerError(site.contact.errorMessage);
    }
  };
  const field = (name: keyof ContactValues) => ({
    id: name,
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    disabled: isSubmitting,
    className: "form-input",
    ...register(name),
  });
  const error = (name: keyof ContactValues) =>
    errors[name] && (
      <p id={`${name}-error`} className="field-error">
        {errors[name]?.message}
      </p>
    );
  const required = (
    <span className="required-dot" aria-hidden="true">
      *
    </span>
  );
  if (success)
    return (
      <div className="form-success" role="status">
        <div className="form-success-icon">
          <Check size={28} />
        </div>
        <h2>{site.contact.successTitle}</h2>
        <p>{site.contact.successMessage}</p>
        <Button variant="secondary" onClick={() => setSuccess(false)}>
          {site.contact.another}
          <ArrowUpRight size={16} />
        </Button>
      </div>
    );
  return (
    <>
      <h2>{site.contact.formTitle}</h2>
      <p className="form-description">{site.contact.formDescription}</p>
      <form onSubmit={handleSubmit(submit)} noValidate aria-label={site.contact.formTitle}>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">
              {site.contact.fields.name}
              {required}
            </label>
            <input
              {...field("name")}
              required
              autoComplete="name"
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
              required
              type="email"
              autoComplete="email"
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
                <option value={value} key={value}>
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
                <option value={value} key={value}>
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
            placeholder={site.contact.placeholders.message}
            rows={5}
            maxLength={5000}
          />
          {error("message")}
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="website">{site.contact.fields.website}</label>
          <input id="website" {...register("website")} tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" disabled={isSubmitting} className="glow-border form-submit">
          {isSubmitting ? site.contact.submitting : site.contact.submit}
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" size={16} />
          ) : (
            <ArrowUpRight size={16} />
          )}
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
