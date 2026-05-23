"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "@/components/ui/icons";

const fieldClass =
  "mt-2 w-full border border-line bg-base px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-faint focus:border-brand";
const labelClass =
  "text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";

const programmeOptions = [
  "Latin & Ballroom",
  "Caribbean (Salsa, Bachata, Merengue)",
  "Modern & Performance",
  "Dance Fitness",
  "Private Lessons",
  "Competition Preparation",
  "Holiday Camp",
  "Still deciding",
];

const packageOptions = ["Starter", "Regular", "Full Package", "Not sure yet"];

/**
 * Studio registration form. Submission is handled on the client only —
 * wiring it to email, WhatsApp, or a route handler is the integration
 * point noted in plan.md.
 */
export function RegisterForm({
  defaultPackage,
}: {
  defaultPackage?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const presetPackage =
    defaultPackage && packageOptions.includes(defaultPackage)
      ? defaultPackage
      : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const fd = new FormData(event.currentTarget);
    const payload: Record<string, string | string[]> = {};
    for (const key of new Set(fd.keys())) {
      const all = fd.getAll(key).map(String);
      payload[key] = key === "days" ? all : all[0];
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        "Something went wrong sending your registration. Please try again, or call the studio directly.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-line bg-surface p-8 text-center md:p-12">
        <span className="mx-auto grid h-12 w-12 place-items-center bg-brand text-cream">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-cream">
          Registration received
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Thank you. The studio team will be in touch to confirm class
          placement. For anything urgent, call or WhatsApp the studio directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 border border-line bg-surface p-6 sm:p-8 md:p-10"
    >
      {/* Honeypot — hidden from people, catches bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <FormSection step="01" title="Student details">
        <TextField id="student-name" label="Full name of student" required full />
        <TextField id="dob" label="Date of birth" type="date" required />
        <TextField id="age" label="Age" type="number" required />
        <SelectField
          id="gender"
          label="Gender"
          options={["Female", "Male", "Prefer not to say"]}
        />
        <TextField id="school" label="School or occupation" full />
      </FormSection>

      <FormSection
        step="02"
        title="Parent or guardian"
        note="Required for students under 18 years old."
      >
        <TextField id="guardian-name" label="Parent / guardian name" />
        <TextField id="relationship" label="Relationship to student" />
        <TextField id="guardian-phone" label="Phone number" type="tel" />
        <TextField id="alt-phone" label="Alternative contact number" type="tel" />
        <TextField id="guardian-email" label="Email address" type="email" full />
      </FormSection>

      <FormSection step="03" title="Where you live">
        <TextField id="address" label="Home address" full />
        <TextField id="district" label="District" />
      </FormSection>

      <FormSection step="04" title="Programme & schedule">
        <SelectField
          id="package"
          label="Preferred package"
          options={packageOptions}
          defaultValue={presetPackage}
        />
        <SelectField
          id="programme"
          label="Preferred programme"
          options={programmeOptions}
          required
        />
        <SelectField
          id="level"
          label="Class level"
          options={["Beginner", "Intermediate", "Advanced"]}
        />
        <CheckboxGroup
          label="Preferred days"
          name="days"
          options={["Weekdays", "Saturdays", "Sundays"]}
        />
        <TextField id="time" label="Preferred time" />
      </FormSection>

      <FormSection
        step="05"
        title="Transport"
        note="Studio transport can be arranged for some students."
      >
        <SelectField
          id="transport"
          label="Studio transport"
          options={["Not required", "Required"]}
        />
        <div className="hidden sm:block" aria-hidden="true" />
        <TextField id="pickup" label="Pick-up location" />
        <TextField id="dropoff" label="Drop-off location" />
      </FormSection>

      <FormSection step="06" title="Emergency & medical">
        <TextField id="emergency-name" label="Emergency contact person" required />
        <TextField
          id="emergency-phone"
          label="Emergency contact number"
          type="tel"
          required
        />
        <TextareaField
          id="medical"
          label="Medical conditions, allergies, or injuries"
          placeholder="Anything the instructor should know before class."
        />
      </FormSection>

      <FormSection step="07" title="Consent">
        <div className="sm:col-span-2">
          <span className={labelClass}>Photography & video consent</span>
          <p className="mt-1 text-xs text-faint">
            May the studio use class and event photos or video for promotion?
          </p>
          <div className="mt-3 flex gap-6">
            {["Yes", "No"].map((value) => (
              <label
                key={value}
                className="flex items-center gap-2.5 text-sm text-cream"
              >
                <input
                  type="radio"
                  name="photoConsent"
                  value={value}
                  required
                  className="h-4 w-4 accent-brand"
                />
                {value}
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:col-span-2">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
          />
          <span>
            I confirm the information provided is correct, understand that
            dance involves physical activity, and agree to follow the
            studio&apos;s rules and safety guidelines.
          </span>
        </label>
      </FormSection>

      <div>
        <Button
          type="submit"
          variant="solid"
          size="lg"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? "Sending…" : "Submit Registration"}
        </Button>
        {error && (
          <p className="mt-3 text-center text-xs text-brand">{error}</p>
        )}
        <p className="mt-3 text-center text-xs text-faint">
          Class enrolment is handled directly with the studio. No payment is taken online.
        </p>
      </div>
    </form>
  );
}

/* ---- field helpers ---------------------------------------------------- */

function FormSection({
  step,
  title,
  note,
  children,
}: {
  step: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-line pt-8">
      <p className="flex items-baseline gap-3">
        <span className="font-display text-sm text-brand">{step}</span>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream">
          {title}
        </span>
      </p>
      {note && <p className="mt-1.5 text-xs text-faint">{note}</p>}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children}
      {required && <span className="text-brand"> *</span>}
    </label>
  );
}

function TextField({
  id,
  label,
  type = "text",
  required = false,
  full = false,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  placeholder?: string;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClass}
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  required = false,
  defaultValue = "",
}: {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue={defaultValue}
        className={fieldClass}
      >
        {defaultValue === "" && (
          <option value="" disabled>
            Please select…
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  id,
  label,
  placeholder,
}: {
  id: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="sm:col-span-2">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        name={id}
        rows={4}
        placeholder={placeholder}
        className={`${fieldClass} resize-y`}
      />
    </div>
  );
}

function CheckboxGroup({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-2.5 text-sm text-cream"
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              className="h-4 w-4 accent-brand"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
