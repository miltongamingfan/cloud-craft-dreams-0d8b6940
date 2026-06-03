import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionTitle } from "@/components/site/Sections";
import { Mail, MessageCircle, Headphones } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TigerHost" },
      { name: "description", content: "Get in touch with the TigerHost team. 24/7 support, sales, and migration assistance." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <div className="px-6 pt-20 text-center">
        <h1 className="font-display text-5xl font-extrabold md:text-6xl">Talk to <span className="gradient-text">our crew</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Sales questions, custom builds, migrations, partnerships — we reply in under 5 minutes during business hours.</p>
      </div>

      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4 md:col-span-1">
            <ContactCard icon={<Mail className="h-5 w-5" />} title="Email" value="hello@tigerhost.space" />
            <ContactCard icon={<MessageCircle className="h-5 w-5" />} title="Live Chat" value="24/7 on the dashboard" />
            <ContactCard icon={<Headphones className="h-5 w-5" />} title="Discord" value="discord.gg/tigerhost" />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="md:col-span-2 rounded-3xl border border-border/60 bg-[var(--gradient-card)] p-8"
          >
            {sent ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <div className="text-5xl">🎉</div>
                <h3 className="mt-4 font-display text-2xl font-bold">Message sent!</h3>
                <p className="mt-2 text-muted-foreground">We'll get back to you within a few minutes.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name" name="name" />
                  <Field label="Email" name="email" type="email" />
                </div>
                <Field label="Subject" name="subject" />
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Message</label>
                  <textarea required rows={5} className="w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none focus:border-primary" />
                </div>
                <button className="self-start rounded-xl bg-[var(--gradient-primary)] px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105">
                  Send message
                </button>
              </div>
            )}
          </form>
        </div>
      </Section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input required type={type} name={name} className="w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none focus:border-primary" />
    </div>
  );
}

function ContactCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">{icon}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
