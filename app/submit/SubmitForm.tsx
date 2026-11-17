'use client';

import { useState } from 'react';
import type { Category, Website } from '@/types';
import { createSubmission, getSubmissions } from '@/lib/store/submissions';
import { isValidEmail, isValidUrl } from '@/lib/utils';
import { toast } from '@/components/Toaster';

function normalizeUrl(url: string): string {
  return url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

export default function SubmitForm({ categories, regions, allWebsites }: { categories: Category[]; regions: string[]; allWebsites: Website[] }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.slug || '');
  const [region, setRegion] = useState(regions[0] || '');
  const [organization, setOrganization] = useState('');
  const [city, setCity] = useState('');
  const [tags, setTags] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Please enter a website name.';
    if (!isValidUrl(url)) next.url = 'Please enter a valid URL (must start with http:// or https://).';
    else {
      const target = normalizeUrl(url);
      const dup = allWebsites.some((w) => normalizeUrl(w.url) === target) || getSubmissions().some((s) => normalizeUrl(s.url) === target);
      if (dup) next.url = 'This website is already listed or pending review.';
    }
    if (!description.trim()) next.description = 'Please add a short description.';
    if (email && !isValidEmail(email)) next.email = 'Please enter a valid email address.';

    setErrors(next);
    if (Object.keys(next).length) {
      toast('Please fix the highlighted fields');
      return;
    }

    createSubmission({ name, url, description, category, region, city, organization, tags, submittedBy: email || 'anonymous' });
    toast('Website submitted for review — thank you!');
    setName('');
    setUrl('');
    setDescription('');
    setOrganization('');
    setCity('');
    setTags('');
    setEmail('');
    setPhone('');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-line/20 rounded-card p-6 max-w-[640px]">
      <Field label="Website name *" error={errors.name}>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g. Debre Markos University" className="input" />
      </Field>
      <Field label="URL *" error={errors.url}>
        <input value={url} onChange={(e) => setUrl(e.target.value)} type="url" placeholder="https://example.com" className="input" />
      </Field>
      <Field label="Short description *" error={errors.description}>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="One or two sentences about this website" className="input min-h-[90px]" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field label="Category *">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Region">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="input">
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field label="Organization">
          <input value={organization} onChange={(e) => setOrganization(e.target.value)} type="text" className="input" />
        </Field>
        <Field label="City">
          <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="input" />
        </Field>
      </div>
      <Field label="Tags">
        <input value={tags} onChange={(e) => setTags(e.target.value)} type="text" placeholder="comma, separated, tags" className="input" />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field label="Your contact email" error={errors.email}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="input" />
        </Field>
        <Field label="Contact phone (optional)">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="input" />
        </Field>
      </div>
      <button type="submit" className="w-full bg-indigo text-white dark:text-[#0D1117] rounded-lg py-3 text-sm font-semibold mt-2">
        Submit for Review
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid rgb(var(--line) / 0.2);
          border-radius: 9px;
          background: rgb(var(--paper));
          font-size: 14px;
          outline: none;
        }
        .input:focus {
          border-color: rgb(var(--indigo));
        }
      `}</style>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1.5">{label}</label>
      {children}
      {error && <div className="text-rust text-xs mt-1">{error}</div>}
    </div>
  );
}
