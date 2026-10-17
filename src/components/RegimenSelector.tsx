import React, { useState, useMemo } from 'react';
import { ExternalLink, Search, Check, Sparkles } from 'lucide-react';
import { regimensData } from '../data/regimensData';

interface RegimenSelectorProps {
  selectedRegimen: string;
  onSelectRegimen: (regimenId: string) => void;
}

interface Category {
  id: string;
  label: string;
  regimenIds: string[];
}

const CATEGORIES: Category[] = [
  { id: 'all', label: 'ทั้งหมด (13 สูตร)', regimenIds: Object.keys(regimensData) },
  { id: 'breast', label: 'มะเร็งเต้านม (Breast)', regimenIds: ['fac', 'paclitaxel', 'ac'] },
  { id: 'gi', label: 'มะเร็งลำไส้ใหญ่ (GI / Colon)', regimenIds: ['folfox4', 'mfolfox6', 'degamonnt'] },
  { id: 'lymphoma', label: 'มะเร็งต่อมน้ำเหลือง (Lymphoma)', regimenIds: ['chop', 'rchop', 'minichop', 'cvp', 'rituximab'] },
  { id: 'heme', label: 'โลหิตวิทยา (Hematology / AML / MDS)', regimenIds: ['azacitidine', 'ldac'] },
];

export const RegimenSelector: React.FC<RegimenSelectorProps> = ({
  selectedRegimen,
  onSelectRegimen,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRegimens = useMemo(() => {
    const currentCat = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
    const q = searchQuery.toLowerCase().trim();

    return Object.values(regimensData).filter(regimen => {
      const inCategory = activeCategory === 'all' || currentCat.regimenIds.includes(regimen.id);
      if (!inCategory) return false;

      if (!q) return true;

      const titleMatch = regimen.title.toLowerCase().includes(q);
      const idMatch = regimen.id.toLowerCase().includes(q);
      const drugMatch = regimen.days.some(day =>
        day.drugs.some(d => d.name.toLowerCase().includes(q))
      );

      return titleMatch || idMatch || drugMatch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="regimen-section" className="mb-10 no-print font-sarabun">
      <div className="flex flex-wrap items-center justify-between border-b border-indigo-100 pb-3 mb-6 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-indigo-500/20">
              02
            </span>
            <span>เลือกสูตรยาเคมีบำบัด (Chemotherapy Regimen Selection)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            เลือกจาก 13 สูตรมาตรฐานของโรงพยาบาลสิชล หรือค้นหาด้วยชื่อยา เช่น Oxaliplatin, Doxorubicin, Rituximab
          </p>
        </div>

        <a
          href="https://docs.google.com/document/d/1Mznp8q3hCcILxEL9FRb7nH7q2t3fhH6CKzpq4FuXVtU/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-xl border border-purple-200 transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-purple-500" />
          <span>คู่มือสูตรยาเคมีบำบัด รพ.สิชล</span>
        </a>
      </div>

      {/* Category Segmented Tabs with Purple-Blue Active State */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4 p-1.5 bg-gradient-to-r from-purple-50/60 to-blue-50/60 rounded-2xl border border-indigo-100">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 hover:text-purple-900 hover:bg-white/60'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search Input Bar with Purple-Blue focus */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="ค้นหาสูตรยา หรือ ตัวยาเคมีบำบัด (เช่น FOLFOX, R-CHOP, 5-FU, Paclitaxel, Vincristine, Azacitidine)..."
          className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-white border border-indigo-100 hover:border-indigo-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-slate-400 shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-medium text-purple-500 hover:text-purple-700"
          >
            ล้างคำค้น
          </button>
        )}
      </div>

      {/* Regimen Cards Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredRegimens.map(regimen => {
          const isSelected = selectedRegimen === regimen.id;
          const drugNames = regimen.days.flatMap(d => d.drugs.map(drug => drug.name));
          const uniqueDrugs = Array.from(new Set(drugNames));

          return (
            <button
              key={regimen.id}
              type="button"
              onClick={() => onSelectRegimen(regimen.id)}
              className={`p-4 sm:p-5 rounded-2xl text-left border transition-all relative flex flex-col justify-between active:scale-[0.98] ${
                isSelected
                  ? 'bg-gradient-to-br from-[#18113c] via-[#121942] to-[#0c1e47] text-white border-purple-400/50 shadow-lg shadow-indigo-950/20 ring-2 ring-purple-500/30'
                  : 'bg-white text-slate-800 border-indigo-100 hover:border-purple-300 hover:bg-purple-50/20 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-sm sm:text-base font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {regimen.title}
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-sky-400 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className={`text-xs leading-relaxed line-clamp-2 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                  ตัวยา: {uniqueDrugs.join(', ')}
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-indigo-200/20 flex items-center justify-between text-[11px]">
                <span className={isSelected ? 'text-purple-200 font-mono' : 'text-slate-400 font-mono'}>
                  {regimen.days.length > 1 ? `${regimen.days.length} Days Protocol` : '1 Day Protocol'}
                </span>
                <span className={`font-semibold ${isSelected ? 'text-sky-300' : 'text-indigo-600'}`}>
                  {isSelected ? 'เลือกสูตรนี้อยู่' : 'เลือกสูตรนี้ →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {filteredRegimens.length === 0 && (
        <div className="p-8 text-center bg-purple-50/40 border border-purple-100 rounded-2xl text-slate-500 text-xs">
          ไม่พบสูตรยาที่ตรงกับคำค้นหา &ldquo;{searchQuery}&rdquo;
        </div>
      )}
    </section>
  );
};
