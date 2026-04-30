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
      const iosTimer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(iosTimer);
    } else {
      const handleBeforeInstallPrompt = (e: any) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        setDeferredPrompt(e);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      // If it's already installed, we shouldn't show it
      window.addEventListener("appinstalled", () => {
        setShowPrompt(false);
        setDeferredPrompt(null);
      });

      // Show the prompt UI after a short delay, even if beforeinstallprompt hasn't fired yet
      let androidTimer: NodeJS.Timeout;
      androidTimer = setTimeout(() => {
        setShowPrompt(true);
      }, 2500);

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        if (androidTimer) clearTimeout(androidTimer);
      };
    }
  }, []);

  const dismissPrompt = () => {
    setShowPrompt(false);
    // You can re-enable this later if you want to remember dismissals
    // localStorage.setItem('pwaPromptDismissed', 'true');
  };

  const handleInstallClick = async () => {
    if (isIOS) return; // iOS doesn't have an install API, uses instructions instead

    if (!deferredPrompt) {
      // Fallback if beforeinstallprompt hasn't fired but user clicked Install
      alert("To install SmatPay, tap your browser's menu (⋮) and select 'Install app' or 'Add to Home screen'.");
      dismissPrompt();
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    if (outcome === 'accepted') {
      setShowPrompt(false); 
    } else {
      dismissPrompt();
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-[340px] rounded-[1.25rem] bg-white p-4 shadow-xl ring-1 ring-black/5">
      <button
        onClick={dismissPrompt}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex items-start gap-3 mb-3 mr-6">
        <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[0.8rem] bg-black overflow-hidden relative shadow-sm">
          <Image src="/smatpay.png" alt="SmatPay Logo" width={28} height={28} className="object-contain" />
        </div>
        <div className="flex flex-col pt-0.5">
          <h3 className="text-[15px] font-bold text-gray-900 mb-0.5 leading-tight">Install SmatPay App</h3>
          <p className="text-[13px] text-gray-500 leading-snug pr-2">
            {isIOS ? "Install this app on your iPhone or iPad for a better experience." : "Add SmatPay to your home screen for quick and easy access."}
          </p>
        </div>
      </div>

      {isIOS ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 p-3 border border-gray-100">
           <p className="text-[13px] text-gray-600 text-center font-medium flex flex-wrap items-center justify-center gap-1">
             Tap the <Share className="h-3.5 w-3.5 mx-1" /> Share button
             below and select <strong className="whitespace-nowrap text-gray-900">"Add to Home Screen"</strong>
           </p>
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#7C7AFF] py-2.5 text-[14px] font-bold text-white shadow-sm hover:bg-[#6664E6] transition-colors"
        >
          <Download className="h-4 w-4" />
          Install
        </button>
      )}
    </div>
  );
}
