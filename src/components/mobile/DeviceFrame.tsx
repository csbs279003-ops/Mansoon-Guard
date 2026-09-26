import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export type DeviceType = 'iphone' | 'pixel' | 'tablet' | 'responsive';

interface Props {
  deviceType: DeviceType;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<Props> = ({ deviceType, children }) => {
  if (deviceType === 'responsive') {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl relative flex flex-col">
        {children}
      </div>
    );
  }

  if (deviceType === 'tablet') {
    return (
      <div className="w-[768px] h-[1024px] bg-slate-900 rounded-[48px] p-4 shadow-2xl ring-1 ring-slate-800 relative flex flex-col mx-auto select-none border-4 border-slate-700">
        {/* Tablet Top bezel with camera */}
        <div className="h-6 flex items-center justify-center relative">
          <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-700" />
        </div>

        {/* Tablet Screen */}
        <div className="flex-1 bg-slate-50 rounded-[32px] overflow-y-auto overflow-x-hidden relative flex flex-col shadow-inner">
          {children}
        </div>

        {/* Tablet Home Bar */}
        <div className="h-4 flex items-center justify-center">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>
    );
  }

  // iPhone 16 Pro default & Pixel
  const isPixel = deviceType === 'pixel';

  return (
    <div className={`relative mx-auto select-none shadow-2xl ${
      isPixel 
        ? 'w-[400px] h-[840px] bg-slate-900 rounded-[44px] p-3 border-4 border-slate-700' 
        : 'w-[393px] h-[852px] bg-slate-950 rounded-[52px] p-3.5 ring-1 ring-slate-800 border-4 border-slate-800'
    }`}>
      {/* Outer Side Buttons (Vol, Power) */}
      <div className="absolute -left-4.5 top-28 w-1 h-12 bg-slate-700 rounded-l-md" />
      <div className="absolute -left-4.5 top-44 w-1 h-12 bg-slate-700 rounded-l-md" />
      <div className="absolute -right-4.5 top-32 w-1 h-16 bg-slate-700 rounded-r-md" />

      {/* Screen Viewport */}
      <div className="w-full h-full bg-slate-50 rounded-[40px] overflow-y-auto overflow-x-hidden relative flex flex-col scrollbar-none">
        
        {/* Top iOS Status Bar + Dynamic Island */}
        <div className="sticky top-0 z-50 bg-slate-900 text-white px-7 pt-2.5 pb-1 flex items-center justify-between text-xs select-none">
          <span className="font-semibold text-[13px] tracking-tight">9:41</span>

          {/* Dynamic Island for iPhone or Punch hole for Pixel */}
          {isPixel ? (
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 mx-auto" />
          ) : (
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 mx-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-[#121b22]" />
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Screen Dynamic Body */}
        <div className="flex-1 flex flex-col relative">
          {children}
        </div>

        {/* Bottom iOS Home Indicator */}
        <div className="sticky bottom-0 z-50 w-full h-5 flex items-center justify-center pointer-events-none bg-gradient-to-t from-slate-100 to-transparent">
          <div className="w-32 h-1 bg-slate-400/80 rounded-full" />
        </div>
      </div>
    </div>
  );
};
