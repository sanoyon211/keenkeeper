import { useNavigate } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 bg-[#f0faf4] rounded-full flex items-center justify-center mb-6 border-2 border-[#d9f2e3]">
        <Frown size={44} className="text-[#2a8f5e]" />
      </div>

      <h1 className="font-display text-7xl font-bold text-[#174d31] mb-3">404</h1>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-400 text-sm max-w-xs mb-10 leading-relaxed">
        The page you're looking for doesn't exist. Maybe your friend moved?
      </p>

      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 bg-[#174d31] hover:bg-[#143f29] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <Home size={16} />
        Back to Home
      </button>
    </div>
  );
}
