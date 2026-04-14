import logoXl from '../assets/logo-xl.png';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import twitterIcon from '../assets/twitter.png';

export default function Footer() {
  return (
    <footer className="bg-[#174d31] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand */}
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <img src={logoXl} alt="KeenKeeper" className="h-10 w-auto" />
          <p className="text-white/60 text-sm sm:text-base max-w-3xl leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <span className="text-white text-xs sm:text-xl font-medium uppercase tracking-widest">
            Social Links
          </span>
          <div className="flex items-center gap-3">
            {[
              { icon: facebookIcon, label: 'Facebook' },
              { icon: instagramIcon, label: 'Instagram' },
              { icon: twitterIcon, label: 'Twitter' },
            ].map(s => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-10 h-10 bg-white  rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <img
                  src={s.icon}
                  alt={s.label}
                  className=" object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-white/40 text-xs">
            © 2026 KeenKeeper. All rights reserved.
          </span>
          <div className="flex gap-5 text-xs text-white/40">
            <a href="#" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white/70 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
