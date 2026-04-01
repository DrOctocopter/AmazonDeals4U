import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_DEALS } from '../lib/data';
import { DealCard } from '../components/DealCard';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return MOCK_DEALS.filter(deal => 
      deal.title.toLowerCase().includes(lowerQuery) || 
      deal.description.toLowerCase().includes(lowerQuery) ||
      deal.category.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600">
          Showing results for <span className="font-bold text-gray-900">"{query}"</span>
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">No results found</h2>
          <p className="text-gray-500">We couldn't find any deals matching your search. Try different keywords.</p>
        </div>
      )}
    </div>
  );
};
