import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart2 } from 'lucide-react';


export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-4 py-2 rounded-sm font-medium text-sm transition-all duration-200 ${
      isActive
        ? 'text-white/80 bg-forest-800 hover:text-white '
        : 'bg-white text-forest-800 shadow-sm font-semibold'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <h2 className="font-bold text-gray-800 text-xl md:text-3xl">
              Keen<span className="text-forest-800">keeper</span>
            </h2>
          </NavLink>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <NavLink to="/" end className={linkClass}>
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </NavLink>
            <NavLink to="/timeline" className={linkClass}>
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Timeline</span>
            </NavLink>
            <NavLink to="/stats" className={linkClass}>
              <BarChart2 className="w-4 h-4" />
              <span className="hidden sm:inline">Stats</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
