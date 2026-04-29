"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import Image from "next/image";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If it's already installed, we shouldn't show it (handled by browser usually, but good to be safe)
    window.addEventListener("appinstalled", () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    // Check if it's already in standalone mode (installed)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    // --- DEVELOPMENT ONLY: Show the prompt for UI testing ---
    let devTimer: NodeJS.Timeout;
    if (process.env.NODE_ENV === 'development') {
      devTimer = setTimeout(() => {
        setShowPrompt(true);
      }, 1000); // Show after 1 second in dev mode to let user see the design
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      if (devTimer) clearTimeout(devTimer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (process.env.NODE_ENV === 'development') {
        alert("The actual PWA installation prompt is disabled in development mode. To test the real installation flow, please run 'npm run build' and then 'npm run start'.");
        setShowPrompt(false);
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 z-50 mx-auto max-w-[368px] rounded-[1.5rem] bg-white p-5 shadow-2xl ring-1 ring-gray-900/5">
      <button
        onClick={() => setShowPrompt(false)}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex items-start gap-4 mb-5 mr-6">
        <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[0.8rem] bg-black overflow-hidden relative">
          <Image src="/smatpay.png" alt="SmatPay Logo" width={32} height={32} className="object-contain" />
        </div>
        <div className="flex flex-col pt-0.5">
          <h3 className="text-[17px] font-bold text-gray-900 mb-1 leading-tight">Install SmatPay App</h3>
          <p className="text-[14px] text-gray-500 leading-snug">Add SmatPay to your home screen for quick and easy access.</p>
        </div>
      </div>

      <button
        onClick={handleInstallClick}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] py-3.5 text-[16px] font-bold text-white shadow-sm hover:bg-[#ea580c] transition-colors"
      >
        <Download className="h-5 w-5" />
        Install
      </button>
    </div>
  );
}
