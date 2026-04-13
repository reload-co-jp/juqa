"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const HeaderSearch = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/plants?q=${encodeURIComponent(query.trim())}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="植物を検索..."
        style={{
          padding: '0.4rem 0.6rem',
          borderRadius: '4px',
          border: '1px solid #444',
          background: '#333',
          color: '#fff',
          fontSize: '0.8rem',
        }}
      />
      <button
        type="submit"
        style={{
          background: '#5a9a5c',
          color: '#fff',
          border: 'none',
          padding: '0.4rem 0.8rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.8rem',
        }}
      >
        検索
      </button>
    </form>
  );
};
