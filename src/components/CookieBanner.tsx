import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { ViewState } from '../types';

interface CookieBannerProps {
  onNavigate: (view: ViewState) => void;
}

export function CookieBanner({ onNavigate }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = storage.getCookiesAccepted();
    if (accepted === null) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    storage.setCookiesAccepted(true);
    setIsVisible(false);
  };

  const handleReject = () => {
    storage.setCookiesAccepted(false);
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 z-50 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="bg-ink p-4 sm:p-6 shadow-xl border-l-4 border-rust">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-kraft-light text-sm max-w-2xl">
              <p>
                We use localStorage and cookies to save your app data locally and for Google AdSense personalization. 
                Your logs never leave your device. Read our{' '}
                <button onClick={() => onNavigate('privacy')} className="underline text-board hover:text-kraft transition-colors">
                  Privacy Policy
                </button>
                {' '}for details.
              </p>
            </div>
            <div className="flex flex-row gap-3 shrink-0">
              <button
                onClick={handleReject}
                className="px-4 py-2 border border-line text-kraft text-sm font-medium hover:bg-ink-soft transition-colors"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-rust text-kraft text-sm font-medium hover:bg-rust-dark transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
