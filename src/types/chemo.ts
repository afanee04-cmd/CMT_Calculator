export interface Drug {
  id: string;
  name: string;
  dose: number;
  conc: number;
  concLabel: string;
  fluid: string;
  admin: string;
  isFixed?: boolean;
  isOral?: boolean;
  noCalc?: boolean;
  maxDose?: number;
  doseUnit?: string;
  volUnit?: string;
  unit?: string;
  options?: number[];
  fixedActual?: string;
  fixedVol?: string;
  displayDose?: string;
}

export interface DayProtocol {
  dayLabel: string;
  mainIV: string;
  premed?: string;
  monitor?: string;
  medication?: string;
  day1OrdersHtml?: string;
  adviceHtml?: string;
  drugs: Drug[];
}

export interface RegimenDefinition {
  id: string;
  title: string;
  days: DayProtocol[];
}

export interface PatientData {
  patientName: string;
  hn: string;
  age: number | '';
  sex: 'male' | 'female';
  diagnosis: string;
  cycle: string;
  orderDate: string;
  height: number | '';
  weight: number | '';
  scr: number | '';
  crclWeight: number | '';
  manualCrclWeight: boolean;
  doctorName: string;
  pharmacistName: string;
}

export interface DrugCalculationItem {
  drug: Drug;
  calcDose: number;
  actualDose: number;
  calculatedVolume: number;
  volumeUnit: string;
  unit: string;
  isCapped: boolean;
  maxDose?: number;
  customActualText?: string;
  customVolText?: string;
}

export interface RituximabConfig {
  baseDose: number; // 375 or 500
  nssVolume: number; // 250 or 500
  cycleType: 'first' | 'subsequent';
}
