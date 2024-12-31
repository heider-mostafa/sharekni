import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStartupStore } from '../store/startupStore';
import { StartupProfileEditor } from '../components/StartupProfileEditor';
import { StartupProfileView } from '../components/StartupProfileView';
import { ViewCounter } from '../components/ViewCounter';
import { BookmarkButton } from '../components/startup/BookmarkButton';
import { ContactRequestDialog } from '../components/ContactRequestDialog';
import { InvestorShowcase } from '../components/startup/investors/InvestorShowcase';
import { StartupUpdates } from '../components/startup/updates/StartupUpdates';
import { TeamSection } from '../components/startup/team/TeamSection';
import { MetricsSection } from '../components/startup/metrics/MetricsSection';
import { DocumentSection } from '../components/startup/documents/DocumentSection';
import { Pencil, BarChart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FundraisingCard } from '../components/startup/fundraising/FundraisingCard'; 

export function StartupProfile() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const startup = useStartupStore((state) =>
    state.startups.find((s) => s.id === id)
  );

  if (!startup) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">Startup not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative h-64 rounded-xl overflow-hidden mb-8">
        <img
          src={startup.coverImage || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80'}
          alt={startup.companyName}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 flex items-center space-x-4">
          <img
            src={startup.logo || 'https://via.placeholder.com/80'}
            alt={`${startup.companyName} logo`}
            className="w-20 h-20 rounded-lg bg-white p-2 shadow-lg"
          />
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {startup.companyName}
            </h1>
            <p className="text-gray-600">{startup.location}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <BookmarkButton
            startupId={startup.id}
            bookmarkedBy={startup.bookmarkedBy || []}
          />
          <ContactRequestDialog
            startupId={startup.id}
            startupName={startup.companyName}
            startupLogo={startup.logo}
            onRequestSent={() => {}}
          />
          <ViewCounter views={startup.metrics.views} />
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={`/startups/${startup.id}/analytics`}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
          >
            <BarChart className="w-5 h-5" />
            <span>View Analytics</span>
          </Link>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Pencil className="w-4 h-4" />
            <span>{isEditing ? 'View Profile' : 'Edit Profile'}</span>
          </Button>
        </div>
      </div>

      {isEditing ? (
        <StartupProfileEditor
          startup={startup}
          onCancel={() => setIsEditing(false)}
          onSave={() => setIsEditing(false)}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-600 mb-6">{startup.pitch}</p>
              <MetricsSection metrics={startup.metrics} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Team</h2>
              <TeamSection members={startup.teamMembers || []} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Updates & Milestones</h2>
              <StartupUpdates updates={startup.updates} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Investment History</h2>
              <InvestorShowcase investments={startup.investments} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Resources</h2>
              <DocumentSection
                pitchDeckUrl={startup.pitchDeckUrl}
                videoUrl={startup.videoUrl}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Facts</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Industry</dt>
                  <dd className="text-base text-gray-900 capitalize">{startup.industry}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Founded</dt>
                  <dd className="text-base text-gray-900">
                    {new Date(startup.foundedDate).getFullYear()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Team Size</dt>
                  <dd className="text-base text-gray-900">{startup.teamSize} members</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Funding Stage</dt>
                  <dd className="text-base text-gray-900 capitalize">
                    {startup.fundingStage.replace('-', ' ')}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Connect</h2>
              <div className="space-y-4">
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-indigo-600 hover:text-indigo-800"
                  >
                    Visit Website
                  </a>
                )}
                {Object.entries(startup.socialLinks || {}).map(([platform, url]) => (
                  url && (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-indigo-600 hover:text-indigo-800 capitalize"
                    >
                      {platform}
                    </a>
                  )
                ))}

{startup.fundraising && (
  <div className="bg-white rounded-lg shadow-sm">
    <FundraisingCard
      startupId={startup.id}
      goal={startup.fundraising.goal}
      raised={startup.fundraising.raised}
      backers={startup.fundraising.backers}
      daysLeft={Math.ceil((new Date(startup.fundraising.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
      description={startup.fundraising.description}
    />
  </div>
)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}