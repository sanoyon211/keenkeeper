import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function FriendCard({ friend }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden group"
    >
      <div className="p-4">
        {/* Avatar */}
        <div className="flex flex-col items-center text-center mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 mb-2 shadow-sm">
            <img
              src={friend.picture}
              alt={friend.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-forest-700 transition-colors">
            {friend.name}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {friend.days_since_contact}d ago
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 justify-center mb-3">
          {friend.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="text-xs font-medium bg-[#CBFADB] text-[#244D3F] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status */}
        <div className="flex justify-center">
          <StatusBadge status={friend.status} />
        </div>
      </div>
    </div>
  );
}
