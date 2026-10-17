import { RegimenDefinition } from '../types/chemo';

export const regimensData: Record<string, RegimenDefinition> = {
  fac: {
    id: 'fac',
    title: 'CA BREAST สูตร FAC',
    days: [
      {
        dayLabel: '',
        mainIV: 'NSS 1000 ML IV KVO',
        premed: 'Dexamethasone 8mg up to 20 ml (IV ก่อนให้ยา CMT 30 นาที) + Ondansetron 8mg up to 20 ml (IV ก่อนให้ยา CMT 30 นาที)',
        monitor: 'นัดทุก 3 week ตรวจ CBC BUN CR LFT',
        drugs: [
          { id: 'fac_doxo', name: 'Doxorubicin', dose: 50, conc: 2, concLabel: '50mg/25ml', fluid: 'NSS 50 ML', admin: 'IV drip ใน 1 ชม.' },
          { id: 'fac_cpm', name: 'Cyclophosphamide', dose: 500, conc: 20, concLabel: '1000mg/50ml', fluid: 'NSS 50 ML', admin: 'IV drip ใน 1 ชม.' },
          { id: 'fac_5fu', name: 'Fluorouracil (5-FU)', dose: 500, conc: 50, concLabel: '500mg/10ml', fluid: '5% D/W 100 ML', admin: 'IV drip 15 นาที' }
        ]
      }
    ]
  },
  paclitaxel: {
    id: 'paclitaxel',
    title: 'CA BREAST สูตร Paclitaxel',
    days: [
      {
        dayLabel: '',
        mainIV: 'NSS 1000 ML IV KVO',
        premed: 'Dexamethasone 20mg up to 20 ml + Ondansetron 8mg up to 20 ml + CPM 10mg IV (IV ก่อนให้ยา CMT 30 นาที) + Famotidine 20mg 1 tab (ก่อน CMT 30 นาที)',
        monitor: 'วัด BP, Pulse, RR ทุก 15 นาที x 5 ครั้ง, จากนั้นทุก 30 นาที x 2 ครั้ง, จากนั้นทุก 1 ชม. จนยาหมด --> นัดทุก 3 wk ตรวจ CBC BUN CR LFT',
        drugs: [
          { id: 'pacli_pacli', name: 'Paclitaxel', dose: 175, conc: 6, concLabel: '300mg/50ml', fluid: 'NSS 500 ML', admin: 'IV drip ใน 3 ชม.' }
        ]
      }
    ]
  },
  ac: {
    id: 'ac',
    title: 'CA BREAST สูตร AC',
    days: [
      {
        dayLabel: '',
        mainIV: 'NSS 1000 ML IV KVO',
        premed: 'Dexamethasone 8mg + Ondansetron 8mg (IV ก่อนให้ยา CMT 30 นาที)',
        monitor: '',
        drugs: [
          { id: 'ac_doxo', name: 'Doxorubicin', dose: 60, conc: 2, concLabel: '50mg/25ml', fluid: 'NSS 50 ML', admin: 'IV drip ใน 1 ชม.' },
          { id: 'ac_cpm', name: 'Cyclophosphamide', dose: 600, conc: 20, concLabel: '1000mg/50ml', fluid: 'NSS 50 ML', admin: 'IV drip ใน 1 ชม.' }
        ]
      }
    ]
  },
  minichop: {
    id: 'minichop',
    title: 'mini-CHOP',
    days: [
      {
        dayLabel: 'mini-CHOP ทุก 21 วัน (DAY 1) 8 cycles',
        day1OrdersHtml: `D1 Checklist: CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid, U/A, stool parasite 3 days, CXR (PA), EKG 12 leads, ส่งปรึกษาทันตกรรม, ส่งปรึกษาอายุรแพทย์โรคหัวใจเพื่อประเมิน EF`,
        mainIV: 'ตาม Order แพทย์',
        premed: 'Ondansetron 8 mg IV และ Dexamethasone 10 mg IV (ก่อนให้ยา 30 นาที)',
        monitor: 'คำสั่งรักษาตลอดไป: Regular diet, Record V/S, I/O, NSS mouth wash หลังอาหารทุกมื้อ',
        medication: '- Domperidone (10 mg) 1 tab oral tid ac\n- Omeprazole (20 mg) 1 cap oral OD ac\n- Senokot 2 tabs oral hs prn for constipation',
        adviceHtml: 'คำแนะนำ: ให้ PFB ถ้า Hb < 8 g/dL, ให้ LPPC/SDP ถ้า Plt < 20,000/mm³, เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm³), ให้คำแนะนำโรคและการดูแลตนเอง',
        drugs: [
          { id: 'mini_vinc', name: 'Vincristine', dose: 1, isFixed: true, conc: 1, concLabel: '1mg/1ml', fluid: 'NSS 20 mL', admin: 'IV push (ระวัง extravasation/leak) (D1)' },
          { id: 'mini_doxo', name: 'Doxorubicin', dose: 25, conc: 2, concLabel: '50mg/25ml', fluid: 'NSS 50 mL', admin: 'IV drip in 10 min (ระวัง extravasation/leak) (D1)' },
          { id: 'mini_cpm', name: 'Cyclophosphamide', dose: 400, conc: 20, concLabel: '1000mg/50ml', fluid: 'NSS 250 mL', admin: 'IV drip in 2 hr (D1)' },
          { id: 'mini_pred', name: 'Prednisolone', dose: 40, isOral: true, conc: 5, concLabel: '5mg/Tab', fluid: '-', admin: 'รับประทาน D1 - D5 (แบ่งให้เช้า-เย็น)' },
          { id: 'mini_filg', name: 'Filgrastim (G-CSF)', dose: 300, isFixed: true, options: [300, 480], doseUnit: 'mcg', volUnit: 'Amp', conc: 300, concLabel: '300mcg/Amp', fluid: '-', admin: 'SC OD เริ่มวันที่.............ถึง...............' }
        ]
      }
    ]
  },
  folfox4: {
    id: 'folfox4',
    title: 'FOLFOX 4 (DAY 1 & DAY 2)',
    days: [
      {
        dayLabel: 'DAY 1',
        mainIV: '5% D/W 1000 ML IV Rate KVO',
        premed: 'Dexamethasone 20 mg up to 20 ml + Ondansetron 8 mg up to 20 ml + CPM 10 mg (iv 30 นาทีก่อน CMT)',
        monitor: 'CBC นัดมาตรวจทุก 2 weeks',
        drugs: [
          { id: 'fol_d1_leuco', name: 'Leucovorin', dose: 200, conc: 10, concLabel: '300mg/30ml', fluid: '5% D/W 250 ML', admin: 'IV infusion over 2 ชม.' },
          { id: 'fol_d1_oxali', name: 'Oxaliplatin', dose: 85, conc: 2, concLabel: '50mg/25ml', fluid: '5% D/W 250 ML', admin: 'IV infusion over 2 ชม.' },
          { id: 'fol_d1_5fu1', name: '5-FU (Short)', dose: 400, conc: 50, concLabel: '500mg/10ml', fluid: 'NSS 100 ML', admin: 'IV in 15 นาที' },
          { id: 'fol_d1_5fu2', name: '5-FU (Long)', dose: 600, conc: 50, concLabel: '500mg/10ml', fluid: '5% D/N/2 1000 ML', admin: 'IV infusion continuous over 22 ชม.' }
        ]
      },
      {
        dayLabel: 'DAY 2',
        mainIV: '5% D/W 1000 ML IV Rate KVO',
        premed: 'Dexamethasone 8 mg up to 20 ml, Ondansetron 8 mg up to 20 ml (IV ก่อนให้ยา CMT 30 นาที)',
        monitor: 'CBC นัดตรวจทุก 2 weeks',
        drugs: [
          { id: 'fol_d2_leuco', name: 'Leucovorin', dose: 200, conc: 10, concLabel: '300mg/30ml', fluid: '5% D/W 250 ML', admin: 'IV infusion over 2 ชม.' },
          { id: 'fol_d2_5fu1', name: '5-FU (Short)', dose: 400, conc: 50, concLabel: '500mg/10ml', fluid: 'NSS 100 ML', admin: 'IV in 15 นาที' },
          { id: 'fol_d2_5fu2', name: '5-FU (Long)', dose: 600, conc: 50, concLabel: '500mg/10ml', fluid: '5% D/N/2 1000 ML', admin: 'IV infusion continuous over 22 ชม.' }
        ]
      }
    ]
  },
  mfolfox6: {
    id: 'mfolfox6',
    title: 'mFOLFOX 6 (DAY 1 & DAY 2)',
    days: [
      {
        dayLabel: 'mFOLFOX 6 (DAY 1)',
        mainIV: 'ตาม Order แพทย์',
        premed: 'Ondansetron 8 mg IV push + Dexamethasone 10 mg in NSS 50 ml IV drip free flow + (ตั้งแต่ cycle 7 เป็นต้นไป: CPM 10 mg IV เพื่อป้องกัน Hypersensitivity)',
        medication: 'Low bacterial diet (งดผักสดและผลไม้), หลีกเลี่ยงการรับประทานหรือสัมผัสของเย็น, Ondansetron 8 mg IV prn q 8 hr for vomiting x 3 days, Lorazepam 1 tab PO hs prn, Dexamethasone 1 tab PO OD pc, Senokot 2 tabs hs prn, Loperamide 2 caps stat & prn q 2 hr if diarrhea',
        drugs: [
          { id: 'mfol_d1_oxali', name: 'Oxaliplatin', dose: 85, conc: 2, concLabel: '50mg/25ml', fluid: '5% D/W 250 ML', admin: 'IV drip in 2 hr (Flush IV line with D5W before oxaliplatin Infusion)' },
          { id: 'mfol_d1_leuco', name: 'Leucovorin', dose: 200, conc: 10, concLabel: '300mg/30ml', fluid: '5% D/W 250 ML', admin: 'IV drip in 2 hr (เริ่มให้พร้อม Oxaliplatin)' },
          { id: 'mfol_d1_5fu1', name: '5-FU (Short)', dose: 400, conc: 50, concLabel: '500mg/10ml', fluid: 'NSS 100 ML', admin: 'IV drip in 10 min' },
          { id: 'mfol_d1_5fu2', name: '5-FU (Long)', dose: 1200, conc: 50, concLabel: '500mg/10ml', fluid: 'NSS 1000 ML', admin: 'IV drip in 23 hr' }
        ]
      },
      {
        dayLabel: 'mFOLFOX 6 (DAY 2)',
        mainIV: 'ตาม Order แพทย์',
        drugs: [
          { id: 'mfol_d2_5fu2', name: '5-FU (Long)', dose: 1200, conc: 50, concLabel: '500mg/10ml', fluid: 'NSS 1000 ML', admin: 'IV drip in 23 hr' }
        ]
      }
    ]
  },
  degamonnt: {
    id: 'degamonnt',
    title: 'Degamonnt (DAY 1 & DAY 2)',
    days: [
      {
        dayLabel: 'DAY 1',
        mainIV: '5% D/W 1000 ML IV Rate KVO',
        premed: 'Dexamethasone 8 mg up to 20 ml + Ondansetron 8 mg up to 20 ml (IV ก่อนให้ยา CMT 30 นาที)',
        monitor: 'นัดทุก 2 weeks ตรวจ CBC',
        drugs: [
          { id: 'dega_d1_leuco', name: 'Leucovorin', dose: 200, conc: 10, concLabel: '300mg/30ml', fluid: '5% D/W 250 ML', admin: 'IV infusion over 2 ชม.' },
          { id: 'dega_d1_5fu1', name: '5-FU (Short)', dose: 400, conc: 50, concLabel: '500mg/10ml', fluid: 'NSS 100 ML', admin: 'IV in 15 นาที' },
          { id: 'dega_d1_5fu2', name: '5-FU (Long)', dose: 600, conc: 50, concLabel: '500mg/10ml', fluid: '5% D/N/2 1000 ML', admin: 'IV infusion continuous over 22 ชม.' }
        ]
      },
      {
        dayLabel: 'DAY 2',
        mainIV: '5% D/W 1000 ML IV Rate KVO',
        premed: 'Dexamethasone 8 mg up to 20 ml, Ondansetron 8 mg up to 20 ml (IV ก่อนให้ยา CMT 30 นาที)',
        monitor: '',
        drugs: [
          { id: 'dega_d2_leuco', name: 'Leucovorin', dose: 200, conc: 10, concLabel: '300mg/30ml', fluid: '5% D/W 250 ML', admin: 'IV infusion over 2 ชม.' },
          { id: 'dega_d2_5fu1', name: '5-FU (Short)', dose: 400, conc: 50, concLabel: '500mg/10ml', fluid: 'NSS 100 ML', admin: 'IV in 15 นาที' },
          { id: 'dega_d2_5fu2', name: '5-FU (Long)', dose: 600, conc: 50, concLabel: '500mg/10ml', fluid: '5% D/N/2 1000 ML', admin: 'IV infusion continuous over 22 ชม.' }
        ]
      }
    ]
  },
  rituximab: {
    id: 'rituximab',
    title: 'Rituximab',
    days: [
      {
        dayLabel: 'Rituximab Infusion Protocol',
        day1OrdersHtml: `D1 Checklist: CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid, HBs Ag, Anti HBc Ab, U/A, stool parasite 3 days, CXR (PA), EKG 12 leads, ส่งปรึกษาทันตกรรม`,
        mainIV: 'ตาม Order แพทย์',
        premed: 'Premedication (ก่อนให้ Rituximab 30 นาที): Dexamethasone 10 mg IV, Chlorpheniramine 10 mg IV, Paracetamol 500 mg 1 tab oral, Benadryl 25 mg 2 cap oral',
        monitor: 'Record vital signs q 15 min x 2 then q 30 min x 2 then q 1 hr until completion of infusion',
        drugs: [
          { id: 'rtx_rtx', name: 'Rituximab', dose: 375, conc: 10, concLabel: '500mg/50ml', fluid: 'NSS 250 mL หรือ 500 mL', admin: 'IV infusion ตามตาราง Infusion Rate' }
        ]
      }
    ]
  },
  chop: {
    id: 'chop',
    title: 'CHOP regimen',
    days: [
      {
        dayLabel: 'CHOP regimen ทุก 21 วัน (DAY 1) 8 cycles',
        day1OrdersHtml: `D1 Checklist: CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid, U/A, stool parasite 3 days, CXR (PA), EKG 12 leads, ส่งปรึกษาทันตกรรม, ส่งปรึกษาอายุรแพทย์โรคหัวใจเพื่อประเมิน EF`,
        mainIV: 'ตาม Order แพทย์',
        premed: 'Ondansetron 8 mg IV ก่อนให้ยา CMT 30 นาที + Dexamethasone 10 mg IV ก่อนให้ยา CMT 30 นาที',
        monitor: 'คำสั่งรักษาตลอดไป: Regular diet, Record V/S, I/O, NSS mouth wash หลังอาหารทุกมื้อ',
        medication: '- Domperidone (10 mg) 1 tab oral tid ac\n- Omeprazole (20 mg) 1 cap oral OD ac\n- Senokot 2 tabs oral hs prn for constipation',
        adviceHtml: 'คำแนะนำ: ให้ PFB ถ้า Hb < 8 g/dL, ให้ LPPC/SDP ถ้า Plt < 20,000/mm³, เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm³), ให้คำแนะนำโรคและอาหาร',
        drugs: [
          { id: 'chop_vinc', name: 'Vincristine', dose: 1.4, maxDose: 2, conc: 1, concLabel: '1mg/1ml', fluid: 'NSS 20 mL', admin: 'IV push (ระวัง extravasation/leak) (D1)' },
          { id: 'chop_doxo', name: 'Doxorubicin', dose: 50, conc: 2, concLabel: '50mg/25ml', fluid: 'NSS 50 mL', admin: 'IV drip in 10 min (ระวัง extravasation/leak) (D1)' },
          { id: 'chop_cpm', name: 'Cyclophosphamide', dose: 750, conc: 20, concLabel: '1000mg/50ml', fluid: 'NSS 250 mL', admin: 'IV drip in 2 hr (D1)' },
          { id: 'chop_pred', name: 'Prednisolone', dose: 100, isOral: true, noCalc: true, fixedActual: '#100 tabs', fixedVol: '100 เม็ดต่อ course', displayDose: '100 mg/day', conc: 5, concLabel: '5mg/Tab', fluid: '-', admin: '5 tabs PO tid pc and hs (20 tab/day) (D1 ถึง D5)' },
          { id: 'chop_filg', name: 'Filgrastim (G-CSF)', dose: 300, isFixed: true, options: [300, 480], doseUnit: 'mcg', volUnit: 'Amp', conc: 300, concLabel: '300mcg/Amp', fluid: '-', admin: 'SC OD เริ่มวันที่.............ถึง...............' }
        ]
      }
    ]
  },
  cvp: {
    id: 'cvp',
    title: 'CVP regimen',
    days: [
      {
        dayLabel: 'CVP regimen ทุก 21 วัน (DAY 1) 8 cycles',
        day1OrdersHtml: `D1 Checklist: CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid, U/A, stool parasite 3 days, CXR (PA), EKG 12 leads, ส่งปรึกษาทันตกรรม`,
        mainIV: 'ตาม Order แพทย์',
        premed: 'Ondansetron injection 8 mg IV ก่อนให้ยา CMT 30 นาที + Dexamethasone injection 10 mg IV ก่อนให้ยา CMT 30 นาที',
        monitor: 'คำสั่งรักษาตลอดไป: Regular diet, Record V/S, I/O, NSS mouth wash หลังอาหารทุกมื้อ',
        medication: '- Domperidone (10 mg) 1 tab oral tid ac\n- Omeprazole (20 mg) 1 cap oral OD ac\n- Senokot 2 tabs oral hs prn for constipation',
        adviceHtml: 'คำแนะนำ: ให้ PFB ถ้า Hb < 8 g/dL, ให้ LPPC/SDP ถ้า Plt < 20,000/mm³, เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm³)',
        drugs: [
          { id: 'cvp_vinc', name: 'Vincristine', dose: 1.4, maxDose: 2, conc: 1, concLabel: '1mg/1ml', fluid: 'NSS 20 mL', admin: 'IV push (ระวัง extravasation/leak) (D1)' },
          { id: 'cvp_cpm', name: 'Cyclophosphamide', dose: 750, conc: 20, concLabel: '1000mg/50ml', fluid: 'NSS 250 mL', admin: 'IV drip in 2 hr (D1)' },
          { id: 'cvp_pred', name: 'Prednisolone', dose: 100, isOral: true, noCalc: true, fixedActual: '#100 tabs', fixedVol: '100 เม็ดต่อ course', displayDose: '100 mg/day', conc: 5, concLabel: '5mg/Tab', fluid: '-', admin: '5 tabs PO tid pc and hs (20 tab/day) (D1 ถึง D5)' },
          { id: 'cvp_filg', name: 'Filgrastim (G-CSF)', dose: 300, isFixed: true, options: [300, 480], doseUnit: 'mcg', volUnit: 'Amp', conc: 300, concLabel: '300mcg/Amp', fluid: '-', admin: 'SC OD เริ่มวันที่.............ถึง...............' }
        ]
      }
    ]
  },
  rchop: {
    id: 'rchop',
    title: 'R-CHOP regimen',
    days: [
      {
        dayLabel: 'R-CHOP regimen ทุก 21 วัน (DAY 1) 8 cycles',
        day1OrdersHtml: `D1 Checklist: CBC, BUN, Cr, LFT, LDH, Electrolyte, Ca, PO4, uric acid, HBs Ag, Anti HBc Ab, U/A, stool parasite 3 days, CXR (PA), EKG 12 leads, ส่งปรึกษาทันตกรรม, ส่งปรึกษาอายุรแพทย์โรคหัวใจเพื่อประเมิน EF`,
        mainIV: 'ตาม Order แพทย์',
        premed: 'Premedication (ก่อนให้ Rituximab 30 นาที): Dexamethasone 10 mg IV, CPM 10 mg IV, Paracetamol 500 mg 1 tab, Benadryl 25 mg 2 cap oral | Premedication (ก่อนให้ยาเคมีบำบัด 30 นาที): Ondansetron 8 mg IV + Dexamethasone 10 mg IV',
        monitor: 'คำสั่งรักษาตลอดไป: Regular diet, Record V/S, I/O, NSS mouth wash หลังอาหารทุกมื้อ | หลังให้ Rituximab: Record V/S q 15 min x 2 then q 30 min x 2 then q 1 hr until completion',
        medication: '- Domperidone (10 mg) 1 tab oral tid ac\n- Omeprazole (20 mg) 1 cap oral OD ac\n- Senokot 2 tabs oral hs prn for constipation\n- Tenofovir alafenamide (25 mg) 1 tab po OD pc กรณี AntiHBc+',
        adviceHtml: 'คำแนะนำ: ให้ PFB ถ้า Hb < 8 g/dL, ให้ LPPC/SDP ถ้า Plt < 20,000/mm³, เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm³)',
        drugs: [
          { id: 'rchop_rtx', name: 'Rituximab', dose: 375, conc: 10, concLabel: '500mg/50ml', fluid: 'NSS 250 mL หรือ 500 mL', admin: 'IV infusion (D1) ตามตาราง Infusion Rate' },
          { id: 'rchop_vinc', name: 'Vincristine', dose: 1.4, maxDose: 2, conc: 1, concLabel: '1mg/1ml', fluid: 'NSS 20 mL', admin: 'IV push (ระวัง extravasation/leak) (D1)' },
          { id: 'rchop_doxo', name: 'Doxorubicin', dose: 50, conc: 2, concLabel: '50mg/25ml', fluid: 'NSS 50 mL', admin: 'IV drip in 10 min (ระวัง extravasation/leak) (D1)' },
          { id: 'rchop_cpm', name: 'Cyclophosphamide', dose: 750, conc: 20, concLabel: '1000mg/50ml', fluid: 'NSS 250 mL', admin: 'IV drip in 2 hr (D1)' },
          { id: 'rchop_pred', name: 'Prednisolone', dose: 100, isOral: true, noCalc: true, fixedActual: '#100 tabs', fixedVol: '100 เม็ดต่อ course', displayDose: '100 mg/day', conc: 5, concLabel: '5mg/Tab', fluid: '-', admin: '5 tabs PO tid pc and hs (20 tab/day) (D1 ถึง D5)' },
          { id: 'rchop_filg', name: 'Filgrastim (G-CSF)', dose: 300, isFixed: true, options: [300, 480], doseUnit: 'mcg', volUnit: 'Amp', conc: 300, concLabel: '300mcg/Amp', fluid: '-', admin: 'SC OD เริ่มวันที่.............ถึง...............' }
        ]
      }
    ]
  },
  azacitidine: {
    id: 'azacitidine',
    title: 'Azacitidine regimen',
    days: [
      {
        dayLabel: 'Azacitidine regimen',
        day1OrdersHtml: `D1 Checklist: CBC, BUN, Cr, LFT, U/A, stool parasite 3 days, CXR (PA), EKG 12 leads, ส่งปรึกษาทันตกรรม, CBC D4 and D7`,
        mainIV: 'ตาม Order แพทย์',
        premed: 'Ondansetron (8 mg) 1 tab oral ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.',
        monitor: 'คำสั่งรักษาตลอดไป: Regular diet, Record V/S, I/O, NSS mouth wash หลังอาหารทุกมื้อ',
        medication: '- Domperidone (10 mg) 1 tab oral tid ac\n- Omeprazole (20 mg) 1 cap oral OD ac\n- Senokot 2 tabs oral hs prn for constipation',
        adviceHtml: 'คำแนะนำ: ให้ PFB ถ้า Hb < 8 g/dL, ให้ LPPC/SDP ถ้า Plt < 20,000/mm³, เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm³)',
        drugs: [
          { id: 'aza_aza', name: 'Azacitidine', dose: 75, conc: 25, concLabel: '100mg/vial (Recon 4ml)', fluid: '-', admin: 'SC (D1 ถึง D.....)' }
        ]
      }
    ]
  },
  ldac: {
    id: 'ldac',
    title: 'LDAC regimen',
    days: [
      {
        dayLabel: 'LDAC regimen',
        day1OrdersHtml: `D1 Checklist: CBC, BUN, Cr, LFT, U/A, stool parasite 3 days, CXR (PA), EKG 12 leads, CBC D5 and D10`,
        mainIV: 'ตาม Order แพทย์',
        premed: 'Ondansetron 8 mg IV ก่อนให้ยาเคมีบำบัด 30 นาที, เวลาคลื่นไส้ทุก 8 ชม.',
        monitor: 'คำสั่งรักษาตลอดไป: Regular diet, Record V/S, I/O, NSS mouth wash หลังอาหารทุกมื้อ',
        medication: '- Domperidone (10 mg) 1 tab oral tid ac\n- Omeprazole (20 mg) 1 cap oral OD ac\n- Senokot 2 tabs oral hs prn for constipation',
        adviceHtml: 'คำแนะนำ: ให้ PFB ถ้า Hb < 8 g/dL, ให้ LPPC/SDP ถ้า Plt < 20,000/mm³, เจาะ hemoculture x 2 specimens ถ้า T ≥ 38.3 °C (และ ANC < 500/mm³)',
        drugs: [
          { id: 'ldac_cyta', name: 'Cytarabine', dose: 40, isFixed: true, conc: 20, concLabel: '100mg/5ml', fluid: '-', admin: 'SC OD (D1 ถึง D10)' }
        ]
      }
    ]
  }
};

