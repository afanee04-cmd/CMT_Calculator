import React from 'react';
import { BookOpen, Star, Mail, Phone, BarChart2, ExternalLink, ShieldCheck } from 'lucide-react';

export const FooterAndCredits: React.FC = () => {
  return (
    <footer className="mt-12 no-print space-y-8">
      {/* Satisfaction Survey Card */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between shadow-md gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-amber-300 fill-amber-300" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              แบบประเมินความพึงพอใจและการพัฒนาโปรแกรม
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
              ข้อเสนอแนะและข้อคิดเห็นของท่านเภสัชกร แพทย์ และพยาบาล เป็นประโยชน์อย่างยิ่งในการพัฒนาโปรแกรมต่อไป
            </p>
          </div>
        </div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc2dHIKvXVTtvn1l4ctq1FhugwO0jEdhO9KfqXrSHxmhT6oVA/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-sm transition-all text-center inline-flex items-center justify-center whitespace-nowrap active:scale-95 shrink-0"
        >
          <span>ทำแบบประเมินความพึงพอใจ</span>
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>

      {/* Developer and Hospital Staff Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Analytics Card */}
        <div className="md:col-span-1 flex items-stretch">
          <a
            href="https://analytics.google.com/analytics/web/?hl=th#/a392100206p549199545/reports/intelligenthome?params=_u..nav%3Dmaui"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-slate-200 rounded-3xl p-6 text-center shadow-sm w-full bg-white hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-center cursor-pointer"
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
              <BarChart2 className="w-6 h-6 text-indigo-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-0.5">
              สถิติการใช้งานระบบ
            </h4>
            <p className="text-[10px] font-mono font-bold text-slate-400 tracking-wider mb-2">
              GOOGLE ANALYTICS
            </p>
            <div className="mt-2 inline-flex items-center justify-center text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full group-hover:bg-indigo-100 transition-colors">
              <span>ติดต่อผู้พัฒนาเพื่อดูข้อมูล</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </div>
          </a>
        </div>

        {/* Developer Information */}
        <div className="md:col-span-2">
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-7 text-center sm:text-left text-slate-700 h-full flex flex-col justify-center border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  ผู้พัฒนา: นศภ.ศศิกานต์ นาคสุวรรณ์
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  นักศึกษาฝึกงาน MSMS ผลัด 4 พ.ศ. 2569 • โรงพยาบาลสิชล จังหวัดนครศรีธรรมราช
                </p>
              </div>
              <div className="text-xs text-slate-600 sm:text-right">
                <span>กำกับดูแลโดย: </span>
                <strong className="text-slate-900 font-bold">ภญ.ปิยพร ขนอม</strong>
              </div>
            </div>

            <div className="border-t border-slate-200 my-3" />

            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-slate-600">
              <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm font-medium flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                โทร 075-535630-4 ต่อ 3021 หรือ 3022
              </span>
              <a
                href="mailto:sasikarn.na@mail.wu.ac.th"
                className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm font-medium hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center"
              >
                <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                sasikarn.na@mail.wu.ac.th
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Academic References */}
      <div className="border-t border-slate-200 pt-6 text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-bold text-slate-700 mb-2">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>เอกสารอ้างอิงทางวิชาการ (Academic & Clinical References)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] leading-relaxed">
          <div>
            <strong>DynaMed:</strong>{' '}
            <a href="https://www.dynamed.com/chemo-regimen" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              dynamed.com/chemo-regimen
            </a>
          </div>
          <div>
            <strong>UpToDate:</strong>{' '}
            <a href="https://www.uptodate.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              uptodate.com
            </a>
          </div>
          <div>
            <strong>NCCN Guidelines:</strong>{' '}
            <a href="https://www.nccn.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              nccn.org (Oncology Practice Guidelines)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
