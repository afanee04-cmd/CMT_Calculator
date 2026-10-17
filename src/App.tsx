import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { PatientDataForm } from './components/PatientDataForm';
import { RegimenSelector } from './components/RegimenSelector';
import { DoseTable } from './components/DoseTable';
import { SideEffectsList } from './components/SideEffectsList';
import { PdfExportModal } from './components/PdfExportModal';
import { ChemoPdfDocument } from './components/ChemoPdfDocument';
import { FooterAndCredits } from './components/FooterAndCredits';
import { regimensData } from './data/regimensData';
import { PatientData, RituximabConfig } from './types/chemo';
import { FileText, Printer, Calculator, Sparkles } from 'lucide-react';

export default function App() {
  const [patientData, setPatientData] = useState<PatientData>({
    patientName: '',
    hn: '',
    age: '',
    sex: 'female',
    diagnosis: '',
    cycle: 'Cycle 1 Day 1',
    orderDate: new Date().toISOString().slice(0, 10),
    height: '',
    weight: '',
    scr: '',
    crclWeight: '',
    manualCrclWeight: false,
    doctorName: '',
    pharmacistName: '',
  });

  const [selectedRegimenId, setSelectedRegimenId] = useState<string>('');
  const [actualDoses, setActualDoses] = useState<Record<string, number>>({});
  const [rituximabConfig, setRituximabConfig] = useState<Record<string, RituximabConfig>>({});
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [doseReduction, setDoseReduction] = useState<number>(100);

  // BSA & BMI calculations (Mosteller formula)
  const { bsa, rawBsa, bmi } = useMemo(() => {
    const h = typeof patientData.height === 'number' ? patientData.height : parseFloat(patientData.height);
    const w = typeof patientData.weight === 'number' ? patientData.weight : parseFloat(patientData.weight);

    if (h > 0 && w > 0) {
      const raw = Math.sqrt((w * h) / 3600);
      const rounded = parseFloat(raw.toFixed(2));
      const calculatedBmi = parseFloat((w / Math.pow(h / 100, 2)).toFixed(2));
      return { bsa: rounded, rawBsa: raw, bmi: calculatedBmi };
    }

    return { bsa: 0, rawBsa: 0, bmi: 0 };
  }, [patientData.height, patientData.weight]);

  // CrCl calculation (Cockcroft-Gault)
  const crcl = useMemo(() => {
    const age = typeof patientData.age === 'number' ? patientData.age : parseFloat(patientData.age);
    const scr = typeof patientData.scr === 'number' ? patientData.scr : parseFloat(patientData.scr);
    const w = typeof patientData.crclWeight === 'number' ? patientData.crclWeight : parseFloat(patientData.crclWeight);

    if (age > 0 && scr > 0 && w > 0) {
      let val = ((140 - age) * w) / (scr * 72);
      if (patientData.sex === 'female') {
        val *= 0.85;
      }
      return parseFloat(val.toFixed(2));
    }
    return null;
  }, [patientData.age, patientData.scr, patientData.crclWeight, patientData.sex]);

  const selectedRegimen = useMemo(() => {
    return selectedRegimenId ? regimensData[selectedRegimenId] : null;
  }, [selectedRegimenId]);

  // Synchronize default actual doses when BSA, regimen, or dose reduction changes
  useEffect(() => {
    if (!selectedRegimen || bsa <= 0) return;

    setActualDoses(prevDoses => {
      const updated = { ...prevDoses };

      selectedRegimen.days.forEach(day => {
        day.drugs.forEach(drug => {
          if (updated[drug.id] === undefined) {
            const isRtx = drug.id.includes('rtx');
            const rtxBase = rituximabConfig[drug.id]?.baseDose || 375;
            const baseDose = isRtx ? rtxBase : drug.dose;

            let calc = drug.isFixed ? baseDose : baseDose * bsa * (doseReduction / 100);
            if (drug.maxDose && calc > drug.maxDose) {
              calc = drug.maxDose;
            }
            updated[drug.id] = parseFloat(calc.toFixed(2));
          }
        });
      });

      return updated;
    });
  }, [selectedRegimen, bsa, rituximabConfig, doseReduction]);

  // Reset actual dose when user changes regimen
  const handleSelectRegimen = (regimenId: string) => {
    setSelectedRegimenId(regimenId);
    setDoseReduction(100);

    if (!regimenId) {
      setActualDoses({});
      return;
    }

    const newRegimen = regimensData[regimenId];
    if (newRegimen && bsa > 0) {
      const initialDoses: Record<string, number> = {};
      newRegimen.days.forEach(day => {
        day.drugs.forEach(drug => {
          const isRtx = drug.id.includes('rtx');
          const rtxBase = 375;
          const baseDose = isRtx ? rtxBase : drug.dose;

          let calc = drug.isFixed ? baseDose : baseDose * bsa;
          if (drug.maxDose && calc > drug.maxDose) {
            calc = drug.maxDose;
          }
          initialDoses[drug.id] = parseFloat(calc.toFixed(2));
        });
      });
      setActualDoses(initialDoses);
    }
  };

  const handleApplyDoseReduction = (percentage: number) => {
    setDoseReduction(percentage);
    if (!selectedRegimen || bsa <= 0) return;

    const newDoses: Record<string, number> = {};
    selectedRegimen.days.forEach(day => {
      day.drugs.forEach(drug => {
        if (drug.noCalc) return;
        const isRtx = drug.id.includes('rtx');
        const rtxBase = rituximabConfig[drug.id]?.baseDose || 375;
        const baseDose = isRtx ? rtxBase : drug.dose;

        let calc = drug.isFixed ? baseDose : baseDose * bsa * (percentage / 100);
        if (drug.maxDose && calc > drug.maxDose) {
          calc = drug.maxDose;
        }
        newDoses[drug.id] = parseFloat(calc.toFixed(2));
      });
    });

    setActualDoses(prev => ({
      ...prev,
      ...newDoses,
    }));
  };

  const handleActualDoseChange = (drugId: string, value: number) => {
    setActualDoses(prev => ({
      ...prev,
      [drugId]: value,
    }));
  };

  const handleRituximabConfigChange = (drugId: string, updates: Partial<RituximabConfig>) => {
    setRituximabConfig(prev => {
      const current = prev[drugId] || { baseDose: 375, nssVolume: 500, cycleType: 'first' };
      const nextConfig = { ...current, ...updates };

      if (updates.baseDose !== undefined && bsa > 0) {
        const newDose = parseFloat((updates.baseDose * bsa * (doseReduction / 100)).toFixed(2));
        setActualDoses(doses => ({
          ...doses,
          [drugId]: newDose,
        }));
      }

      return {
        ...prev,
        [drugId]: nextConfig,
      };
    });
  };

  // One-click Sample Patient Load for testing and evaluation
  const handleLoadSample = () => {
    setPatientData({
      patientName: 'นางสมศรี จันทร์เพ็ญ',
      hn: '67-004521',
      age: 58,
      sex: 'female',
      diagnosis: 'Invasive Ductal Carcinoma Breast (Stage IIA)',
      cycle: 'Cycle 1 Day 1',
      orderDate: new Date().toISOString().slice(0, 10),
      height: 160,
      weight: 55,
      scr: 0.9,
      crclWeight: 55,
      manualCrclWeight: false,
      doctorName: 'นพ.วีระศักดิ์ ศรีวิชัย',
      pharmacistName: 'ภญ.ปิยพร ขนอม',
    });
    setSelectedRegimenId('fac');
    setDoseReduction(100);
  };

  const canExport = Boolean(bsa > 0 && selectedRegimen);

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 font-sans selection:bg-indigo-600 selection:text-white w-full max-w-full overflow-x-clip">
      {/* Top Header */}
      <Header
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        canExport={canExport}
        onLoadSample={handleLoadSample}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-8 md:p-10 print-shadow-none">
          {/* Section 1: ข้อมูลผู้ป่วย (Patient Anthropometrics & Renal Data) */}
          <PatientDataForm
            patientData={patientData}
            setPatientData={setPatientData}
            bsa={bsa}
            rawBsa={rawBsa}
            bmi={bmi}
            crcl={crcl}
          />

          {/* Section 2: เลือกสูตรยา (Regimen Selection) */}
          <RegimenSelector
            selectedRegimen={selectedRegimenId}
            onSelectRegimen={handleSelectRegimen}
          />

          {/* Section 3: ขนาดยาและการผสม (Dose & Administration) */}
          <section id="dose-section" className="mt-10 font-sarabun">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 mb-6 gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-bold shadow-sm">
                    03
                  </span>
                  <span>ขนาดยาและการบริหารยา (Chemotherapy Dosing & Administration)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  ปรับแก้ Actual Dose ได้อิสระ พร้อมระบบคำนวณปริมาตรยาและสารน้ำที่ต้องเตรียมอัตโนมัติ
                </p>
              </div>

              {canExport && (
                <div className="flex items-center gap-2 no-print">
                  <button
                    onClick={() => setIsPdfModalOpen(true)}
                    className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <FileText className="w-4 h-4 text-purple-200" />
                    <span>สร้างใบสั่งยา PDF (A4)</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-white hover:bg-slate-50 active:scale-95 text-indigo-950 text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-indigo-200 flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Printer className="w-4 h-4 text-indigo-500" />
                    <span>พิมพ์ใบสั่งยา</span>
                  </button>
                </div>
              )}
            </div>

            {canExport && selectedRegimen ? (
              <div>
                <DoseTable
                  days={selectedRegimen.days}
                  bsa={bsa}
                  actualDoses={actualDoses}
                  onActualDoseChange={handleActualDoseChange}
                  rituximabConfig={rituximabConfig}
                  onRituximabConfigChange={handleRituximabConfigChange}
                  onApplyDoseReduction={handleApplyDoseReduction}
                  currentReduction={doseReduction}
                />

                {/* Section 4: ผลข้างเคียง (Side Effects) */}
                <SideEffectsList days={selectedRegimen.days} />
              </div>
            ) : (
              /* Empty state before filling inputs */
              <div className="text-center py-16 px-6 bg-slate-50/70 rounded-2xl border border-dashed border-slate-300 mt-4">
                <div className="w-16 h-16 bg-white text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 shadow-sm">
                  <Calculator className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  กรุณากรอกส่วนสูง น้ำหนัก และเลือกสูตรยาเคมีบำบัด
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2 leading-relaxed">
                  ระบบจะคำนวณพื้นที่ผิวร่างกาย (BSA Mosteller), ขนาดยาตาม Protocol NCCN & DynaMed, ปริมาตรยาและสารน้ำที่ต้องดูด
                  พร้อมฟังก์ชันปรับสัดส่วนขนาดยา (Dose Level) และส่งออกใบสั่งยามาตรฐานโรงพยาบาลสิชลเป็น PDF
                </p>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>คลิกที่นี่เพื่อทดลองด้วยข้อมูลตัวอย่าง (Sample Patient)</span>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* References, Survey, and Sichon Hospital Credits */}
          <FooterAndCredits />
        </div>
      </main>

      {/* Floating Bottom Action Ribbon when ready */}
      {canExport && selectedRegimen && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-2rem)] bg-gradient-to-r from-[#18113c]/95 via-[#121942]/95 to-[#0c1e47]/95 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-2xl shadow-indigo-950/40 backdrop-blur-md border border-purple-500/30 flex items-center gap-3 sm:gap-4 no-print animate-slideUp">
          <div className="hidden sm:block text-xs">
            <span className="text-purple-300">สูตรยา: </span>
            <strong className="text-white font-bold">{selectedRegimen.title}</strong>
            <span className="mx-2 text-indigo-400/50">·</span>
            <span className="text-purple-300">BSA: </span>
            <strong className="text-emerald-400 font-extrabold tracking-tight">{bsa.toFixed(2)} m²</strong>
            <span className="mx-2 text-indigo-400/50">·</span>
            <span className="text-purple-300">ระดับโดส: </span>
            <strong className="text-sky-300 font-extrabold tracking-tight">{doseReduction}%</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-indigo-500/30 flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-purple-200" />
              <span>ส่งออก PDF / พิมพ์ใบสั่งยา</span>
            </button>
          </div>
        </div>
      )}

      {/* PDF Export & Preview Modal */}
      {selectedRegimen && (
        <PdfExportModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          patientData={patientData}
          regimen={selectedRegimen}
          bsa={bsa}
          rawBsa={rawBsa}
          bmi={bmi}
          crcl={crcl}
          actualDoses={actualDoses}
          rituximabConfig={rituximabConfig}
        />
      )}

      {/* Dedicated Clean Print View (Only visible during window.print()) */}
      {selectedRegimen && (
        <div className="hidden print:block print:w-full print:m-0">
          <ChemoPdfDocument
            patientData={patientData}
            regimen={selectedRegimen}
            bsa={bsa}
            rawBsa={rawBsa}
            bmi={bmi}
            crcl={crcl}
            actualDoses={actualDoses}
            rituximabConfig={rituximabConfig}
          />
        </div>
      )}
    </div>
  );
}
