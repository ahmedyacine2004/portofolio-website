'use client';

import { useApi } from '@/hooks/use-api';

export function ApiShowcase() {
  const { data, isPending, error } = useApi();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to connect to the API.</p>;
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">TanStack Query</h2>

      <pre className="font-mono text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
