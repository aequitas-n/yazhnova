import type { FormEventHandler, ReactNode, Ref } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { ContactValues } from "@/lib/contact-schema";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
export type ContactUpgradeProps = {
  initialValues?: Partial<ContactValues>;
  focus?: { id: string; start: number | null; end: number | null };
  autoSubmit?: boolean;
};
type Binding = Partial<UseFormRegisterReturn> & {
  id: string;
  className: string;
  disabled: boolean;
  defaultValue?: string;
};
export function ContactFormView({
  field,
  error,
  isSubmitting,
  serverError,
  onSubmit,
  formRef,
}: {
  field: (name: keyof ContactValues) => Binding;
  error: (name: keyof ContactValues) => ReactNode;
  isSubmitting: boolean;
  serverError: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  formRef?: Ref<HTMLFormElement>;
}) {
  const required = (
    <span className="required-marker" aria-hidden="true">
      *
    </span>
  );
  return (
    <>
      <h2>{site.contact.formTitle}</h2>
      <p className="form-note">{site.contact.formNote}</p>
      <form ref={formRef} onSubmit={onSubmit} noValidate aria-label={site.contact.formTitle}>
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
          <input {...field("website")} autoComplete="off" tabIndex={-1} />
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
