import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../store/applicationStore';
import { Button } from './ui/Button';
import { ImageUpload } from './ImageUpload';
import { StartupApplication, ApplicationStatus } from '../types/application';
import { generateId } from '../lib/utils';

export function ApplicationForm() {
  const navigate = useNavigate();
  const addApplication = useApplicationStore((state) => state.addApplication);
  const convertToStartup = useApplicationStore((state) => state.convertToStartup);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    website: '',
    foundedDate: '',
    location: '',
    teamSize: 1,
    pitch: '',
    problem: '',
    solution: '',
    marketSize: '',
    competition: '',
    businessModel: '',
    fundingStage: '',
    fundingNeeded: 0,
    logo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const application: StartupApplication = {
      id: generateId(),
      ...formData,
      status: 'submitted' as ApplicationStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    addApplication(application);
    convertToStartup(application);
    navigate('/startups');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Startup Application</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Logo
              <ImageUpload
                onImageUploaded={(url) => setFormData(prev => ({ ...prev, logo: url }))}
                className="mt-1"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Industry
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select Industry</option>
                <option value="fintech">Fintech</option>
                <option value="healthtech">Healthtech</option>
                <option value="edtech">Edtech</option>
                <option value="ecommerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="ai">AI</option>
                <option value="cleantech">Cleantech</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Founded Date
              <input
                type="date"
                name="foundedDate"
                value={formData.foundedDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Team Size
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Pitch (One-line description)
            <textarea
              name="pitch"
              value={formData.pitch}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Problem You're Solving
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Your Solution
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Market Size
            <textarea
              name="marketSize"
              value={formData.marketSize}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Competition
            <textarea
              name="competition"
              value={formData.competition}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Business Model
            <textarea
              name="businessModel"
              value={formData.businessModel}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Funding Stage
              <select
                name="fundingStage"
                value={formData.fundingStage}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select stage</option>
                <option value="pre-seed">Pre-seed</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b">Series B</option>
                <option value="series-c">Series C+</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Funding Needed (USD)
              <input
                type="number"
                name="fundingNeeded"
                value={formData.fundingNeeded}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setFormData({
            companyName: '',
            industry: '',
            website: '',
            foundedDate: '',
            location: '',
            teamSize: 1,
            pitch: '',
            problem: '',
            solution: '',
            marketSize: '',
            competition: '',
            businessModel: '',
            fundingStage: '',
            fundingNeeded: 0,
            logo: '',
          })}
        >
          Reset
        </Button>
        <Button type="submit">Submit Application</Button>
      </div>
    </form>
  );
}