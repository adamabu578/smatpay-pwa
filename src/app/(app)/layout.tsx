import React from 'react';
import PwaInstallPrompt from '@/components/PwaInstallPrompt';

export default function MobileAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center sm:p-4">
      <div className="w-full h-full min-h-screen sm:min-h-0 sm:w-[400px] sm:h-[850px] sm:max-h-[95vh] bg-[#1E1544] sm:rounded-[3rem] sm:border-[8px] sm:border-gray-800 overflow-hidden relative shadow-2xl">
        <div className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar">
          {children}
        </div>
        <PwaInstallPrompt />
      </div>
    </div>
  );
}
