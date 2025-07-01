'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchControls({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const currentCategory = searchParams.get('category');

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryClick = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`/search?${params.toString()}`);
  };
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* Search Input Section */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search servers..."
              className="w-full pl-10 py-6 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <Button className="px-8 py-6 text-lg font-medium cursor-pointer" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <Button
          onClick={() => handleCategoryClick(null)}
          variant={!currentCategory ? 'default' : 'outline'}
          className="rounded-full transition-colors"
          size="sm"
        >
          All
        </Button>
        {categories.map((tag) => (
          <Button
            key={tag}
            onClick={() => handleCategoryClick(tag)}
            variant={currentCategory === tag ? 'default' : 'outline'}
            className="rounded-full transition-colors"
            size="sm"
          >
            {tag}
          </Button>
        ))}
      </div>
    </>
  );
} 