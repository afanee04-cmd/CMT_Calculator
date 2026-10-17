import React from 'react';
import { FileText, Sparkles, ShieldCheck, HeartPulse } from 'lucide-react';

interface HeaderProps {
  onOpenPdfModal: () => void;
  canExport: boolean;
  onLoadSample: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPdfModal, canExport, onLoadSample }) => {
  return (
    <div className="w-full max-w-full overflow-x-clip">
      {/* Sticky Top Bar - constrained strictly within page boundaries */}
      <nav className="border-b border-indigo-100/70 bg-white/95 backdrop-blur-md sticky top-0 z-40 w-full no-print shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 md:gap-6 min-w-0">
          {/* Zone 1: Brand Wordmark (with truncation safety) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center font-bold text-xs sm:text-sm tracking-tight shadow-md shadow-indigo-500/20 shrink-0">
              SC
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 truncate flex items-center gap-1.5">
                <span>ChemoOrder</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-extrabold">
                  Sichon
                </span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 truncate hidden sm:block">
                โรงพยาบาลสิชล จังหวัดนครศรีธรรมราช
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Only shown on xl+ to prevent any navbar overflow) */}
          <div className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs font-semibold text-slate-600 shrink-0">
            <a href="#patient-section" className="hover:text-purple-600 transition-colors whitespace-nowrap">
              ข้อมูลสรีระผู้ป่วย & CrCl
            </a>
            <a href="#regimen-section" className="hover:text-indigo-600 transition-colors whitespace-nowrap">
              สูตรยาเคมีบำบัด (13 สูตร)
            </a>
            <a href="#dose-section" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              ตารางบริหารยา & คำนวณโดส
            </a>
            <a href="#safety-section" className="hover:text-purple-600 transition-colors whitespace-nowrap">
              ความปลอดภัย & เฝ้าระวัง
            </a>
          </div>

          {/* Zone 3: Primary Actions (Guaranteed to fit without pushing edges) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onLoadSample}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50/90 hover:bg-purple-100 rounded-xl border border-purple-200 transition-all whitespace-nowrap active:scale-95 shadow-xs"
              title="ใส่ข้อมูลตัวอย่างเพื่อทดสอบระบบทันที"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>ใส่ข้อมูลตัวอย่าง</span>
            </button>

            <button
              onClick={onOpenPdfModal}
              disabled={!canExport}
              className={`px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 shadow-md transition-all whitespace-nowrap ${
                canExport
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-indigo-500/25 active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none'
              }`}
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-200" />
              <span>
                <span className="hidden sm:inline">ออกใบสั่งยา & </span>Export PDF
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header with Luxurious Purple-to-Blue Palette */}
      <header className="relative bg-gradient-to-br from-[#120e2e] via-[#0d1538] to-[#091b38] text-white overflow-hidden p-6 sm:p-10 md:p-12 border-b border-indigo-950/60 shadow-inner">
        {/* Luminous Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mb-3 tracking-wide">
              <span className="bg-purple-900/40 text-purple-200 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                กลุ่มงานเภสัชกรรม
              </span>
              <span aria-hidden="true" className="text-purple-400/50">·</span>
              <span className="text-blue-200">งานบริบาลผู้ป่วยโรคมะเร็งและเคมีบำบัด</span>
              <span aria-hidden="true" className="text-purple-400/50">·</span>
              <span className="text-slate-300">โรงพยาบาลสิชล</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              โปรแกรมคำนวณขนาดยาเคมีบำบัด <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-sky-300 font-bold text-xl sm:text-2xl md:text-3xl block mt-1.5">
                ปรับแก้ขนาดยา (Actual Dose) เพื่อคำนวณปริมาตรอัตโนมัติ
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-300 mt-3.5 font-normal leading-relaxed max-w-2xl">
              คำนวณพื้นที่ผิวร่างกาย (BSA Mosteller), ดัชนีมวลกาย (BMI), และการทำงานของไต (CrCl Cockcroft-Gault)
              ปรับแก้ Actual Dose คำนวณปริมาตรยาและสารน้ำที่ต้องเตรียม พร้อม Export เป็นใบสั่งยามาตรฐานโรงพยาบาลสิชล
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>คำนวณตาม Protocol NCCN & DynaMed 2026</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <HeartPulse className="w-4 h-4 text-sky-400" />
                <span>คำนวณ Infusion Rate สำหรับ Rituximab อัตโนมัติ</span>
              </div>
            </div>
          </div>

          {/* Quick Stat / Status Strip with Purple-Blue Glow */}
          <div className="shrink-0 bg-white/5 border border-purple-500/20 rounded-2xl p-5 backdrop-blur-md flex flex-col gap-3.5 min-w-[270px] no-print shadow-xl shadow-purple-950/40">
            <div className="flex items-center justify-between text-xs text-slate-300 border-b border-white/10 pb-2.5">
              <span className="font-medium text-slate-300">สถานะระบบ</span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-sky-300 flex items-center gap-1">
                พร้อมใช้งาน 13 สูตรยา
              </span>
            </div>
            <div className="text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">สูตรยาครอบคลุม:</span>
                <span className="font-semibold text-white">เต้านม, ลำไส้, มะเร็งต่อมน้ำเหลือง</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">การส่งออก:</span>
                <span className="font-semibold text-white">PDF ดาวน์โหลด & พิมพ์ A4</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onLoadSample}
              className="mt-1 w-full py-2.5 px-3 text-xs font-bold bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600 active:scale-95 text-white rounded-xl transition-all border border-purple-400/30 text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ทดลองโหลดข้อมูลตัวอย่าง (Sample)</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
