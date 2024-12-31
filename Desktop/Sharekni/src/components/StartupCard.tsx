import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Users, TrendingUp } from 'lucide-react';
import { StartupProfile } from '../types/startup';
import { ViewCounter } from './ViewCounter';
import { useStartupStore } from '../store/startupStore';

interface StartupCardProps {
  startup: StartupProfile;
}

export function StartupCard({ startup }: StartupCardProps) {
  const incrementViews = useStartupStore((state) => state.incrementViews);

  const handleClick = () => {
    incrementViews(startup.id);
  };

  return (
    <Link
      to={`/startups/${startup.id}`}
      className="block group hover:shadow-lg transition-shadow duration-200"
      onClick={handleClick}
    >
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="relative h-48">
          <img
            src={startup.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80'}
            alt={startup.companyName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <img
              src={startup.logo || 'https://via.placeholder.com/60'}
              alt={`${startup.companyName} logo`}
              className="w-12 h-12 rounded-lg bg-white p-1 shadow-md"
            />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                {startup.companyName}
              </h3>
              <p className="text-sm text-gray-500">{startup.location}</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
              {startup.fundingStage}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{startup.pitch}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{startup.teamSize} team members</span>
              </div>
              {startup.metrics.users && (
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>{startup.metrics.users.toLocaleString()} users</span>
                </div>
              )}
            </div>
            <ViewCounter views={startup.metrics.views || 0} />
          </div>
        </div>
      </div>
    </Link>
  );
}