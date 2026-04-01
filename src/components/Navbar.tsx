import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ShoppingBag, ChevronDown, Bell } from 'lucide-react';
import { CATEGORIES } from '../lib/data';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#232f3e] text-white py-2 px-4 text-center text-xs font-medium">
        <p>🔥 Prime Day is coming! Get ready for the biggest deals of the year. <Link to="/prime-day" className="underline hover:text-orange-400">Learn more</Link></p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-[#FF9900] p-1.5 rounded-lg">
              <ShoppingBag className="text-black" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900">DEAL<span className="text-[#FF9900]">HUNTER</span><span className="text-xs font-bold ml-0.5">UK</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-orange-600 py-4">
                Categories <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-b-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0">
                {CATEGORIES.map(cat => (
                  <Link 
                    key={cat} 
                    to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 font-medium"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/trending" className="text-sm font-bold text-gray-700 hover:text-orange-600">Trending</Link>
            <Link to="/guides" className="text-sm font-bold text-gray-700 hover:text-orange-600">Buying Guides</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search size={20} />
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
              <Bell size={16} />
              Alerts
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 p-4 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for deals (e.g. 'Air Fryer', 'PS5')..."
              className="w-full bg-gray-100 border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 font-medium"
              autoFocus
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-4 px-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(cat => (
                <Link 
                  key={cat} 
                  to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="px-3 py-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <hr className="border-gray-100" />
            <Link to="/trending" className="text-lg font-bold text-gray-900" onClick={() => setIsMenuOpen(false)}>Trending Deals</Link>
            <Link to="/guides" className="text-lg font-bold text-gray-900" onClick={() => setIsMenuOpen(false)}>Buying Guides</Link>
            <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold">
              Get Daily Deal Alerts
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
