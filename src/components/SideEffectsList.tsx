import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { DayProtocol } from '../types/chemo';
import { sideEffectsData } from '../data/regimensData';

interface SideEffectsListProps {
  days: DayProtocol[];
}

export const SideEffectsList: React.FC<SideEffectsListProps> = ({ days }) => {
  const uniqueDrugs = new Set<string>();

  days.forEach(day => {
    day.drugs.forEach(drug => {
      let key = '';
      if (drug.name.includes('5-FU') || drug.name.includes('Fluorouracil')) key = '5-FU';
      else if (drug.name.includes('Doxorubicin')) key = 'Doxorubicin';
      else if (drug.name.includes('Cyclophosphamide')) key = 'Cyclophosphamide';
      else if (drug.name.includes('Leucovorin')) key = 'Leucovorin';
      else if (drug.name.includes('Oxaliplatin')) key = 'Oxaliplatin';
      else if (drug.name.includes('Paclitaxel')) key = 'Paclitaxel';
      else if (drug.name.includes('Vincristine')) key = 'Vincristine';
      else if (drug.name.includes('Filgrastim')) key = 'Filgrastim';
      else if (drug.name.includes('Rituximab')) key = 'Rituximab';
      else if (drug.name.includes('Azacitidine')) key = 'Azacitidine';
      else if (drug.name.includes('Cytarabine')) key = 'Cytarabine';

      if (key && sideEffectsData[key]) {
        uniqueDrugs.add(key);
      }
    });
  });

  if (uniqueDrugs.size === 0) return null;

  return (
    <section id="safety-section" className="mt-8 page-break-avoid font-sarabun">
      <div className="border border-slate-200 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            การเฝ้าระวังอาการไม่พึงประสงค์จากยาเคมีบำบัดในสูตรนี้ (Adverse Drug Reaction Precautions)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {Array.from(uniqueDrugs).map(drugKey => (
            <div
              key={drugKey}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-start"
            >
              <div className="font-bold text-xs uppercase tracking-wider text-rose-800 mb-1">
                {drugKey}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {sideEffectsData[drugKey]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
