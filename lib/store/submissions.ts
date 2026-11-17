'use client';

import type { Submission } from '@/types';

const KEY = 'ethiofind:submissions';

export function getSubmissions(): Submission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Submission[]) : [];
  } catch {
    return [];
  }
}

export function createSubmission(input: Omit<Submission, 'id' | 'status' | 'createdAt'>): Submission {
  const submission: Submission = {
    ...input,
    id: `s_${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString().slice(0, 10),
  };
  const next = [submission, ...getSubmissions()];
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return submission;
}

export function updateSubmissionStatus(id: string, status: Submission['status']): Submission[] {
  const next = getSubmissions().map((s) => (s.id === id ? { ...s, status } : s));
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
