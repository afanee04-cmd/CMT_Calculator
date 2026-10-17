import React, { useRef, useState } from 'react';
import { X, Download, Printer, CheckCircle, FileText, Loader2, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { PatientData, RegimenDefinition, RituximabConfig } from '../types/chemo';
import { ChemoPdfDocument } from './ChemoPdfDocument';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: PatientData;
  regimen: RegimenDefinition;
  bsa: number;
  rawBsa: number;
  bmi: number;
  crcl: number | null;
  actualDoses: Record<string, number>;
  rituximabConfig: Record<string, RituximabConfig>;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  patientData,
  regimen,
  bsa,
  rawBsa,
  bmi,
  crcl,
  actualDoses,
  rituximabConfig,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const docRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!docRef.current) return;
    setIsGenerating(true);
    setStatusMessage('กำลังเรนเดอร์เอกสาร A4 คุณภาพสูง...');

    try {
      const element = docRef.current;

      // Use html2canvas-pro with scale 2 for high-resolution print quality & oklch support
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('chemo-pdf-document');
          if (clonedElement) {
            clonedElement.style.margin = '0 auto';
            clonedElement.style.boxShadow = 'none';
          }
        },
      });

      setStatusMessage('กำลังสร้างไฟล์ PDF...');

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate aspect ratio
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Multi-page handling if document overflows 1 page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Generate filename: ChemoOrder_HN[hn]_[regimen]_[date].pdf
      const safeHn = patientData.hn ? `_HN${patientData.hn.replace(/[^a-zA-Z0-9]/g, '')}` : '';
      const safeRegimen = regimen.id;
      const dateStr = new Date().toISOString().slice(0, 10);
      const fileName = `ChemoOrder${safeHn}_${safeRegimen}_${dateStr}.pdf`;

      pdf.save(fileName);
      setStatusMessage('ดาวน์โหลดสำเร็จ!');
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err: unknown) {
      console.error('Failed to generate PDF:', err);
      const errText = err instanceof Error ? err.message : String(err);
      setStatusMessage(`เกิดข้อผิดพลาด (${errText}) แนะนำให้ใช้ปุ่ม "พิมพ์ / พิมพ์เป็น PDF" เพื่อสั่งพิมพ์หรือบันทึกเป็น PDF ได้ทันที`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fadeIn no-print-container">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white p-4 sm:p-5 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">
                ส่งออกใบสั่งยาเคมีบำบัด (Chemotherapy Order Sheet)
              </h3>
              <p className="text-xs text-indigo-100 mt-0.5">
                โรงพยาบาลสิชล • สูตร: <span className="font-semibold text-white">{regimen.title}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>พร้อมส่งออกเอกสารการสั่งยาเคมีบำบัด</span>
            {statusMessage && (
              <span className="ml-2 font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 flex items-center gap-1.5">
                {isGenerating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {statusMessage}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-indigo-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-purple-200" />
              )}
              <span>ดาวน์โหลด PDF (.pdf)</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-slate-700 hover:bg-slate-800 active:scale-95 text-white font-bold text-sm px-4 py-2 rounded-xl shadow flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>พิมพ์ / พิมพ์เป็น PDF</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-200/70">
          <div className="shadow-lg rounded-xl overflow-hidden bg-white max-w-[210mm] mx-auto">
            <ChemoPdfDocument
              ref={docRef}
              patientData={patientData}
              regimen={regimen}
              bsa={bsa}
              rawBsa={rawBsa}
              bmi={bmi}
              crcl={crcl}
              actualDoses={actualDoses}
              rituximabConfig={rituximabConfig}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 no-print">
          <div>
            * เอกสารจะถูกจัดหน้ากระดาษ A4 มาตรฐาน พร้อมลงชื่อแพทย์ เภสัชกร และพยาบาล
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
