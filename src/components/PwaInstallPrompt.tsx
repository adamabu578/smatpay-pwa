"use client";

import { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";
import Image from "next/image";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check if it's already in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in window.navigator && (window.navigator as any).standalone === true);
    
    if (isStandalone) {
      setShowPrompt(false);
      return;
    }

    if (isIosDevice) {
      // For iOS, show the prompt after a short delay
      const hasDismissed = localStorage.getItem('pwaPromptDismissed');
      if (!hasDismissed) {
        const iosTimer = setTimeout(() => {
          setShowPrompt(true);
        }, 2000);
        return () => clearTimeout(iosTimer);
      }
    } else {
      const handleBeforeInstallPrompt = (e: any) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        setDeferredPrompt(e);
        // Update UI notify the user they can install the PWA
        const hasDismissed = localStorage.getItem('pwaPromptDismissed');
        if (!hasDismissed) {
          setShowPrompt(true);
        }
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      // If it's already installed, we shouldn't show it
      window.addEventListener("appinstalled", () => {
        setShowPrompt(false);
        setDeferredPrompt(null);
      });

      // --- DEVELOPMENT ONLY: Show the prompt for UI testing ---
      let devTimer: NodeJS.Timeout;
      if (process.env.NODE_ENV === 'development') {
        const hasDismissed = localStorage.getItem('pwaPromptDismissed');
        if (!hasDismissed) {
          devTimer = setTimeout(() => {
            setShowPrompt(true);
          }, 1000);
        }
      }

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        if (devTimer) clearTimeout(devTimer);
      };
    }
  }, []);

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isIOS) return; // iOS doesn't have an install API, uses instructions instead

    if (!deferredPrompt) {
      if (process.env.NODE_ENV === 'development') {
        alert("The actual PWA installation prompt is disabled in development mode. To test the real installation flow, please run 'npm run build' and then 'npm run start'.");
        dismissPrompt();
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    if (outcome === 'accepted') {
      setShowPrompt(false); // Don't save to localStorage if installed, so it handles properly based on state
    } else {
      dismissPrompt();
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[368px] rounded-[1.5rem] bg-[#1E1544] p-5 shadow-2xl ring-1 ring-white/10">
      <button
        onClick={dismissPrompt}
        className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex items-start gap-4 mb-5 mr-6">
        <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[0.8rem] bg-black overflow-hidden relative">
          <Image src="/smatpay.png" alt="SmatPay Logo" width={32} height={32} className="object-contain" />
        </div>
        <div className="flex flex-col pt-0.5">
          <h3 className="text-[17px] font-bold text-white mb-1 leading-tight">Install SmatPay App</h3>
          <p className="text-[14px] text-gray-300 leading-snug">
            {isIOS ? "Install this app on your iPhone or iPad for a better experience." : "Add SmatPay to your home screen for quick and easy access."}
          </p>
        </div>
      </div>

      {isIOS ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-4 border border-[#7C7AFF]/30">
           <p className="text-[14px] text-gray-200 text-center font-medium flex flex-wrap items-center justify-center gap-1">
             Tap the <Share className="h-4 w-4 mx-1" /> Share button
             below and select <strong className="whitespace-nowrap text-white">"Add to Home Screen"</strong>
           </p>
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C7AFF] py-3.5 text-[16px] font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
        >
          <Download className="h-5 w-5" />
          Install
        </button>
      )}
    </div>
  );
}
