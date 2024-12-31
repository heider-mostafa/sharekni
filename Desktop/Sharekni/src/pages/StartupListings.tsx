import React from 'react';
import { StartupFilters } from '../components/StartupFilters';
import { StartupCard } from '../components/StartupCard';
import { useStartupStore } from '../store/startupStore';

export function StartupListings() {
  const filteredStartups = useStartupStore((state) => state.getFilteredStartups());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 flex-shrink-0">
          <StartupFilters />
        </div>
        
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Featured Startups</h1>
            <p className="text-gray-600">Discover innovative startups from the Middle East</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <StartupCard key={startup.id} startup={startup} />
            ))}
          </div>
          
          {filteredStartups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No startups found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}