import React, { useState } from 'react';
import { Clock, Droplets, CheckSquare, ShieldAlert, HeartPulse, Pill, Info, Copy, Check, Percent } from 'lucide-react';
import { DayProtocol, Drug, RituximabConfig } from '../types/chemo';

interface DoseTableProps {
  days: DayProtocol[];
  bsa: number;
  actualDoses: Record<string, number>;
  onActualDoseChange: (drugId: string, value: number) => void;
  rituximabConfig: Record<string, RituximabConfig>;
  onRituximabConfigChange: (drugId: string, updates: Partial<RituximabConfig>) => void;
  onApplyDoseReduction: (percentage: number) => void;
  currentReduction: number;
}

export const DoseTable: React.FC<DoseTableProps> = ({
  days,
  bsa,
  actualDoses,
  onActualDoseChange,
  rituximabConfig,
  onRituximabConfigChange,
  onApplyDoseReduction,
  currentReduction,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    let summary = `CHEMOTHERAPY ORDER SUMMARY (รพ.สิชล)\nBSA: ${bsa.toFixed(2)} m² | Dose Level: ${currentReduction}%\n------------------------------------\n`;

    days.forEach(day => {
      if (day.dayLabel) summary += `[${day.dayLabel}]\n`;
      if (day.mainIV) summary += `Main IV: ${day.mainIV}\n`;
      if (day.premed) summary += `Premed: ${day.premed}\n`;

      summary += `รายการยา:\n`;
      day.drugs.forEach(d => {
        const dose = actualDoses[d.id] !== undefined ? actualDoses[d.id] : (d.isFixed ? d.dose : d.dose * bsa);
        const vol = d.conc > 0 ? (dose / d.conc).toFixed(2) : '-';
        const unit = d.doseUnit || 'mg';
        summary += ` - ${d.name}: Dose ${dose.toFixed(2)} ${unit} (ดูดยา ${vol} ${d.volUnit || 'ml'}) in ${d.fluid} (${d.admin.replace(/<[^>]*>?/gm, '')})\n`;
      });
      summary += `\n`;
    });

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="dose-section" className="space-y-8 font-sarabun">
      {/* Quick Action Ribbon with Purple-Blue Palette */}
      <div className="bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-blue-50/60 border border-indigo-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 no-print shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5 mr-1">
            <Percent className="w-3.5 h-3.5 text-purple-600" />
            ปรับสัดส่วนขนาดยา (Dose Level):
          </span>
          {[100, 85, 80, 75, 50].map(pct => {
            const isActive = currentReduction === pct;
            return (
              <button
                key={pct}
                type="button"
                onClick={() => onApplyDoseReduction(pct)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-transparent shadow-sm shadow-indigo-500/20'
                    : 'bg-white text-indigo-950 border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                {pct}% {pct === 100 ? '(Full)' : `(-${100 - pct}%)`}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          className="text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-900 flex items-center gap-1.5 transition-colors shadow-xs active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">คัดลอกคำสั่งยาเรียบร้อย</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-indigo-500" />
              <span>คัดลอกสรุปคำสั่งยา (สำหรับ EMR/HIS)</span>
            </>
          )}
        </button>
      </div>

      {days.map((day, dayIndex) => {
        return (
          <div key={`day-${dayIndex}`} className="page-break-avoid">
            {/* Day Title */}
            {day.dayLabel && (
              <div className="mb-4">
                <span className="text-base sm:text-lg font-bold text-indigo-950 bg-gradient-to-r from-purple-100/70 to-blue-100/60 border border-indigo-200/80 px-4 py-2 rounded-2xl inline-flex items-center shadow-xs">
                  {day.dayLabel}
                </span>
              </div>
            )}

            {/* Day 1 Checklist / Orders */}
            {day.day1OrdersHtml && (
              <details className="mb-4 group border border-teal-200/80 rounded-2xl bg-white shadow-xs overflow-hidden page-break-avoid">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 bg-teal-50/70 text-teal-950 hover:bg-teal-100/70 transition-colors text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-teal-600" />
                    <span>คำสั่งการตรวจทางห้องปฏิบัติการ และ การเตรียมผู้ป่วย (DAY 1 Order Checklist)</span>
                  </span>
                  <span className="text-xs font-semibold text-teal-700 bg-white px-2.5 py-0.5 rounded-lg border border-teal-200">
                    คลิกเพื่อเปิดดู
                  </span>
                </summary>
                <div className="p-4 md:p-5 border-t border-teal-100 text-xs text-slate-700 leading-relaxed bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {day.day1OrdersHtml.split(',').map((item, idx) => (
                      <label key={idx} className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 cursor-pointer p-1 rounded-lg hover:bg-slate-50">
                        <input type="checkbox" defaultChecked={idx < 4} className="rounded text-teal-600 focus:ring-teal-500 h-3.5 w-3.5" />
                        <span>{item.replace('D1 Checklist:', '').trim()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </details>
            )}

            {/* Pre-medication box */}
            {day.premed && (
              <div className="mb-4 p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl text-amber-950 text-xs sm:text-sm shadow-xs">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="text-amber-900 font-bold block mb-0.5">
                      Pre-medication (ยาเตรียมความพร้อมก่อนให้ยาเคมีบำบัด):
                    </strong>
                    <div className="text-amber-900 leading-relaxed">
                      {day.premed}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main IV Fluid */}
            {day.mainIV && (
              <div className="mb-4 p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-2xl text-blue-950 text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong className="text-blue-900">สารน้ำหลัก (Main IV Fluid):</strong> {day.mainIV}
                </span>
              </div>
            )}

            {/* Monitoring instructions */}
            {day.monitor && (
              <div className="mb-4 p-4 bg-indigo-50/50 border border-indigo-200/80 rounded-2xl text-indigo-950 text-xs sm:text-sm shadow-xs">
                <div className="flex items-start gap-2.5">
                  <HeartPulse className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="text-indigo-900 font-bold block mb-0.5">
                      การติดตามอาการและการตรวจ (Monitoring):
                    </strong>
                    <div className="text-indigo-900 leading-relaxed whitespace-pre-line">
                      {day.monitor}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Supportive / Oral Medications */}
            {day.medication && (
              <div className="mb-4 p-4 bg-purple-50/40 border border-purple-200/80 rounded-2xl text-purple-950 text-xs sm:text-sm shadow-xs">
                <div className="flex items-start gap-2.5">
                  <Pill className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <strong className="text-purple-900 font-bold block mb-0.5">
                      ยารับประทาน / ยาประคับประคอง (Supportive Medication):
                    </strong>
                    <div className="text-purple-900 leading-relaxed whitespace-pre-line">
                      {day.medication}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chemotherapy Drugs Table */}
            <div className="overflow-x-auto border border-indigo-100 rounded-2xl bg-white shadow-xs mb-6">
              <table className="min-w-full text-left text-xs sm:text-sm divide-y divide-indigo-50">
                <thead className="bg-gradient-to-r from-purple-50/60 to-blue-50/60 text-slate-800 font-bold text-[11px] sm:text-xs">
                  <tr>
                    <th className="py-4 px-4 min-w-[200px]">
                      ชื่อยาเคมีบำบัด & ขนาดยาตาม Protocol
                    </th>
                    <th className="py-4 px-3 text-center bg-slate-50/60 min-w-[110px]">
                      ขนาดยาตาม BSA
                      <span className="block text-[10px] font-normal text-slate-500">(อ้างอิง)</span>
                    </th>
                    <th className="py-4 px-4 text-center bg-purple-50/40 text-purple-950 min-w-[160px]">
                      ขนาดยาที่ใช้จริง (Actual Dose)
                      <span className="block text-[10px] font-normal text-purple-600 font-medium">
                        (ปรับแก้ตัวเลขได้อิสระ)
                      </span>
                    </th>
                    <th className="py-4 px-4 text-center bg-rose-50/40 text-rose-900 min-w-[140px]">
                      ต้องดูดยา (Volume)
                      <span className="block text-[10px] font-normal text-rose-500">
                        (คำนวณอัตโนมัติ)
                      </span>
                    </th>
                    <th className="py-4 px-3 min-w-[130px]">
                      สารน้ำผสม
                      <span className="block text-[10px] font-normal text-slate-500">(Diluent)</span>
                    </th>
                    <th className="py-4 px-4 min-w-[180px]">
                      วิธีการบริหารยา & ข้อควรระวัง
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 font-normal">
                  {day.drugs.map((drug) => {
                    const isRtx = drug.id.includes('rtx');
                    const rtxCfg = rituximabConfig[drug.id] || { baseDose: 375, nssVolume: 500, cycleType: 'first' };

                    let baseDoseVal = drug.dose;
                    if (isRtx) {
                      baseDoseVal = rtxCfg.baseDose;
                    }

                    let calcDose = drug.isFixed ? baseDoseVal : baseDoseVal * bsa;
                    let isCapped = false;

                    if (drug.maxDose && calcDose > drug.maxDose) {
                      calcDose = drug.maxDose;
                      isCapped = true;
                    }

                    const actualDoseVal = actualDoses[drug.id] !== undefined ? actualDoses[drug.id] : calcDose;
                    const unit = drug.doseUnit || drug.unit || 'mg';
                    const volUnit = drug.volUnit || (drug.isOral ? 'เม็ดต่อวัน' : 'ml');
                    const calculatedVol = drug.conc > 0 ? (actualDoseVal / drug.conc) : 0;

                    return (
                      <React.Fragment key={drug.id}>
                        <tr className="hover:bg-purple-50/20 transition-colors">
                          {/* Drug Name & Protocol Dose */}
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-slate-900 text-sm sm:text-base">{drug.name}</div>
                            {isRtx ? (
                              <div className="mt-1.5 flex flex-col gap-1 text-xs">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`rtx-dose-${drug.id}`}
                                    checked={rtxCfg.baseDose === 375}
                                    onChange={() => onRituximabConfigChange(drug.id, { baseDose: 375 })}
                                    className="text-purple-600 h-3.5 w-3.5"
                                  />
                                  <span className="ml-1.5 font-semibold text-slate-700">375 mg/m²</span>
                                </label>
                                <label className="inline-flex items-center cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`rtx-dose-${drug.id}`}
                                    checked={rtxCfg.baseDose === 500}
                                    onChange={() => onRituximabConfigChange(drug.id, { baseDose: 500 })}
                                    className="text-purple-600 h-3.5 w-3.5"
                                  />
                                  <span className="ml-1.5 font-semibold text-slate-700">500 mg/m²</span>
                                </label>
                              </div>
                            ) : (
                              <div className="text-xs text-slate-500 mt-0.5">
                                {drug.displayDose || (drug.isFixed ? '(Fix dose)' : `${drug.dose} ${unit}/m²`)}
                              </div>
                            )}
                          </td>

                          {/* BSA Calculated Reference Dose */}
                          <td className="py-4 px-3 text-center bg-slate-50/40 align-top">
                            {drug.noCalc ? (
                              <span className="text-slate-400 font-medium">-</span>
                            ) : (
                              <div>
                                <span className="font-extrabold text-slate-800 text-base sm:text-lg tracking-tight">
                                  {calcDose.toFixed(2)}
                                </span>
                                <span className="text-xs font-semibold text-slate-500 ml-1">{unit}</span>
                                {isCapped && (
                                  <div className="text-[10px] text-rose-600 font-bold mt-1 bg-rose-50 rounded px-1.5 py-0.5 border border-rose-100">
                                    Capped max {drug.maxDose} mg
                                  </div>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Actual Dose (Editable) with Gorgeous Rounded Input */}
                          <td className="py-4 px-4 text-center bg-purple-50/20 align-top border-x border-indigo-50">
                            {drug.noCalc ? (
                              <div className="inline-block bg-purple-50 text-purple-900 font-bold px-3 py-1.5 rounded-xl border border-purple-200 text-xs">
                                {drug.fixedActual || 'Fixed'}
                              </div>
                            ) : drug.options ? (
                              <div className="flex items-center justify-center gap-1.5">
                                <select
                                  value={actualDoseVal}
                                  onChange={e => onActualDoseChange(drug.id, parseFloat(e.target.value))}
                                  className="font-bold text-base text-purple-950 bg-white border-2 border-purple-200 hover:border-purple-400 rounded-xl py-1.5 px-3 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-600 shadow-sm cursor-pointer transition-all"
                                >
                                  {drug.options.map(opt => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-xs font-bold text-purple-700">{unit}</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-1.5">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={isNaN(actualDoseVal) ? '' : actualDoseVal}
                                  onChange={e => onActualDoseChange(drug.id, e.target.value === '' ? 0 : parseFloat(e.target.value))}
                                  className="w-28 text-center font-extrabold text-base sm:text-lg text-purple-950 bg-white border-2 border-purple-200 hover:border-purple-400 rounded-xl py-2 px-2 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-600 shadow-sm transition-all tracking-tight"
                                />
                                <span className="text-xs font-bold text-purple-700">{unit}</span>
                              </div>
                            )}
                          </td>

                          {/* Required Volume To Draw */}
                          <td className="py-4 px-4 text-center bg-rose-50/30 align-top border-r border-indigo-50">
                            {drug.noCalc ? (
                              <div>
                                <div className="text-base font-bold text-rose-700">
                                  {drug.fixedVol}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  อ้างอิง {drug.concLabel}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="text-lg sm:text-xl font-black text-rose-700 tracking-tight">
                                  {calculatedVol.toFixed(2)}
                                  <span className="text-xs font-bold text-rose-600 ml-1">
                                    {volUnit}
                                  </span>
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  อ้างอิง {drug.concLabel}
                                </div>
                              </div>
                            )}
                          </td>

                          {/* Diluent */}
                          <td className="py-4 px-3 align-top">
                            <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-900 border border-indigo-100">
                              {drug.fluid}
                            </span>
                          </td>

                          {/* Administration */}
                          <td className="py-4 px-4 text-xs text-slate-700 align-top leading-relaxed">
                            <span dangerouslySetInnerHTML={{ __html: drug.admin }} />
                          </td>
                        </tr>

                        {/* Special Rituximab Infusion Rate Block */}
                        {isRtx && (
                          <tr className="bg-gradient-to-r from-purple-50/40 via-indigo-50/30 to-blue-50/40 border-b border-indigo-100">
                            <td colSpan={6} className="p-4 sm:p-5">
                              <RituximabRateCalculator
                                drugId={drug.id}
                                actualDose={actualDoseVal}
                                config={rtxCfg}
                                onConfigChange={updates => onRituximabConfigChange(drug.id, updates)}
                              />
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Advice / Special instructions under table */}
            {day.adviceHtml && (
              <details className="mt-4 group border border-indigo-100 rounded-2xl bg-white shadow-xs overflow-hidden page-break-avoid">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-4 bg-indigo-50/50 text-indigo-950 hover:bg-indigo-100/50 transition-colors text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-indigo-600" />
                    <span>คำแนะนำและการเฝ้าระวังสูตรยานี้ (Clinical Protocols & Guidelines)</span>
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 bg-white px-2.5 py-0.5 rounded-lg border border-indigo-200">
                    เปิดดูคำแนะนำ
                  </span>
                </summary>
                <div className="p-4 md:p-5 border-t border-indigo-100 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white">
                  <p className="whitespace-pre-line">{day.adviceHtml}</p>
                </div>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* Rituximab Infusion Rate Helper Component with Clean Font */
interface RituximabRateCalculatorProps {
  drugId: string;
  actualDose: number;
  config: RituximabConfig;
  onConfigChange: (updates: Partial<RituximabConfig>) => void;
}

const RituximabRateCalculator: React.FC<RituximabRateCalculatorProps> = ({
  actualDose,
  config,
  onConfigChange,
}) => {
  const drugVolume = actualDose > 0 ? actualDose / 10 : 0;
  const totalVolume = config.nssVolume + drugVolume;
  const concentration = totalVolume > 0 ? actualDose / totalVolume : 0;

  const firstRate1 = concentration > 0 ? (50 / concentration).toFixed(2) : '-';
  const firstRate2 = concentration > 0 ? (100 / concentration).toFixed(2) : '-';

  const subseqRate1 = (totalVolume * 0.2).toFixed(2);
  const subseqRate2 = ((totalVolume * 0.8) / 1.5).toFixed(2);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-100 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100 mb-4">
        <div className="font-bold text-indigo-950 flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-purple-600" />
          <span>อัตราการให้ยา Rituximab (Infusion Rate Schedule)</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* NSS volume choice */}
          <div className="flex items-center space-x-2 bg-purple-50/80 px-3 py-1 rounded-xl text-xs font-semibold border border-purple-100">
            <span className="text-purple-900">NSS:</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name={`nss-${config.nssVolume}`}
                checked={config.nssVolume === 250}
                onChange={() => onConfigChange({ nssVolume: 250 })}
                className="text-purple-600 h-3 w-3"
              />
              <span className="ml-1 text-purple-950 font-bold">250 mL</span>
            </label>
            <label className="inline-flex items-center cursor-pointer ml-1.5">
              <input
                type="radio"
                name={`nss-${config.nssVolume}`}
                checked={config.nssVolume === 500}
                onChange={() => onConfigChange({ nssVolume: 500 })}
                className="text-purple-600 h-3 w-3"
              />
              <span className="ml-1 text-purple-950 font-bold">500 mL</span>
            </label>
          </div>

          {/* Cycle type */}
          <div className="flex items-center space-x-2 bg-blue-50/80 px-3 py-1 rounded-xl text-xs font-semibold border border-blue-100">
            <span className="text-blue-900">รอบ:</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name={`cycle-${config.cycleType}`}
                checked={config.cycleType === 'first'}
                onChange={() => onConfigChange({ cycleType: 'first' })}
                className="text-blue-600 h-3 w-3"
              />
              <span className="ml-1 text-blue-950 font-bold">ครั้งแรก</span>
            </label>
            <label className="inline-flex items-center cursor-pointer ml-1.5">
              <input
                type="radio"
                name={`cycle-${config.cycleType}`}
                checked={config.cycleType === 'subsequent'}
                onChange={() => onConfigChange({ cycleType: 'subsequent' })}
                className="text-blue-600 h-3 w-3"
              />
              <span className="ml-1 text-blue-950 font-bold">ครั้งต่อไป</span>
            </label>
          </div>
        </div>
      </div>

      {/* Calculated Rates Display */}
      {config.cycleType === 'first' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-gradient-to-br from-purple-50/80 to-white p-4 rounded-xl border border-purple-100">
            <div className="text-xs font-bold text-purple-900 mb-1">
              ชั่วโมงที่ 1 (อัตราเป้าหมาย 50 mg/hr)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-950 tracking-tight">
              {firstRate1} <span className="text-xs font-normal text-purple-600">mL/hr</span>
            </div>
            <div className="text-[11px] text-purple-500 mt-1">เริ่มให้อัตราต่ำเพื่อเฝ้าระวัง Infusion reaction</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50/80 to-white p-4 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-900 mb-1">
              ชั่วโมงถัดไป (เพิ่มขนาดยาเป็น 100 mg/hr)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              {firstRate2} <span className="text-xs font-normal text-blue-600">mL/hr</span>
            </div>
            <div className="text-[11px] text-blue-500 mt-1">เพิ่มได้ทุก 30 นาที จนถึงอัตราสูงสุดไม่เกิน 400 mg/hr</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-gradient-to-br from-purple-50/80 to-white p-4 rounded-xl border border-purple-100">
            <div className="text-xs font-bold text-purple-900 mb-1">
              ชั่วโมงที่ 1 (20% ของปริมาตรรวม: {(totalVolume * 0.2).toFixed(1)} mL)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-950 tracking-tight">
              {subseqRate1} <span className="text-xs font-normal text-purple-600">mL/hr</span>
            </div>
            <div className="text-[11px] text-purple-500 mt-1">ดริป 20% ในชั่วโมงแรก</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50/80 to-white p-4 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-900 mb-1">
              1.5 ชั่วโมงที่เหลือ (80% ของปริมาตรรวม: {(totalVolume * 0.8).toFixed(1)} mL)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
              {subseqRate2} <span className="text-xs font-normal text-blue-600">mL/hr</span>
            </div>
            <div className="text-[11px] text-blue-500 mt-1">ดริปส่วนที่เหลือให้หมดภายใน 1.5 ชั่วโมง</div>
          </div>
        </div>
      )}

      <div className="text-xs text-indigo-400 mt-3 text-right">
        Total Volume = NSS ({config.nssVolume} mL) + ปริมาตรยา ({drugVolume.toFixed(2)} mL) = {totalVolume.toFixed(2)} mL
      </div>
    </div>
  );
};
