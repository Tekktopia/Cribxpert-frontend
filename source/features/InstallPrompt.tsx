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

    const choiceMade = localStorage.getItem('notificationChoiceMade');
    if (choiceMade === 'true') return;

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
      if (Notification.permission === 'granted' || Notification.permission === 'denied') return;
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
    localStorage.setItem('notificationChoiceMade', 'true');
    setShowPrompt(false);
  };

  const handleEnableNotifications = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Notifications enabled', {
        body: 'You will now receive updates from Cribxpert.',
      });
    }
    localStorage.setItem('notificationChoiceMade', 'true');
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('notificationChoiceMade', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  const sharedCardClass = 'w-full max-w-md bg-white p-8 shadow-2xl border border-neutral-100 animate-slide-up';

  // Desktop notifications prompt
  if (platform === 'desktop') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm animate-fade-in" onClick={handleDismiss} />
        <div className={sharedCardClass + ' relative'}>
          <button
            onClick={handleDismiss}
            className="absolute right-6 top-6 text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center mb-8">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">
              Stay Connected
            </p>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutral-50 flex items-center justify-center text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-2xl font-light tracking-tight text-neutral-900 mb-3 uppercase">
              Enable <span className="font-medium">Notifications</span>
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-[280px] mx-auto">
              Stay updated with the latest from Cribxpert. Get real-time alerts about new listings and messages.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleEnableNotifications}
              className="w-full bg-primary text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold shadow-lg shadow-primary/20 hover:bg-neutral-900 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Allow Notifications
            </button>
            <button
              onClick={handleDismiss}
              className="w-full border border-neutral-100 text-neutral-400 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-50 transition-colors"
            >
              No, Thank you
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mobile install prompt (iOS / Android)
  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] flex items-end justify-center">
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm animate-fade-in" onClick={handleDismiss} />
      <div className={sharedCardClass + ' relative rounded-t-[2.5rem]'}>
        <button
          onClick={handleDismiss}
          className="absolute right-6 top-6 text-neutral-400 hover:text-neutral-900 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">
            Mobile Experience
          </p>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutral-50 flex items-center justify-center text-primary">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.75m-1.5.75a6.01 6.01 0 00-1.5-.75m4.5-4.5a8.25 8.25 0 00-12 0m12 0A9 9 0 103.516 9.516 9 9 0 0012 18z" />
            </svg>
          </div>
          <h3 className="text-2xl font-light tracking-tight text-neutral-900 mb-3 uppercase">
            Install <span className="font-medium">App</span>
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-[280px] mx-auto">
            Keep Cribxpert on your home screen for a faster, more seamless luxury experience.
          </p>
        </div>

        {/* iOS – always manual instructions */}
        {platform === 'ios' && (
          <div className="mb-8 space-y-4 bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 bg-white border border-neutral-100 text-primary rounded-full text-xs font-bold shadow-sm">1</span>
              <span className="text-sm text-neutral-600">Tap the <span className="font-medium">Share</span> button</span>
              <span className="ml-auto text-xl">📤</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 bg-white border border-neutral-100 text-primary rounded-full text-xs font-bold shadow-sm">2</span>
              <span className="text-sm text-neutral-600">Select <span className="font-medium">Add to Home Screen</span></span>
              <span className="ml-auto text-xl">➕</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-8 h-8 bg-white border border-neutral-100 text-primary rounded-full text-xs font-bold shadow-sm">3</span>
              <span className="text-sm text-neutral-600">Tap <span className="font-medium">Add</span> to install</span>
            </div>
          </div>
        )}

        {/* Android – native button if available, otherwise manual steps */}
        {platform === 'android' && (
          deferredPrompt ? (
            <button
              onClick={handleInstallClick}
              className="mb-4 w-full bg-primary text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold shadow-lg shadow-primary/20 hover:bg-neutral-900 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Install Application
            </button>
          ) : (
            <div className="mb-8 space-y-4 bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 bg-white border border-neutral-100 text-primary rounded-full text-xs font-bold shadow-sm">1</span>
                <span className="text-sm text-neutral-600">Tap the menu <span className="font-medium">(⋮)</span> icon</span>
                <span className="ml-auto text-xl">⋮</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 bg-white border border-neutral-100 text-primary rounded-full text-xs font-bold shadow-sm">2</span>
                <span className="text-sm text-neutral-600">Select <span className="font-medium">Install app</span></span>
                <span className="ml-auto text-xl">📲</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 bg-white border border-neutral-100 text-primary rounded-full text-xs font-bold shadow-sm">3</span>
                <span className="text-sm text-neutral-600">Confirm installation</span>
              </div>
            </div>
          )
        )}

        <div className="space-y-3">
          {platform === 'ios' && (
             <button
             onClick={handleDismiss}
             className="w-full bg-primary text-white py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold shadow-lg shadow-primary/20 hover:bg-neutral-900 transition-all hover:-translate-y-0.5 active:translate-y-0"
           >
             Got it
           </button>
          )}
          <button
            onClick={handleDismiss}
            className="w-full border border-neutral-100 text-neutral-400 py-3 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-50 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}