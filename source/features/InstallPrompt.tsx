import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Navigator {
    standalone?: boolean;
  }
  interface Window {
    MSStream?: boolean;
  }
}

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'other'>('other');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      navigator.standalone === true;
    if (isStandalone) return;

    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed && Date.now() < parseInt(dismissed)) return;

    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(userAgent);
    const isMobile = isIOS || isAndroid;

    if (isMobile) {
      setPlatform(isIOS ? 'ios' : 'android');
      if (isAndroid) {
        // Try to catch the native install prompt event
        const handler = (e: Event) => {
          e.preventDefault();
          setDeferredPrompt(e as BeforeInstallPromptEvent);
          setShowPrompt(true);
          window.removeEventListener('beforeinstallprompt', handler);
        };
        window.addEventListener('beforeinstallprompt', handler as EventListener);
        // Fallback: if the event doesn't fire within 3 seconds, show manual instructions
        setTimeout(() => {
          if (!deferredPrompt) {
            setShowPrompt(true);
          }
        }, 3000);
      } else {
        setShowPrompt(true);
      }
    } else {
      setPlatform('desktop');
      if (Notification.permission === 'granted') return;
      setShowPrompt(true);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setShowPrompt(false);
      setDeferredPrompt(null);
    }
    localStorage.setItem('installPromptDismissed', (Date.now() + 1000 * 60 * 60 * 24).toString());
    setShowPrompt(false);
  };

  const handleEnableNotifications = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Notifications enabled', {
        body: 'You will now receive updates from Cribxpert.',
      });
    }
    localStorage.setItem('installPromptDismissed', (Date.now() + 1000 * 60 * 60 * 24).toString());
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('installPromptDismissed', (Date.now() + 1000 * 60 * 60 * 24).toString());
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  const sharedCardClass = 'w-full max-w-md rounded-t-2xl bg-white/95 backdrop-blur-sm p-6 shadow-2xl border-t border-gray-200 animate-slide-up';

  // Desktop notifications prompt
  if (platform === 'desktop') {
    return (
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={handleDismiss} />
        <div className={sharedCardClass + ' relative'}>
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Enable Notifications</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Stay updated with the latest from Cribxpert. Get alerts about new listings, messages, and more.
            </p>
          </div>
          <button
            onClick={handleEnableNotifications}
            className="mb-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 font-semibold text-white shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Enable Notifications
          </button>
          <button
            onClick={handleDismiss}
            className="w-full rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
          >
            Maybe later
          </button>
        </div>
      </div>
    );
  }

  // Mobile install prompt (iOS / Android)
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={handleDismiss} />
      <div className={sharedCardClass + ' relative'}>
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.75m-1.5.75a6.01 6.01 0 00-1.5-.75m4.5-4.5a8.25 8.25 0 00-12 0m12 0A9 9 0 103.516 9.516 9 9 0 0012 18z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Install App</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Keep Cribxpert on your home screen – install the app for a faster, seamless experience right from your home screen.
          </p>
        </div>

        {/* iOS – always manual instructions */}
        {platform === 'ios' && (
          <div className="mb-6 space-y-4 bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">1</span>
              <span className="text-gray-700">Tap the Share button</span>
              <span className="ml-auto text-xl">📤</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">2</span>
              <span className="text-gray-700">Scroll and tap <strong>Add to Home Screen</strong></span>
              <span className="ml-auto text-xl">➕</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">3</span>
              <span className="text-gray-700">Tap <strong>Add</strong> to install</span>
            </div>
          </div>
        )}

        {/* Android – native button if available, otherwise manual steps */}
        {platform === 'android' && (
          deferredPrompt ? (
            <button
              onClick={handleInstallClick}
              className="mb-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3.5 font-semibold text-white shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5 active:translate-y-0"
            >
              Install App
            </button>
          ) : (
            <div className="mb-6 space-y-4 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">1</span>
                <span className="text-gray-700">Tap the menu (⋮) icon</span>
                <span className="ml-auto text-xl">⋮</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">2</span>
                <span className="text-gray-700">Select <strong>Install app</strong> or <strong>Add to Home screen</strong></span>
                <span className="ml-auto text-xl">📲</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">3</span>
                <span className="text-gray-700">Confirm installation</span>
              </div>
            </div>
          )
        )}

        <button
          onClick={handleDismiss}
          className="w-full rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}