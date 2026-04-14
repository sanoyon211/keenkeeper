import { useState, useEffect } from 'react';
import { UserPlus, Users, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import FriendCard from '../components/FriendCard';
import friendsData from '../data/friends.json';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const total = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(f => f.status !== 'on-track').length;

  const summaryCards = [
    {
      label: 'Total Friends',
      value: total || 10,
      icon: Users,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'On Track',
      value: onTrack || 3,
      icon: CheckCircle,
      bg: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      label: 'Need Attention',
      value: needAttention || 6,
      icon: AlertTriangle,
      bg: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      label: 'Interactions This Month',
      value: 12,
      icon: Zap,
      bg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Banner ── */}
      <section className="bg-[#F8FAFC] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Friends to keep close in your life
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>

          {/* Add Friend Button */}
          <button className="inline-flex items-center gap-2 bg-[#174d31] hover:bg-[#143f29] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
            <UserPlus size={16} />
            Add a Friend
          </button>

          {/* Summary Cards */}
          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-7 mt-12 w-full mx-auto fade-in">
              {summaryCards.map((card, i) => (
                <div
                  key={card.label}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm px-10 py-8 fade-in "
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <p className="text-3xl font-bold text-forest-800">
                    {card.value}
                  </p>
                  <p className="text-base text-gray-600 mt-1 sm:mt-3 leading-snug">
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Friends Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-6">Your Friends</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-28 gap-4">
            <div className="spinner" />
            <p className="text-sm text-gray-400">Loading your friends...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 fade-in">
            {friends.map((friend, i) => (
              <div
                key={friend.id}
                className="fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <FriendCard friend={friend} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
