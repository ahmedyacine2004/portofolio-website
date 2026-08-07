'use client';

import { useEffect, useState } from 'react';

import { getApi, type ApiResponse } from '@/services/api.service';

export function ApiShowcase() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApi()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading API...</p>;
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">API Connection</h2>

      <pre className="font-mono text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
