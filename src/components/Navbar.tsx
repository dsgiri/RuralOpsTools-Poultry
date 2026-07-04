import { ViewState } from '../types';
import { Menu, X, Home, ClipboardList, CheckSquare, Activity } from 'lucide-react';
import { useState } from 'react';
import React from 'react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { view: ViewState; label: string; icon: React.FC<{className?: string}> }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: Home },
    { view: 'egg-log', label: 'Egg Log', icon: ClipboardList },
    { view: 'coop-checklist', label: 'Coop Check', icon: CheckSquare },
    { view: 'flock-health', label: 'Flock Health', icon: Activity },
  ];

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-kraft-light border-b border-line sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => handleNav('dashboard')}
              className="flex-shrink-0 flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 bg-rust text-kraft flex items-center justify-center font-serif font-bold text-xl rounded-sm">
                P
              </div>
              <span className="font-serif font-bold text-xl text-ink tracking-tight">Poultry</span>
            </button>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`inline-flex items-center gap-1.5 px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'border-rust text-rust' 
                      : 'border-transparent text-ink-soft hover:text-ink hover:border-line'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded text-ink-soft hover:text-ink hover:bg-kraft focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rust"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-line bg-kraft-light">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNav(item.view)}
                  className={`w-full flex items-center gap-2 pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                    isActive
                      ? 'bg-kraft border-rust text-rust'
                      : 'border-transparent text-ink-soft hover:bg-kraft hover:text-ink'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
