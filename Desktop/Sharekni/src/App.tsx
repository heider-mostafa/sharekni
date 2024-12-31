import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Building2, PlusCircle, Search } from 'lucide-react';
import { ApplicationForm } from './components/ApplicationForm';
import { StartupListings } from './pages/StartupListings';
import { StartupProfile } from './pages/StartupProfile';
import { StartupAnalytics } from './pages/StartupAnalytics';
import { NewsPage } from './pages/NewsPage';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedStartups } from './components/home/FeaturedStartups';
import { ProgramBenefits } from './components/home/ProgramBenefits';
import { NewsSection } from './components/home/NewsSection';
import { InboxDialog } from './components/messages/InboxDialog';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Y Combinator Middle East
                </h1>
              </Link>
              
              <nav className="flex items-center space-x-6">
                <Link
                  to="/startups"
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                >
                  <Search className="w-5 h-5" />
                  <span>Browse Startups</span>
                </Link>
                <InboxDialog />
                <Link
                  to="/apply"
                  className="flex items-center space-x-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Apply Now</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/startups" element={<StartupListings />} />
          <Route path="/startups/:id" element={<StartupProfile />} />
          <Route path="/startups/:id/analytics" element={<StartupAnalytics />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/news" element={<NewsPage />} />
          <Route
            path="/"
            element={
              <main>
                <HeroSection />
                <FeaturedStartups />
                <ProgramBenefits />
                <NewsSection />
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;