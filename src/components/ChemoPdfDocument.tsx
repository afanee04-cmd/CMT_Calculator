import React from 'react';
import { PatientData, RegimenDefinition, RituximabConfig } from '../types/chemo';

interface ChemoPdfDocumentProps {
  patientData: PatientData;
  regimen: RegimenDefinition;
  bsa: number;
  rawBsa: number;
  bmi: number;
  crcl: number | null;
  actualDoses: Record<string, number>;
  rituximabConfig: Record<string, RituximabConfig>;
}

export const ChemoPdfDocument = React.forwardRef<HTMLDivElement, ChemoPdfDocumentProps>(
  (
    {
      patientData,
      regimen,
      bsa,
      rawBsa,
      bmi,
      crcl,
      actualDoses,
      rituximabConfig,
    },
    ref
  ) => {
    const formattedDate = patientData.orderDate
      ? new Date(patientData.orderDate).toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : new Date().toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

    return (
      <div
        ref={ref}
        id="chemo-pdf-document"
        className="bg-white text-gray-900 p-8 max-w-[210mm] mx-auto text-sm leading-normal border border-gray-300 shadow-sm print:border-none print:p-2 print:shadow-none"
        style={{ fontFamily: "'Sarabun', sans-serif" }}
      >
        {/* Hospital Official Header */}
        <div className="border-b-2 border-indigo-900 pb-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
                SC
              </div>
              <div>
                <h1 className="text-xl font-bold text-indigo-950 tracking-tight">
                  โรงพยาบาลสิชล (Sichon Hospital)
                </h1>
                <p className="text-xs text-gray-600">
                  กลุ่มงานเภสัชกรรม • งานบริบาลเภสัชกรรมผู้ป่วยโรคมะเร็งและยาเคมีบำบัด
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-indigo-900 text-white text-xs font-bold px-2.5 py-1 rounded">
                CHEMOTHERAPY ORDER SHEET
              </span>
              <p className="text-[11px] text-gray-500 mt-1">วันที่พิมพ์: {formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Patient Demographics & Anthro Bar */}
        <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 mb-4 text-xs">
          <div className="grid grid-cols-4 gap-x-4 gap-y-2">
            <div>
              <span className="text-gray-500">ชื่อ - สกุล: </span>
              <strong className="text-gray-900 text-sm">
                {patientData.patientName || '...................................................'}
              </strong>
            </div>
            <div>
              <span className="text-gray-500">HN: </span>
              <strong className="text-gray-900 text-sm">
                {patientData.hn || '.......................'}
              </strong>
            </div>
            <div>
              <span className="text-gray-500">เพศ/อายุ: </span>
              <strong className="text-gray-900">
                {patientData.sex === 'female' ? 'หญิง' : 'ชาย'}{' '}
                {patientData.age ? `${patientData.age} ปี` : ''}
              </strong>
            </div>
            <div>
              <span className="text-gray-500">วันที่ให้ยา: </span>
              <strong className="text-gray-900">{formattedDate}</strong>
            </div>

            <div>
              <span className="text-gray-500">การวินิจฉัย (Diagnosis): </span>
              <strong className="text-gray-900">{patientData.diagnosis || '-'}</strong>
            </div>
            <div>
              <span className="text-gray-500">สูตรเคมีบำบัด: </span>
              <strong className="text-indigo-900 font-bold">{regimen.title}</strong>
            </div>
            <div>
              <span className="text-gray-500">รอบที่ (Cycle): </span>
              <strong className="text-gray-900">{patientData.cycle || 'Cycle 1'}</strong>
            </div>
            <div>
              <span className="text-gray-500">แพทย์ผู้สั่งยา: </span>
              <strong className="text-gray-900">{patientData.doctorName || '-'}</strong>
            </div>
          </div>

          {/* Anthro measurements & Calculated values */}
          <div className="mt-2.5 pt-2 border-t border-slate-200 grid grid-cols-5 gap-2 text-center bg-white p-2 rounded border border-slate-200">
            <div>
              <div className="text-[10px] text-gray-500">ส่วนสูง</div>
              <div className="font-bold text-gray-800">{patientData.height || '-'} cm</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500">น้ำหนัก</div>
              <div className="font-bold text-gray-800">{patientData.weight || '-'} kg</div>
            </div>
            <div className="bg-indigo-50/70 rounded">
              <div className="text-[10px] text-indigo-700 font-semibold">BSA (คำนวณ)</div>
              <div className="font-bold text-indigo-900 text-sm">
                {bsa > 0 ? bsa.toFixed(2) : '-'} m²
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500">BMI</div>
              <div className="font-bold text-gray-800">
                {bmi > 0 ? bmi.toFixed(2) : '-'} kg/m²
              </div>
            </div>
            <div className="bg-sky-50/70 rounded">
              <div className="text-[10px] text-sky-700 font-semibold">CrCl (Cockcroft-Gault)</div>
              <div className="font-bold text-sky-900">
                {crcl !== null ? `${crcl.toFixed(2)} mL/min` : '-'}
              </div>
            </div>
          </div>
        </div>

        {/* Days & Orders */}
        {regimen.days.map((day, dIdx) => (
          <div key={`pdf-day-${dIdx}`} className="mb-5 page-break-avoid">
            {day.dayLabel && (
              <div className="text-sm font-bold text-indigo-900 bg-indigo-100/60 px-3 py-1 rounded border-l-4 border-indigo-700 mb-2">
                {day.dayLabel}
              </div>
            )}

            {/* Premed & Main IV summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 text-xs">
              {day.premed && (
                <div className="p-2 bg-amber-50/80 border border-amber-200 rounded">
                  <strong className="text-amber-900">Pre-medication: </strong>
                  <span className="text-amber-950">{day.premed}</span>
                </div>
              )}
              {day.mainIV && (
                <div className="p-2 bg-emerald-50/80 border border-emerald-200 rounded">
                  <strong className="text-emerald-900">สารน้ำหลัก: </strong>
                  <span className="text-emerald-950">{day.mainIV}</span>
                </div>
              )}
            </div>

            {/* Chemotherapy Orders Table */}
            <table className="w-full border-collapse border border-gray-400 text-xs mb-3">
              <thead>
                <tr className="bg-gray-100 text-gray-900 font-bold border-b border-gray-400">
                  <th className="border border-gray-300 p-2 text-left">รายการยาเคมีบำบัด</th>
                  <th className="border border-gray-300 p-2 text-center w-20">ขนาดตาม BSA</th>
                  <th className="border border-gray-300 p-2 text-center w-24 bg-indigo-50 text-indigo-900">
                    ขนาดยาที่ใช้จริง (Actual Dose)
                  </th>
                  <th className="border border-gray-300 p-2 text-center w-24 bg-rose-50 text-rose-900">
                    ต้องดูดยา (Volume)
                  </th>
                  <th className="border border-gray-300 p-2 text-left w-24">สารน้ำผสม</th>
                  <th className="border border-gray-300 p-2 text-left">วิธีบริหารยา & เวลา</th>
                  <th className="border border-gray-300 p-2 text-center w-14">Check ภก.</th>
                  <th className="border border-gray-300 p-2 text-center w-14">RN Double</th>
                </tr>
              </thead>
              <tbody>
                {day.drugs.map((drug) => {
                  const isRtx = drug.id.includes('rtx');
                  const rtxCfg = rituximabConfig[drug.id] || { baseDose: 375, nssVolume: 500, cycleType: 'first' };
                  const baseDoseVal = isRtx ? rtxCfg.baseDose : drug.dose;
                  let calcDose = drug.isFixed ? baseDoseVal : baseDoseVal * bsa;
                  if (drug.maxDose && calcDose > drug.maxDose) {
                    calcDose = drug.maxDose;
                  }

                  const actualDoseVal =
                    actualDoses[drug.id] !== undefined ? actualDoses[drug.id] : calcDose;
                  const unit = drug.doseUnit || drug.unit || 'mg';
                  const volUnit = drug.volUnit || (drug.isOral ? 'เม็ด' : 'ml');
                  const vol = drug.conc > 0 ? actualDoseVal / drug.conc : 0;

                  return (
                    <tr key={`pdf-drug-${drug.id}`} className="border-b border-gray-300">
                      <td className="border border-gray-300 p-2 font-medium">
                        <div className="font-bold text-gray-900">{drug.name}</div>
                        <div className="text-[10px] text-gray-500">
                          {drug.displayDose || (drug.isFixed ? 'Fixed dose' : `${drug.dose} ${unit}/m²`)}
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {drug.noCalc ? '-' : `${calcDose.toFixed(2)} ${unit}`}
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-indigo-50 font-bold text-indigo-950">
                        {drug.noCalc ? drug.fixedActual : `${actualDoseVal.toFixed(2)} ${unit}`}
                      </td>
                      <td className="border border-gray-300 p-2 text-center bg-rose-50 font-bold text-rose-900">
                        {drug.noCalc ? drug.fixedVol : `${vol.toFixed(2)} ${volUnit}`}
                      </td>
                      <td className="border border-gray-300 p-2">{drug.fluid}</td>
                      <td className="border border-gray-300 p-2 text-[11px] leading-tight">
                        <span dangerouslySetInnerHTML={{ __html: drug.admin }} />
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="w-4 h-4 border border-gray-400 rounded mx-auto" />
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <div className="w-4 h-4 border border-gray-400 rounded mx-auto" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Special Rituximab Table for PDF if present */}
            {day.drugs.some((d) => d.id.includes('rtx')) && (
              <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg mb-3 text-xs">
                <strong className="text-indigo-950 block mb-1">
                  อัตราการให้ยา Rituximab (Infusion Rate Schedule):
                </strong>
                {(() => {
                  const rtxDrug = day.drugs.find((d) => d.id.includes('rtx'));
                  if (!rtxDrug) return null;
                  const cfg = rituximabConfig[rtxDrug.id] || { baseDose: 375, nssVolume: 500, cycleType: 'first' };
                  const actual = actualDoses[rtxDrug.id] !== undefined ? actualDoses[rtxDrug.id] : cfg.baseDose * bsa;
                  const drugVol = actual / 10;
                  const totalVol = cfg.nssVolume + drugVol;
                  const concentration = actual / totalVol;

                  if (cfg.cycleType === 'first') {
                    const r1 = (50 / concentration).toFixed(1);
                    const r2 = (100 / concentration).toFixed(1);
                    return (
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-white p-2 rounded border border-indigo-200">
                          ชั่วโมงที่ 1 (50 mg/hr): <strong>{r1} mL/hr</strong>
                        </div>
                        <div className="bg-white p-2 rounded border border-indigo-200">
                          ชั่วโมงที่ 2+ (100 mg/hr): <strong>{r2} mL/hr</strong>
                        </div>
                      </div>
                    );
                  } else {
                    const r1 = (totalVol * 0.2).toFixed(1);
                    const r2 = ((totalVol * 0.8) / 1.5).toFixed(1);
                    return (
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-white p-2 rounded border border-purple-200">
                          ชั่วโมงที่ 1 (20% ของ {totalVol.toFixed(1)} mL): <strong>{r1} mL/hr</strong>
                        </div>
                        <div className="bg-white p-2 rounded border border-purple-200">
                          1.5 ชั่วโมงถัดไป (80% ของ {totalVol.toFixed(1)} mL): <strong>{r2} mL/hr</strong>
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            )}

            {/* Monitoring & Supportive Care */}
            {(day.monitor || day.medication) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] mb-3">
                {day.monitor && (
                  <div className="p-2 border border-slate-200 bg-slate-50 rounded">
                    <strong>การติดตามอาการ (Monitoring):</strong>
                    <div className="text-gray-700 whitespace-pre-line mt-0.5">{day.monitor}</div>
                  </div>
                )}
                {day.medication && (
                  <div className="p-2 border border-slate-200 bg-slate-50 rounded">
                    <strong>ยารับประทานกลับบ้าน (Home/Supportive Meds):</strong>
                    <div className="text-gray-700 whitespace-pre-line mt-0.5">{day.medication}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Safety & Verification Checklist */}
        <div className="mt-4 p-2.5 border border-dashed border-gray-400 rounded-lg text-[10px] text-gray-700 leading-relaxed page-break-avoid">
          <strong>* ข้อกำหนดความปลอดภัยในการบริหารยาเคมีบำบัด (Chemotherapy Safety Standard):</strong>
          <br />
          1. พยาบาลต้องทำ Independent Double Check ข้อมูลผู้ป่วย ชนิดยา ขนาดยา สารน้ำ อัตราการให้ยา และวันหมดอายุ ร่วมกัน 2 คน ก่อนเริ่มให้ยาทุกครั้ง
          <br />
          2. ตรวจสอบการทำงานของหลอดเลือดดำ (IV patency) ก่อนให้ยา และเฝ้าระวังยาที่มีคุณสมบัติ Vesicant อย่างใกล้ชิด หากมีอาการปวด บวม แดง ให้หยุดยาทันที
        </div>

        {/* Professional Signature Block */}
        <div className="mt-6 pt-4 border-t-2 border-gray-400 grid grid-cols-3 gap-6 text-center text-xs page-break-avoid">
          <div>
            <div className="h-10 border-b border-dotted border-gray-400 mb-1" />
            <div className="font-bold text-gray-900">
              ({patientData.doctorName || '................................................'})
            </div>
            <div className="text-[11px] text-gray-600">แพทย์ผู้สั่งการรักษา (Physician)</div>
            <div className="text-[10px] text-gray-400 mt-0.5">วันที่ ......../......../........</div>
          </div>

          <div>
            <div className="h-10 border-b border-dotted border-gray-400 mb-1" />
            <div className="font-bold text-gray-900">
              ({patientData.pharmacistName || '................................................'})
            </div>
            <div className="text-[11px] text-gray-600">เภสัชกรผู้ตรวจสอบ & ตรวจรับยา</div>
            <div className="text-[10px] text-gray-400 mt-0.5">วันที่ ......../......../........</div>
          </div>

          <div>
            <div className="h-10 border-b border-dotted border-gray-400 mb-1" />
            <div className="font-bold text-gray-900">
              (................................................)
            </div>
            <div className="text-[11px] text-gray-600">พยาบาลผู้บริหารยา (Chemo Nurse)</div>
            <div className="text-[10px] text-gray-400 mt-0.5">วันที่ ......../......../........</div>
          </div>
        </div>
      </div>
    );
  }
);

ChemoPdfDocument.displayName = 'ChemoPdfDocument';
