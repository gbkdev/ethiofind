'use client';

import { useEffect, useState } from 'react';

interface ToastItem {
  id: number;
  message: string;
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>('ethiofind:toast', { detail: message }));
}

export default function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    function handler(e: Event) {
      const message = (e as CustomEvent<string>).detail;
      const id = Date.now();
      setItems((prev) => [...prev, { id, message }]);
      setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 2600);
    }
    window.addEventListener('ethiofind:toast', handler);
    return () => window.removeEventListener('ethiofind:toast', handler);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-[90vw]">
      {items.map((t) => (
        <div
          key={t.id}
          className="bg-ink text-paper dark:bg-paper dark:text-ink rounded-xl px-4 py-3 text-sm shadow-lg animate-[toast-in_.2s_ease]"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
