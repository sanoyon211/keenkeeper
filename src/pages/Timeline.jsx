import { useState } from 'react';
import { Users, Clock } from 'lucide-react';
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';
import { useTimeline } from '../context/TimelineContext';

const TYPE_CONFIG = {
  call: {
    icon: callIcon,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'Call',
  },
  text: {
    icon: textIcon,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    label: 'Text',
  },
  video: {
    icon: videoIcon,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    label: 'Video',
  },
  meetup: {
    icon: null,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    label: 'Meetup',
  },
};

const FILTERS = ['All', 'Call', 'Text', 'Video'];

export default function Timeline() {
  const { entries } = useTimeline();
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = entries
    .filter(
      entry =>
        activeFilter === 'All' || entry.type === activeFilter.toLowerCase(),
    )
    .filter(
      entry =>
        searchQuery.trim() === '' ||
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.type.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const diff = new Date(b.date) - new Date(a.date);
      return sortOrder === 'newest' ? diff : -diff;
    });

  const formatDate = dateStr =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-display text-[#1F2937]">
              Timeline
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {filtered.length} interactions
            </p>
          </div>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-forest-400 text-gray-600"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by friend name or interaction type..."
          className="w-full text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-gray-400 text-gray-600 placeholder-gray-400 mb-3"
        />

        {/* Filter */}
        <select
          value={activeFilter}
          onChange={e => setActiveFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-forest-400 text-gray-600"
        >
          <option value="All" selected>
            Filter timeline
          </option>
          <option value="Call">Call</option>
          <option value="Text">Texts</option>
          <option value="Video">Video</option>
        </select>

        {/* Timeline entries */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No interactions yet</p>
            <p className="text-sm mt-1">
              Use the Quick Check-In on a friend's page to log one.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {filtered.map((entry, idx) => {
              const config = TYPE_CONFIG[entry.type] || TYPE_CONFIG.call;
              return (
                <div
                  key={entry.id}
                  className="relative flex items-start gap-4 fade-in"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Card */}
                  <div className=" w-full bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="">
                        <img
                          src={config.icon}
                          alt={config.label}
                          className="w-5 h-5 object-contain"
                        />
                      </div>

                      <div className="flex flex-col ">
                        <p className="font-medium text-gray-900 text-sm">
                          {entry.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDate(entry.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