export const sideEffectsData: Record<string, string> = {
  'Paclitaxel': 'neutropenia, hypersensitivity reaction, cardiac disturbances, sensory neuropathy, myalgia, arthralgia',
  'Leucovorin': 'nausea, vomiting, diarrhea, stomatitis, mucositis, myelosuppression, skin reaction, hypersensitivity, fever',
  'Oxaliplatin': 'sensory peripheral neuropathy, sensitivity to cold, jaw spasm, dysphagia, nausea, vomiting, diarrhea, fatigue, pulmonary fibrosis',
  '5-FU': 'mucositis, thrombocytopenia, constipation, edema, neutropenia, cough, fatigue, fever',
  'Doxorubicin': 'myelosuppression, mucositis, nausea, vomiting, alopecia, cumulative cardiac toxicity, severe tissue damage if extravasated',
  'Cyclophosphamide': 'myelosuppression, Hemorrhagic cystitis, nausea, vomiting, alopecia, cardiomyopathy (rare)',
  'Vincristine': 'neurotoxicity, primarily distal neuropathy affecting sensory, and motor abilities, higher dose may cause autonomic neuropathy, vesicant if extravasated, alopecia',
  'Filgrastim': 'bone pain, musculoskeletal pain, leukocytosis, splenic rupture, thrombocytopenia, hypersensitivity, acute respiratory distress, capillary leak syndrome',
  'Rituximab': 'neutropenia, nausea, fever, infusion reactions, hypersensitivity, hepatitis B reactivation, infection, tumor lysis syndrome leading to acute renal failure requiring dialysis may occur 12-24 hr following the first dose.',
  'Azacitidine': 'myelosuppression, injection site reactions, nausea, vomiting, diarrhea, fatigue, pyrexia',
  'Cytarabine': 'myelosuppression, nausea, vomiting, stomatitis, alopecia, cytarabine syndrome (fever, myalgia, bone pain, occasional chest pain, maculopapular rash, conjunctivitis)'
};
