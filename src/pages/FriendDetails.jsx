import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Clock,
  Archive,
  Trash2,
  Calendar,
  Target,
  Mail,
  ArrowLeft,
  Pencil,
  Tag,
} from 'lucide-react';
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';
import friendsData from '../data/friends.json';
import StatusBadge from '../components/StatusBadge';
import { useTimeline } from '../context/TimelineContext';

export default function FriendDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();

  const friend = friendsData.find(f => f.id === parseInt(id));
  const [goal, setGoal] = useState(friend?.goal ?? 14);
  const [editingGoal, setEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);

  if (!friend) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Friend not found.</p>
          <button
            onClick={() => navigate('/')}
            className="text-[#174d31] font-medium hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleCheckin = type => {
    addEntry(type, friend.name, friend.id);
    const icons = { call: '📞', text: '💬', video: '🎥' };
    toast.success(
      `${icons[type]} ${capitalize(type)} with ${friend.name} logged!`,
      {
        style: {
          borderRadius: '12px',
          background: '#174d31',
          color: '#fff',
        },
      },
    );
  };

  const saveGoal = () => {
    setGoal(tempGoal);
    setEditingGoal(false);
  };

  const formatDate = dateStr =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#174d31] text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Friends
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              {/* Avatar + Name + Status */}
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                  <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=174d31&color=fff&size=96`;
                    }}
                  />
                </div>
                <div>
                  <h1 className="font-display text-xl font-bold text-gray-900">
                    {friend.name}
                  </h1>
                  <div className="mt-1.5">
                    <StatusBadge status={friend.status} />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 justify-center">
                {friend.tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs bg-[#f0faf4] text-[#1a5c3a] border border-[#d9f2e3] px-2.5 py-1 rounded-full"
                  >
                    <Tag size={11} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-500 leading-relaxed text-center italic border-t border-gray-50 pt-4">
                "{friend.bio}"
              </p>

              {/* Email */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Mail size={14} className="text-[#1a5c3a]" />
                <span>{friend.email}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 text-sm font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer hover:border-gray-300">
                <Clock size={15} />
                Snooze 2 weeks
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 text-sm font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer hover:border-gray-300">
                <Archive size={15} />
                Archive
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-red-500 border border-gray-200 text-sm font-medium px-4 py-2.5 rounded-xl transition-all cursor-pointer hover:border-gray-300">
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-3 space-y-5">
            {/* ① Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: 'Days Since Contact',
                  value: friend.days_since_contact,
                  large: true,
                },
                {
                  label: 'Goal (Days)',
                  value: goal,
                  large: true,
                },
                {
                  label: 'Next Due',
                  value: formatDate(friend.next_due_date),
                  large: false,
                },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm py-8 text-center"
                >
                  <p
                    className={`font-bold text-[#244D3F] ${stat.large ? 'text-xl sm:text-2xl' : ''}`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm sm:text-lg font-medium text-[#64748B] mt-2 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ② Relationship Goal */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#244D3F] text-xl">
                  Relationship Goal
                </h3>
                <button
                  onClick={() => {
                    setEditingGoal(!editingGoal);
                    setTempGoal(goal);
                  }}
                  className="  text-xs text-[#174d31] border border-[#b3e5c7] bg-[#f0faf4] hover:bg-[#d9f2e3] px-4 py-1.5 rounded-lg transition-all font-medium"
                >
                  Edit
                </button>
              </div>

              {editingGoal ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-gray-600">Connect every</span>
                  <input
                    type="number"
                    value={tempGoal}
                    onChange={e => setTempGoal(Number(e.target.value))}
                    min={1}
                    className="w-16 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:border-[#2a8f5e]"
                  />
                  <span className="text-sm text-gray-600">days</span>
                  <button
                    onClick={saveGoal}
                    className="text-xs bg-[#174d31] text-white px-3 py-1.5 rounded-lg hover:bg-[#143f29] transition-colors font-medium"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Connect every{' '}
                  <span className="font-semibold text-[#174d31]">
                    {goal} days
                  </span>
                </p>
              )}
            </div>

            {/*  Quick Check In */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-semibold text-[#244D3F] mb-4">
                Quick Check-In
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckin('call')}
                  className="flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 text-[#1F2937] transition-all duration-200 group"
                >
                  <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <img
                      src={callIcon}
                      alt="Call"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">Call</span>
                </button>

                <button
                  onClick={() => handleCheckin('text')}
                  className="flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 text-[#1F2937] transition-all duration-200 group"
                >
                  <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <img
                      src={textIcon}
                      alt="Text"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">Text</span>
                </button>

                <button
                  onClick={() => handleCheckin('video')}
                  className="flex flex-col items-center gap-2 py-5 rounded-xl border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 text-[#1F2937] transition-all duration-200 group"
                >
                  <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <img
                      src={videoIcon}
                      alt="Video"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
