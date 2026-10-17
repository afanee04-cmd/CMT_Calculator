import React, { useState } from 'react';
import { User, Activity, ChevronDown, ChevronUp, UserCheck, Stethoscope, Sparkles, Scale, Info } from 'lucide-react';
import { PatientData } from '../types/chemo';

interface PatientDataFormProps {
  patientData: PatientData;
  setPatientData: React.Dispatch<React.SetStateAction<PatientData>>;
  bsa: number;
  rawBsa: number;
  bmi: number;
  crcl: number | null;
}

export const PatientDataForm: React.FC<PatientDataFormProps> = ({
  patientData,
  setPatientData,
  bsa,
  rawBsa,
  bmi,
  crcl,
}) => {
  const [showRawBsa, setShowRawBsa] = useState(false);
  const [crclOpen, setCrclOpen] = useState(true);
  const [demographicsOpen, setDemographicsOpen] = useState(false);

  const handleHeightChange = (val: number | '') => {
    setPatientData(prev => ({
      ...prev,
      height: val,
    }));
  };

  const handleWeightChange = (val: number | '') => {
    setPatientData(prev => {
      const newCrclWeight = prev.manualCrclWeight ? prev.crclWeight : val;
      return {
        ...prev,
        weight: val,
        crclWeight: newCrclWeight,
      };
    });
  };

  // BMI Category (Asian Criteria)
  const getBmiCategory = (val: number) => {
    if (val <= 0) return null;
    if (val < 18.5) return { label: 'น้ำหนักน้อยกว่าเกณฑ์ (Underweight)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (val < 23) return { label: 'น้ำหนักปกติ สมส่วน (Normal)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val < 25) return { label: 'น้ำหนักเกิน / ท้วม (Overweight)', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    return { label: 'ภาวะอ้วน (Obese)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  // CrCl Classification
  const getCrClCategory = (val: number | null) => {
    if (val === null) return null;
    if (val >= 90) return { label: 'การทำงานของไตปกติ (Normal, ≥90)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (val >= 60) return { label: 'ไตทำงานลดลงเล็กน้อย (Mild, 60-89)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (val >= 30) return { label: 'ไตทำงานลดลงปานกลาง (Moderate, 30-59)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (val >= 15) return { label: 'ไตทำงานลดลงรุนแรง (Severe, 15-29)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    return { label: 'ไตวายระยะสุดท้าย (End Stage, <15)', color: 'text-purple-700 bg-purple-50 border-purple-200' };
  };

  const bmiCat = getBmiCategory(bmi);
  const crclCat = getCrClCategory(crcl);

  return (
    <section id="patient-section" className="mb-10 page-break-avoid">
      <div className="flex flex-wrap items-center justify-between border-b border-indigo-100 pb-3 mb-6 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md shadow-indigo-500/20">
              01
            </span>
            <span>ข้อมูลสรีระผู้ป่วย & การคำนวณ (Anthropometrics & Renal Function)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ระบุส่วนสูงและน้ำหนักเพื่อคำนวณพื้นที่ผิวร่างกาย (BSA) และการทำงานของไต (CrCl) แบบ Real-time
          </p>
        </div>

        {/* Toggle Demographics for Hospital Medical Record */}
        <button
          type="button"
          onClick={() => setDemographicsOpen(!demographicsOpen)}
          className={`no-print text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            demographicsOpen
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-sm'
              : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-50/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>{demographicsOpen ? 'ซ่อนข้อมูล HN / แพทย์' : '+ ระบุชื่อ, HN, แพทย์ผู้สั่ง (สำหรับใบสั่งยา PDF)'}</span>
        </button>
      </div>

      {/* Patient Demographics Collapsible Drawer */}
      {demographicsOpen && (
        <div className="mb-6 p-5 bg-gradient-to-br from-purple-50/40 via-indigo-50/30 to-blue-50/40 border border-indigo-200/80 rounded-2xl no-print transition-all shadow-xs">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-indigo-950">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-600" />
              ข้อมูลเวชระเบียนผู้ป่วย (Chemotherapy Medical Record Identifiers)
            </span>
            <span className="text-[11px] font-normal text-indigo-700">ข้อมูลนี้จะปรากฏในหัวใบสั่งยา A4 เมื่อ Export เป็น PDF</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">ชื่อ - สกุล ผู้ป่วย</label>
              <input
                type="text"
                placeholder="เช่น นางมาลี มีสุข"
                value={patientData.patientName}
                onChange={e => setPatientData(prev => ({ ...prev, patientName: e.target.value }))}
                className="w-full border border-indigo-200 rounded-xl p-2.5 bg-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">เลขประจำตัวผู้ป่วย (HN)</label>
              <input
                type="text"
                placeholder="เช่น 67-009842"
                value={patientData.hn}
                onChange={e => setPatientData(prev => ({ ...prev, hn: e.target.value }))}
                className="w-full border border-indigo-200 rounded-xl p-2.5 bg-white text-sm font-semibold tracking-wide focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">การวินิจฉัย (Diagnosis)</label>
              <input
                type="text"
                placeholder="เช่น CA Breast (cT2N1M0)"
                value={patientData.diagnosis}
                onChange={e => setPatientData(prev => ({ ...prev, diagnosis: e.target.value }))}
                className="w-full border border-indigo-200 rounded-xl p-2.5 bg-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">รอบการรักษา (Cycle)</label>
              <input
                type="text"
                placeholder="เช่น Cycle 1 Day 1"
                value={patientData.cycle}
                onChange={e => setPatientData(prev => ({ ...prev, cycle: e.target.value }))}
                className="w-full border border-indigo-200 rounded-xl p-2.5 bg-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">วันที่ให้การรักษา</label>
              <input
                type="date"
                value={patientData.orderDate}
                onChange={e => setPatientData(prev => ({ ...prev, orderDate: e.target.value }))}
                className="w-full border border-indigo-200 rounded-xl p-2.5 bg-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">แพทย์ผู้สั่งการรักษา (Physician)</label>
              <input
                type="text"
                placeholder="เช่น นพ.ปิยะ วงศ์วาน"
                value={patientData.doctorName}
                onChange={e => setPatientData(prev => ({ ...prev, doctorName: e.target.value }))}
                className="w-full border border-indigo-200 rounded-xl p-2.5 bg-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">เภสัชกรผู้ตรวจสอบ</label>
              <input
                type="text"
                placeholder="เช่น ภญ.ปิยพร ขนอม"
                value={patientData.pharmacistName}
                onChange={e => setPatientData(prev => ({ ...prev, pharmacistName: e.target.value }))}
                className="w-full border border-indigo-200 rounded-xl p-2.5 bg-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Measurements Grid with Gorgeous Rounded Modern Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 no-print">
        {/* Height Input */}
        <div className="bg-white border-2 border-indigo-100/80 hover:border-purple-300 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>ส่วนสูง (Height)</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[150, 155, 160, 165, 170].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleHeightChange(val)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold transition-all active:scale-95"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type="number"
              id="height"
              value={patientData.height}
              onChange={e => handleHeightChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className="w-full text-3xl sm:text-4xl font-extrabold text-indigo-950 bg-slate-50/70 border-2 border-indigo-100 hover:border-purple-300 rounded-2xl py-3.5 px-4 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-center tracking-tight shadow-inner"
              placeholder="0.0"
              min="30"
              max="240"
              step="0.5"
            />
            <span className="absolute right-4 sm:right-6 text-sm font-bold text-indigo-400">
              cm
            </span>
          </div>
        </div>

        {/* Weight Input */}
        <div className="bg-white border-2 border-indigo-100/80 hover:border-blue-300 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>น้ำหนักตัว (Body Weight)</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[45, 50, 55, 60, 65, 70].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleWeightChange(val)}
                  className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold transition-all active:scale-95"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type="number"
              id="weight"
              value={patientData.weight}
              onChange={e => handleWeightChange(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className="w-full text-3xl sm:text-4xl font-extrabold text-indigo-950 bg-slate-50/70 border-2 border-indigo-100 hover:border-blue-300 rounded-2xl py-3.5 px-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-center tracking-tight shadow-inner"
              placeholder="0.0"
              min="2"
              max="250"
              step="0.1"
            />
            <span className="absolute right-4 sm:right-6 text-sm font-bold text-blue-400">
              kg
            </span>
          </div>
        </div>
      </div>

      {/* Primary Calculated Parameters: BSA & BMI */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* BSA Card with Modern Clean Font */}
        <div className="bg-gradient-to-br from-purple-50/90 via-white to-indigo-50/60 border-2 border-purple-200/80 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>พื้นที่ผิวร่างกาย (Body Surface Area: BSA)</span>
            </div>
            {bsa > 0 && (
              <button
                type="button"
                onClick={() => setShowRawBsa(!showRawBsa)}
                className="text-xs text-purple-700 hover:text-purple-900 bg-purple-100/80 px-2.5 py-1 rounded-lg font-semibold transition-colors"
              >
                {showRawBsa ? 'ปัด 2 ตำแหน่ง' : 'ดู 4 ตำแหน่ง'}
              </button>
            )}
          </div>

          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-purple-950 tracking-tight">
              {bsa > 0 ? bsa.toFixed(2) : '0.00'}
            </span>
            <span className="text-base font-bold text-purple-600">m²</span>

            {showRawBsa && bsa > 0 && (
              <span className="ml-2 text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-md">
                (raw: {rawBsa.toFixed(4)})
              </span>
            )}
          </div>

          <div className="text-xs text-purple-800 leading-normal flex items-center justify-between pt-3 border-t border-purple-100">
            <span>สูตร Mosteller: √((W × H) / 3600)</span>
            <span className="text-purple-700 font-semibold">ปัด 2 ตำแหน่งคำนวณโดสยา</span>
          </div>
        </div>

        {/* BMI Card with Modern Clean Font */}
        <div className="bg-gradient-to-br from-blue-50/90 via-white to-sky-50/60 border-2 border-blue-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              <span>ดัชนีมวลกาย (Body Mass Index: BMI)</span>
            </div>
            {bmiCat && (
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${bmiCat.color}`}>
                {bmiCat.label}
              </span>
            )}
          </div>

          <div className="my-3 flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-extrabold text-blue-950 tracking-tight">
              {bmi > 0 ? bmi.toFixed(2) : '0.00'}
            </span>
            <span className="text-base font-bold text-blue-600">kg/m²</span>
          </div>

          <div className="text-xs text-blue-800 leading-normal pt-3 border-t border-blue-100">
            <span>สูตร: น้ำหนัก (kg) / ส่วนสูง (ม.)²</span>
          </div>
        </div>
      </div>

      {/* CrCl Cockcroft-Gault Clinical Module */}
      <div className="mt-5 border-2 border-indigo-100 rounded-3xl bg-white shadow-sm overflow-hidden no-print">
        <button
          type="button"
          onClick={() => setCrclOpen(!crclOpen)}
          className="w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/60 hover:from-blue-100/70 hover:to-purple-100/70 transition-colors text-left border-b border-indigo-100"
        >
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-indigo-600" />
            <span className="text-sm sm:text-base font-bold text-indigo-950">
              การประเมินการทำงานของไต CrCl (Cockcroft-Gault Equation)
            </span>
            {crcl !== null && (
              <span className="ml-2 font-bold text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-0.5 rounded-full shadow-xs">
                {crcl.toFixed(2)} mL/min
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
            <span>{crclOpen ? 'ย่อหน้าต่าง' : 'เปิดหน้าต่างคำนวณ'}</span>
            {crclOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {crclOpen && (
          <div className="p-5 sm:p-6 bg-white">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">เพศกำเนิด</label>
                <select
                  value={patientData.sex}
                  onChange={e => setPatientData(prev => ({ ...prev, sex: e.target.value as 'male' | 'female' }))}
                  className="w-full border-2 border-indigo-100 rounded-xl p-2.5 text-sm font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="male">ชาย (Male)</option>
                  <option value="female">หญิง (Female × 0.85)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">อายุ (ปี)</label>
                <input
                  type="number"
                  placeholder="เช่น 60"
                  value={patientData.age}
                  onChange={e => setPatientData(prev => ({ ...prev, age: e.target.value === '' ? '' : parseFloat(e.target.value) }))}
                  className="w-full border-2 border-indigo-100 rounded-xl p-2.5 text-base font-bold text-center text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Serum Cr (mg/dL)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="เช่น 1.0"
                  value={patientData.scr}
                  onChange={e => setPatientData(prev => ({ ...prev, scr: e.target.value === '' ? '' : parseFloat(e.target.value) }))}
                  className="w-full border-2 border-indigo-100 rounded-xl p-2.5 text-base font-bold text-center text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">น้ำหนักที่ใช้คำนวณ (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="ดึงจากด้านบน"
                  value={patientData.crclWeight}
                  onChange={e => {
                    const val = e.target.value === '' ? '' : parseFloat(e.target.value);
                    setPatientData(prev => ({ ...prev, crclWeight: val, manualCrclWeight: true }));
                  }}
                  className="w-full border-2 border-indigo-100 rounded-xl p-2.5 text-base font-bold text-center text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-indigo-100 gap-4">
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-indigo-950 block mb-1">สูตรคำนวณ Cockcroft-Gault:</span>
                <span className="text-xs bg-white px-3 py-1.5 rounded-lg border border-indigo-200 inline-block text-indigo-950 font-bold tracking-tight">
                  CrCl = [ (140 - Age) × Weight ] / ( SCr × 72 ) {patientData.sex === 'female' ? '× 0.85' : ''}
                </span>
                {crclCat && (
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-slate-500">ผลการประเมิน:</span>
                    <span className={`font-bold px-2.5 py-0.5 rounded-lg border text-xs ${crclCat.color}`}>
                      {crclCat.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-white border-2 border-indigo-100 rounded-2xl p-4 sm:p-5 text-center min-w-[200px] shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-0.5">
                  Est. Creatinine Clearance
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-950 tracking-tight">
                  {crcl !== null ? crcl.toFixed(2) : '-'}
                  <span className="text-xs font-semibold text-indigo-500 ml-1.5">mL/min</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
